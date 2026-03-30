import { useEffect } from 'react';
import { commandPaletteOpen, terminalOpen } from '@lib/store';

function isTyping(e: KeyboardEvent): boolean {
  const t = e.target as HTMLElement;
  return (
    t.tagName === 'INPUT' ||
    t.tagName === 'TEXTAREA' ||
    t.tagName === 'SELECT' ||
    t.isContentEditable
  );
}

export default function KeyboardShortcuts() {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Cmd/Ctrl+K → command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        commandPaletteOpen.set(!commandPaletteOpen.get());
        return;
      }

      // / → command palette (not when typing)
      if (e.key === '/' && !isTyping(e) && !commandPaletteOpen.get()) {
        e.preventDefault();
        commandPaletteOpen.set(true);
        return;
      }

      // Ctrl+` → toggle terminal
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        terminalOpen.set(!terminalOpen.get());
        return;
      }

      // Escape → close all overlays
      if (e.key === 'Escape') {
        commandPaletteOpen.set(false);
        terminalOpen.set(false);
        return;
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return null;
}
