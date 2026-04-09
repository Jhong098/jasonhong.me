import { useState, useEffect, useRef } from 'react';

type PetState = 'walking' | 'idle' | 'pause' | 'react';

interface PetDef {
  frames: {
    walk: string[][];
    idle: string[][];
    pause: string[][];
    react: string[][];
  };
  quips: string[];
}

const PETS: Record<string, PetDef> = {
  cat: {
    frames: {
      walk: [
        [' /\\_/\\', '( o.o )', ' > ^ <'],
        [' /\\_/\\', '( -.o )', ' > ~ <'],
      ],
      idle: [[' /\\_/\\', '( o.o )', '  u u  ']],
      pause: [[' /\\_/\\', '( o.o )', ' /|   ']],
      react: [[' /\\_/\\', '( ^o^ )', '  \\o/ ']],
    },
    quips: ['mrow!', 'pet me', '...', 'zzz'],
  },
  duck: {
    frames: {
      walk: [
        ['  _  ', ">('v')", '  || '],
        ['  _  ', ">('v')", '  /\\ '],
      ],
      idle: [['  _  ', ">('v')", '  || ']],
      pause: [['  _  ', '>(-.) ', '  || ']],
      react: [['  _  ', ">('V')", '  \\/ ']],
    },
    quips: ['quack!', 'QUACK!', '..quack', 'bread?'],
  },
  bunny: {
    frames: {
      walk: [
        ['(\\(\\', '(-.-)', ' c  )'],
        ['(/(/ ', '(-.-)', ' c  )'],
      ],
      idle: [['(\\(\\', '(o.o)', ' c  )']],
      pause: [['(\\(\\', '(-.o)', ' c  )']],
      react: [['(\\(\\', '(^o^)', ' c  )']],
    },
    quips: ['boing!', 'floof', '...', 'carrot?'],
  },
  frog: {
    frames: {
      walk: [
        [' @..@ ', '(----)'],
        [' @..@ ', '(-\\/-)'],
      ],
      idle: [[' @..@ ', '(o--o)']],
      pause: [[' @..@ ', '(----)', '  ||  ']],
      react: [[' @..@ ', '(-()-)']],
    },
    quips: ['ribbit!', 'croak', '...', 'fly?'],
  },
  dog: {
    frames: {
      walk: [
        [' /^^\\', '(o  o)', ' \\__/'],
        [' /^^\\', '(o  o)', ' /--\\'],
      ],
      idle: [[' /^^\\', '(o  o)', '  ww ']],
      pause: [[' /^^\\', '(o  o)', ' \\_/ ']],
      react: [[' /^^\\', '(^  ^)', '  \\o/']],
    },
    quips: ['woof!', 'bork!', 'pats?', '...'],
  },
};

const PET_KEYS = Object.keys(PETS);
const PET_WIDTH_PX = 90;
const WALK_SPEED = 1.5; // px per tick
const MOVE_INTERVAL = 80; // ms
const FRAME_INTERVAL = 500; // ms

export default function AsciiPet() {
  const [petKey] = useState(() => PET_KEYS[Math.floor(Math.random() * PET_KEYS.length)]);
  const [petState, setPetState] = useState<PetState>('walking');
  const [frameIdx, setFrameIdx] = useState(0);
  const [posX, setPosX] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);

  const dirRef = useRef<1 | -1>(1);
  const petStateRef = useRef<PetState>('walking');
  petStateRef.current = petState;

  const pet = PETS[petKey];

  // Randomize starting position on mount
  useEffect(() => {
    setPosX(Math.random() * Math.max(0, window.innerWidth * 0.5));
  }, []);

  // Movement tick — only runs while walking
  useEffect(() => {
    if (petState !== 'walking') return;
    const id = setInterval(() => {
      setPosX(prev => {
        const next = prev + WALK_SPEED * dirRef.current;
        const max = window.innerWidth - PET_WIDTH_PX;
        if (next <= 0) { dirRef.current = 1; return 0; }
        if (next >= max) { dirRef.current = -1; return max; }
        return next;
      });
    }, MOVE_INTERVAL);
    return () => clearInterval(id);
  }, [petState]);

  // Frame cycling
  useEffect(() => {
    const stateKey =
      petState === 'react' ? 'react' :
      petState === 'pause' ? 'pause' :
      petState === 'idle'  ? 'idle'  : 'walk';
    const frames = pet.frames[stateKey];
    setFrameIdx(0);
    if (frames.length <= 1) return;
    const id = setInterval(() => {
      setFrameIdx(i => (i + 1) % frames.length);
    }, FRAME_INTERVAL);
    return () => clearInterval(id);
  }, [petState, petKey]);

  // State machine: walking → idle → pause → walking
  useEffect(() => {
    if (petState === 'react') return;
    const durations: Record<string, number> = {
      walking: 3000 + Math.random() * 3000,
      idle:    1000 + Math.random() * 1000,
      pause:   2000 + Math.random() * 1000,
    };
    const nextState: Record<string, PetState> = {
      walking: 'idle',
      idle:    'pause',
      pause:   'walking',
    };
    const id = setTimeout(() => {
      setPetState(nextState[petState]);
    }, durations[petState]);
    return () => clearTimeout(id);
  }, [petState]);

  function handleClick() {
    if (petState === 'react') return;
    const quip = pet.quips[Math.floor(Math.random() * pet.quips.length)];
    setBubble(quip);
    setPetState('react');
    setTimeout(() => {
      setBubble(null);
      setPetState('walking');
    }, 1500);
  }

  const stateKey =
    petState === 'react' ? 'react' :
    petState === 'pause' ? 'pause' :
    petState === 'idle'  ? 'idle'  : 'walk';
  const frames = pet.frames[stateKey];
  const currentFrame = frames[frameIdx % frames.length];

  return (
    <div
      className="hidden md:block"
      style={{
        position: 'fixed',
        bottom: '28px',
        left: `${posX}px`,
        zIndex: 40,
        cursor: 'pointer',
        transition: petState === 'walking' ? `left ${MOVE_INTERVAL}ms linear` : 'none',
        userSelect: 'none',
      }}
      onClick={handleClick}
    >
      {bubble && (
        <div
          className="pet-bubble"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '2px 8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--fg-3)',
            whiteSpace: 'nowrap',
            marginBottom: '4px',
            backdropFilter: 'blur(4px)',
          }}
        >
          {bubble}
        </div>
      )}
      <pre
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.5rem, 1.2vw, 0.85rem)',
          lineHeight: 1.3,
          margin: 0,
          color: 'var(--accent)',
          animation: petState === 'react' ? 'pet-jump 0.35s ease' : 'none',
        }}
      >
        {currentFrame.join('\n')}
      </pre>
    </div>
  );
}
