import { useState } from 'react';

interface Props {
  rawMdx: string;
}

export default function SourceDrawer({ rawMdx }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Toggle MDX source"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: open ? 'var(--accent)' : 'var(--fg-6)',
          background: open ? 'var(--accent-dim)' : 'transparent',
          border: `1px solid ${open ? 'var(--accent-border)' : 'var(--border-muted)'}`,
          borderRadius: '4px',
          padding: '3px 8px',
          cursor: 'pointer',
          transition: 'color 120ms, background 120ms, border-color 120ms',
        }}
      >
        <CodeIcon />
        {open ? 'hide source' : 'view source'}
      </button>

      {open && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-base)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.25rem',
            height: '40px',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-6)' }}>
              raw MDX source
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close source view"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--fg-6)',
                background: 'none',
                border: '1px solid var(--border-muted)',
                borderRadius: '4px',
                padding: '2px 8px',
                cursor: 'pointer',
                transition: 'color 120ms',
              }}
            >
              esc / close
            </button>
          </div>
          <pre style={{
            flex: 1,
            overflow: 'auto',
            margin: 0,
            padding: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            lineHeight: '1.65',
            color: 'var(--fg-4)',
            background: 'transparent',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            <code>{rawMdx}</code>
          </pre>
        </div>
      )}
    </>
  );
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="11" height="11">
      <path d="M6.78 1.97a.75.75 0 0 1 0 1.06L3.81 6l2.97 2.97a.75.75 0 1 1-1.06 1.06L2.22 6.53a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Zm2.44 0a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06L12.19 6 9.22 3.03a.75.75 0 0 1 0-1.06Z"/>
    </svg>
  );
}
