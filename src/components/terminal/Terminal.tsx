import { useStore } from '@nanostores/react';
import { terminalOpen } from '@lib/store';
import { useState, useRef, useEffect } from 'react';
import { runCommand } from './commands';

interface HistoryLine {
  kind: 'input' | 'output' | 'error';
  text: string;
}

const WELCOME: HistoryLine[] = [
  { kind: 'output', text: 'jasonhong.me — type "help" for available commands' },
];

export default function Terminal() {
  const open = useStore(terminalOpen);
  const [history, setHistory] = useState<HistoryLine[]>(WELCOME);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    setCmdHistory(prev => [cmd, ...prev]);
    setHistIdx(-1);
    setInput('');

    const result = runCommand(cmd);

    if (result === '__CLEAR__') {
      setHistory(WELCOME);
      return;
    }

    const lines = Array.isArray(result) ? result : [result];
    setHistory(prev => [
      ...prev,
      { kind: 'input', text: cmd },
      ...lines.map(t => ({ kind: 'output' as const, text: t })),
    ]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
    }
  }

  if (!open) return null;

  return (
    <div className="terminal-panel">
      <div className="terminal-titlebar">
        <span className="terminal-title">TERMINAL</span>
        <div className="terminal-actions">
          <kbd className="terminal-kbd">Ctrl+`</kbd>
          <button
            className="terminal-close"
            onClick={() => terminalOpen.set(false)}
            aria-label="Close terminal"
          >
            ×
          </button>
        </div>
      </div>

      <div className="terminal-output">
        {history.map((line, i) => (
          <div key={i} className={`terminal-line terminal-${line.kind}`}>
            {line.kind === 'input' && <span className="terminal-prompt">$ </span>}
            <span>{line.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="terminal-inputrow" onSubmit={submit}>
        <span className="terminal-prompt terminal-prompt-inline">$</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
        />
      </form>
    </div>
  );
}
