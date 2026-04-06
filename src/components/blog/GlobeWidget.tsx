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

const GLOBE_SIZE = 500;
const GLOBE_SCALE = 2.2;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// cobe coordinate system: phi=0 faces 90°W (Americas).
// center_lng = -(phi × 180/π) - 90.
// To place a city in the centre of the visible left half (45° west of globe centre):
//   globe centre = city_lng + 45° → phi = (225 - city_lng) × π/180
// This produces values ~1.56–1.83 for East Asian cities, all in the same range
// so the lerp always takes the short path.
function latLngToPhiTheta(lat: number, lng: number) {
  return {
    phi: (225 - lng) * (Math.PI / 180),
    theta: lat * (Math.PI / 180) * 0.4,
  };
}

// Project a lat/lng to CSS pixel coordinates within the globe div.
// Uses cobe's convention: phi=0 faces lng=-90°, so effective longitude in
// camera space is lng_r + phi + π/2.
function projectToScreen(lat: number, lng: number, phi: number, theta: number) {
  const lat_r = lat * Math.PI / 180;
  const eff_lng = lng * Math.PI / 180 + phi + Math.PI / 2;

  const x = Math.cos(lat_r) * Math.sin(eff_lng);
  const y_raw = Math.sin(lat_r);
  const z_raw = Math.cos(lat_r) * Math.cos(eff_lng);

  // Apply theta tilt (rotation around x-axis)
  const y = y_raw * Math.cos(theta) - z_raw * Math.sin(theta);
  const z = y_raw * Math.sin(theta) + z_raw * Math.cos(theta);

  const r = (GLOBE_SIZE / 2) * GLOBE_SCALE;
  return {
    x: GLOBE_SIZE / 2 + r * x,
    y: GLOBE_SIZE / 2 - r * y,
    visible: z > 0,
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

  // phi=1.7 faces ~166°E (Pacific just east of Asia) so East Asia is
  // already in the visible left half before any city is activated.
  const phiRef = useRef(1.7);
  const thetaRef = useRef(0.2);
  const targetPhiRef = useRef<number | null>(null);
  const targetThetaRef = useRef<number>(0.2);
  // All cities shown as small pins from the start.
  const markersRef = useRef<Array<{ location: [number, number]; size: number }>>(
    locations.map(loc => ({ location: [loc.lat, loc.lng], size: 0.03 }))
  );
  // Keep activeLocation accessible inside rAF loop without re-creating the globe.
  const activeLocationRef = useRef<Location | null>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    activeLocationRef.current = activeLocation;
  }, [activeLocation]);

  // Sync with site theme
  useEffect(() => {
    function sync() {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
    sync();
    document.addEventListener('astro:after-swap', sync);
    return () => document.removeEventListener('astro:after-swap', sync);
  }, []);

  // Fly globe to active location and highlight its pin.
  useEffect(() => {
    if (!activeLocation) return;
    const { phi, theta } = latLngToPhiTheta(activeLocation.lat, activeLocation.lng);
    targetPhiRef.current = phi;
    targetThetaRef.current = theta;
    markersRef.current = locations.map(loc => ({
      location: [loc.lat, loc.lng],
      size: loc.label === activeLocation.label ? 0.05 : 0.03,
    }));
  }, [activeLocation, locations]);

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
      diffuse: 1.4,
      scale: GLOBE_SCALE,
      mapSamples: 16000,
      mapBrightness: isDark ? 8 : 10,
      baseColor: isDark ? [0.4, 0.4, 0.5] : [0.55, 0.65, 0.85],
      markerColor: [1, 0.4, 0.1],
      glowColor: isDark ? [0.6, 0.6, 1.0] : [0.85, 0.9, 1.0],
      markers: markersRef.current,
    });

    let raf: number;
    function animate() {
      if (targetPhiRef.current !== null) {
        phiRef.current = lerp(phiRef.current, targetPhiRef.current, 0.04);
        thetaRef.current = lerp(thetaRef.current, targetThetaRef.current, 0.04);
        if (Math.abs(phiRef.current - targetPhiRef.current) < 0.002) {
          targetPhiRef.current = null;
        }
      }
      globe.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        markers: markersRef.current,
      });

      // Update label positions via direct DOM manipulation — no React re-renders.
      const active = activeLocationRef.current;
      locations.forEach((loc, i) => {
        const label = labelRefs.current[i];
        if (!label) return;
        const { x, y, visible } = projectToScreen(
          loc.lat, loc.lng, phiRef.current, thetaRef.current
        );
        const isActive = active?.label === loc.label;
        // Only show pins on the front face that are within the visible left half.
        if (visible && x < GLOBE_SIZE / 2 - 10) {
          label.style.left = `${x + 8}px`;
          label.style.top = `${y}px`;
          label.style.display = 'block';
          label.style.opacity = isActive ? '1' : '0.5';
          label.dataset.active = isActive ? 'true' : 'false';
        } else {
          label.style.display = 'none';
        }
      });

      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
    };
  }, [isDark]);

  return (
    <div className="globe-widget">
      <div
        style={{
          width: GLOBE_SIZE,
          height: GLOBE_SIZE,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: isDark
            ? '0 0 60px rgba(80,100,255,0.15), 0 0 0 1px rgba(255,255,255,0.04)'
            : '0 4px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: GLOBE_SIZE, height: GLOBE_SIZE, display: 'block' }}
        />
        {/* City labels — positioned next to each pin in the rAF loop */}
        {locations.map((loc, i) => (
          <div
            key={loc.label}
            ref={el => { labelRefs.current[i] = el; }}
            className="globe-pin-label"
            style={{ display: 'none' }}
          >
            {loc.label}
          </div>
        ))}
        {!activeLocation && (
          <div className="globe-hint">scroll to explore</div>
        )}
      </div>
    </div>
  );
}
