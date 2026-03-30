import { atom } from 'nanostores';

export const terminalOpen = atom<boolean>(false);
export const theme = atom<'dark' | 'light'>('dark');
export const currentPath = atom<string>('~');
export const commandPaletteOpen = atom<boolean>(false);
