import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

interface Location {
  label: string;
  lat: number;
  lng: number;
}

interface Props {
  locations: Location[];
}

const GLOBE_SIZE = 220;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Convert lat/lng to cobe phi/theta.
// phi=0, theta=0 ≈ 0°N 0°E (Atlantic). Increasing phi rotates globe westward.
function latLngToPhiTheta(lat: number, lng: number) {
  return {
    phi: -lng * (Math.PI / 180),
    theta: lat * (Math.PI / 180) * 0.5,
  };
}

function useActiveSection(locations: Location[]) {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!locations?.length) return;

    const headings = Array.from(document.querySelectorAll('article h3'));
    const locationHeadings = headings.filter((h) => {
      const text = h.textContent?.toLowerCase() ?? '';
      return locations.some((loc) => text.includes(loc.label.toLowerCase()));
    });

    if (locationHeadings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const text = entry.target.textContent?.toLowerCase() ?? '';
            const match = locations.find((loc) =>
              text.includes(loc.label.toLowerCase())
            );
            if (match) setActiveLocation(match);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    locationHeadings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [locations]);

  return activeLocation;
}

export default function GlobeWidget({ locations }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeLocation = useActiveSection(locations);
  const [isDark, setIsDark] = useState(true);

  const phiRef = useRef(0);
  const thetaRef = useRef(0.3);
  const targetPhiRef = useRef<number | null>(null);
  const targetThetaRef = useRef<number>(0.3);
  const markersRef = useRef<Array<{ location: [number, number]; size: number }>>([]);

  // Sync with site theme
  useEffect(() => {
    function sync() {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
    sync();
    document.addEventListener('astro:after-swap', sync);
    return () => document.removeEventListener('astro:after-swap', sync);
  }, []);

  // Fly globe to active location
  useEffect(() => {
    if (!activeLocation) return;
    const { phi, theta } = latLngToPhiTheta(activeLocation.lat, activeLocation.lng);
    targetPhiRef.current = phi;
    targetThetaRef.current = theta;
    markersRef.current = [{ location: [activeLocation.lat, activeLocation.lng], size: 0.07 }];
  }, [activeLocation]);

  // Initialize cobe globe (recreate when theme changes)
  useEffect(() => {
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: GLOBE_SIZE * 2,
      height: GLOBE_SIZE * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: isDark ? 6 : 8,
      baseColor: isDark ? [0.3, 0.3, 0.35] : [0.55, 0.65, 0.85],
      markerColor: [1, 0.4, 0.1],
      glowColor: isDark ? [0.6, 0.6, 1.0] : [0.85, 0.9, 1.0],
      markers: [],
      onRender: (state) => {
        state.markers = markersRef.current;

        if (targetPhiRef.current !== null) {
          phiRef.current = lerp(phiRef.current, targetPhiRef.current, 0.04);
          thetaRef.current = lerp(thetaRef.current, targetThetaRef.current, 0.04);
          if (Math.abs(phiRef.current - targetPhiRef.current) < 0.002) {
            targetPhiRef.current = null;
          }
        } else {
          phiRef.current += 0.003; // slow auto-rotate when idle
        }

        state.phi = phiRef.current;
        state.theta = thetaRef.current;
      },
    });

    return () => globe.destroy();
  }, [isDark]);

  return (
    <div className="globe-widget">
      <div
        style={{
          width: GLOBE_SIZE,
          height: GLOBE_SIZE,
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: isDark
            ? '0 0 40px rgba(80,100,255,0.12), 0 0 0 1px rgba(255,255,255,0.04)'
            : '0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: GLOBE_SIZE, height: GLOBE_SIZE, display: 'block' }}
        />
      </div>

      <div className="globe-label">
        {activeLocation ? (
          <>
            <span className="globe-label-small">currently in</span>
            <span className="globe-label-city">{activeLocation.label}</span>
          </>
        ) : (
          <span className="globe-label-small">scroll to explore</span>
        )}
      </div>
    </div>
  );
}
