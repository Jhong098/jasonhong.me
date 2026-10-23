import { useEffect, useState } from 'react';
import type { Film, Track } from '@lib/now';

export interface Meal {
  restaurant: string;
  neighborhood?: string;
  order?: string;
  /** YYYY-MM-DD */
  date?: string;
  url?: string;
}

interface Props {
  meal: Meal | null;
}

interface NowData {
  track: Track | null;
  film: Film | null;
}

const REFRESH_MS = 60_000;
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

// Date-only strings are local calendar days, not UTC midnight.
function parseDay(day: string) {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function ago(date: Date) {
  const mins = Math.round((date.getTime() - Date.now()) / 60_000);
  if (mins > -60) return mins > -1 ? 'just now' : rtf.format(mins, 'minute');
  const hours = Math.round(mins / 60);
  if (hours > -24) return rtf.format(hours, 'hour');
  return rtf.format(Math.round(hours / 24), 'day');
}

function dayAgo(day: string) {
  const days = Math.round((parseDay(day).getTime() - new Date().setHours(0, 0, 0, 0)) / 86_400_000);
  return days > -7 ? rtf.format(days, 'day') : parseDay(day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const stars = (r: number) => '★'.repeat(Math.floor(r)) + (r % 1 ? '½' : '');

function Row({
  label,
  art,
  artShape = 'square',
  title,
  href,
  detail,
  meta,
  live
}: {
  label: string;
  art?: string | null;
  artShape?: 'square' | 'poster';
  title: string;
  href?: string;
  detail?: string;
  meta?: string;
  live?: boolean;
}) {
  const titleEl = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="truncate text-sm text-(--fg-3) no-underline transition-colors hover:text-(--accent)"
    >
      {title}
    </a>
  ) : (
    <span className="truncate text-sm text-(--fg-3)">{title}</span>
  );

  return (
    <li className="flex items-center gap-3 border-b border-(--bg-elevated) py-2.5 first:border-t">
      <div className="flex h-12 w-10 shrink-0 items-center justify-center" aria-hidden="true">
        <div
          className={`overflow-hidden rounded bg-(--bg-elevated) ${artShape === 'poster' ? 'h-12 w-8' : 'h-10 w-10'}`}
        >
          {art && <img src={art} alt="" loading="lazy" className="h-full w-full object-cover" />}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-1.5 font-mono text-xs text-(--fg-6)">
          {live && (
            <span className="now-eq inline-flex h-2.5 items-end gap-px" aria-hidden="true">
              <span className="w-0.5 h-full bg-(--success)" />
              <span className="w-0.5 h-full bg-(--success)" />
              <span className="w-0.5 h-full bg-(--success)" />
            </span>
          )}
          <span className={live ? 'text-(--success)' : undefined}>{label}</span>
        </span>
        <span className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-2">
          {titleEl}
          {detail && <span className="truncate text-xs text-(--fg-5)">{detail}</span>}
        </span>
      </div>
      {meta && <span className="shrink-0 font-mono text-xs text-(--fg-6)">{meta}</span>}
    </li>
  );
}

function Placeholder() {
  return (
    <li className="flex items-center gap-3 border-b border-(--bg-elevated) py-2.5 first:border-t" aria-hidden="true">
      <div className="flex h-12 w-10 shrink-0 items-center">
        <div className="h-10 w-10 rounded bg-(--bg-elevated)" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="h-2.5 w-16 rounded bg-(--bg-elevated)" />
        <div className="h-3 w-40 rounded bg-(--bg-elevated)" />
      </div>
    </li>
  );
}

export default function NowStrip({ meal }: Props) {
  const [data, setData] = useState<NowData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/now');
        if (!res.ok) throw new Error(String(res.status));
        const json: NowData = await res.json();
        if (alive) setData(json);
      } catch {
        if (alive) setFailed(true);
      }
    };
    load();
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') load();
    }, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  const loading = !data && !failed;
  const { track, film } = data ?? { track: null, film: null };
  const hasMeal = !!meal?.restaurant;
  if (!loading && !track && !film && !hasMeal) return null;

  return (
    <section className="mb-6" aria-label="What Jason has been up to lately">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-(--fg-6)">Lately</span>
        <span className="font-mono text-xs text-(--fg-7)">live</span>
      </div>
      <ul className="m-0 list-none p-0" aria-busy={loading}>
        {loading && <Placeholder />}
        {track && (
          <Row
            label={track.playing ? 'Listening now' : 'Last played'}
            live={track.playing}
            art={track.art}
            title={track.title}
            href={track.url}
            detail={track.artist}
            meta={track.playedAt ? ago(new Date(track.playedAt)) : undefined}
          />
        )}
        {loading && <Placeholder />}
        {film && (
          <Row
            label={film.rewatch ? 'Rewatched' : 'Last watched'}
            art={film.poster}
            artShape="poster"
            title={film.year ? `${film.title} (${film.year})` : film.title}
            href={film.url}
            detail={film.rating ? stars(film.rating) : undefined}
            meta={film.watchedOn ? dayAgo(film.watchedOn) : undefined}
          />
        )}
        {hasMeal && meal && (
          <Row
            label="Last ate at"
            title={meal.neighborhood ? `${meal.restaurant} · ${meal.neighborhood}` : meal.restaurant}
            href={meal.url || undefined}
            detail={meal.order ? `had the ${meal.order}` : undefined}
            meta={meal.date ? dayAgo(meal.date) : undefined}
          />
        )}
      </ul>
    </section>
  );
}
