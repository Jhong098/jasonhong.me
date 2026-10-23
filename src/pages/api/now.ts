import type { APIRoute } from 'astro';
import { getFilm, getTrack } from '@lib/now';

export const prerender = false;

const settled = <T>(r: PromiseSettledResult<T | null>) => (r.status === 'fulfilled' ? r.value : null);

export const GET: APIRoute = async () => {
  const [track, film] = await Promise.allSettled([getTrack(), getFilm()]);

  return new Response(JSON.stringify({ track: settled(track), film: settled(film) }), {
    headers: {
      'Content-Type': 'application/json',
      // Vercel's CDN serves one cached copy per minute, so visitors never hit Spotify directly.
      'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=600'
    }
  });
};
