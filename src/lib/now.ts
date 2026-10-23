import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
  LETTERBOXD_USERNAME
} from 'astro:env/server';

export interface Track {
  title: string;
  artist: string;
  url: string;
  art: string | null;
  playing: boolean;
  /** ISO time it was played; null while playing */
  playedAt: string | null;
}

export interface Film {
  title: string;
  year: string | null;
  rating: number | null;
  rewatch: boolean;
  url: string;
  poster: string | null;
  /** YYYY-MM-DD from the Letterboxd diary */
  watchedOn: string | null;
}

const TIMEOUT_MS = 4000;

function withTimeout(url: string, init: RequestInit = {}) {
  return fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
}

// ---------- Spotify ----------
// Needs an app refresh token with the user-read-currently-playing and
// user-read-recently-played scopes.

async function spotifyToken(): Promise<string | null> {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) return null;
  const res = await withTimeout('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: SPOTIFY_REFRESH_TOKEN })
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token ?? null;
}

function toTrack(item: any, playing: boolean, playedAt: string | null): Track | null {
  if (!item?.name) return null;
  return {
    title: item.name,
    artist: (item.artists ?? []).map((a: any) => a.name).join(', '),
    url: item.external_urls?.spotify ?? 'https://open.spotify.com',
    art: item.album?.images?.at(-1)?.url ?? item.album?.images?.[0]?.url ?? null,
    playing,
    playedAt
  };
}

export async function getTrack(): Promise<Track | null> {
  const token = await spotifyToken();
  if (!token) return null;
  const headers = { Authorization: `Bearer ${token}` };

  const now = await withTimeout('https://api.spotify.com/v1/me/player/currently-playing', { headers });
  if (now.status === 200) {
    const data = await now.json();
    if (data.currently_playing_type === 'track' && data.is_playing) {
      const track = toTrack(data.item, true, null);
      if (track) return track;
    }
  }

  const recent = await withTimeout('https://api.spotify.com/v1/me/player/recently-played?limit=1', { headers });
  if (!recent.ok) return null;
  const last = (await recent.json()).items?.[0];
  return last ? toTrack(last.track, false, last.played_at) : null;
}

// ---------- Letterboxd ----------
// Reads the public diary RSS feed; list entries in the feed have no film title and are skipped.

const tag = (xml: string, name: string) =>
  xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1]?.trim() ?? null;

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

export async function getFilm(): Promise<Film | null> {
  if (!LETTERBOXD_USERNAME) return null;
  const res = await withTimeout(`https://letterboxd.com/${encodeURIComponent(LETTERBOXD_USERNAME)}/rss/`, {
    headers: { 'User-Agent': 'jasonhong.me now-widget' }
  });
  if (!res.ok) return null;
  const xml = await res.text();

  for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const title = tag(item, 'letterboxd:filmTitle');
    if (!title) continue;
    const rating = tag(item, 'letterboxd:memberRating');
    const description = tag(item, 'description') ?? '';
    return {
      title: decode(title),
      year: tag(item, 'letterboxd:filmYear'),
      rating: rating ? Number(rating) : null,
      rewatch: tag(item, 'letterboxd:rewatch') === 'Yes',
      url: tag(item, 'link') ?? `https://letterboxd.com/${LETTERBOXD_USERNAME}/`,
      poster: decode(description).match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null,
      watchedOn: tag(item, 'letterboxd:watchedDate')
    };
  }
  return null;
}
