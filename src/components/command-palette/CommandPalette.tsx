import { useStore } from '@nanostores/react';
import { commandPaletteOpen } from '@lib/store';
import { Command } from 'cmdk';
import { useEffect } from 'react';

export interface PostItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

interface Props {
  posts?: PostItem[];
}

const NAV_PAGES = [
  { label: 'Home', href: '/', hint: '~' },
  { label: 'Blog', href: '/blog', hint: 'posts' },
  { label: 'Projects', href: '/projects', hint: 'work' },
  { label: 'Uses', href: '/uses', hint: 'gear' },
  { label: 'About', href: '/about', hint: 'info' },
];

export default function CommandPalette({ posts = [] }: Props) {
  const open = useStore(commandPaletteOpen);

  // Close on navigation (popstate)
  useEffect(() => {
    const close = () => commandPaletteOpen.set(false);
    window.addEventListener('popstate', close);
    return () => window.removeEventListener('popstate', close);
  }, []);

  function go(href: string) {
    commandPaletteOpen.set(false);
    window.location.href = href;
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={commandPaletteOpen.set}
      label="Command palette"
    >
      <div cmdk-backdrop="" onClick={() => commandPaletteOpen.set(false)} />
      <div cmdk-frame="">
        <Command shouldFilter={true}>
          <div cmdk-input-wrapper="">
            <SearchIcon />
            <Command.Input placeholder="Search pages, posts, actions…" />
            <kbd cmdk-kbd="">Esc</kbd>
          </div>
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Pages">
              {NAV_PAGES.map(p => (
                <Command.Item key={p.href} value={p.label} onSelect={() => go(p.href)}>
                  <span cmdk-item-icon="">
                    <FileIcon />
                  </span>
                  <span cmdk-item-label="">{p.label}</span>
                  <span cmdk-item-hint="">{p.hint}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {posts.length > 0 && (
              <Command.Group heading="Posts">
                {posts.map(post => (
                  <Command.Item
                    key={post.id}
                    value={`${post.title} ${post.tags.join(' ')} ${post.description}`}
                    onSelect={() => go(`/blog/${post.id}`)}
                  >
                    <span cmdk-item-icon="">
                      <DocIcon />
                    </span>
                    <span cmdk-item-label="">
                      {post.title}
                      <span cmdk-item-sub="">{post.description}</span>
                    </span>
                    {post.tags[0] && <span cmdk-item-hint="">#{post.tags[0]}</span>}
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group heading="Actions">
              <Command.Item value="toggle theme dark light" onSelect={() => {
                commandPaletteOpen.set(false);
                document.querySelector<HTMLButtonElement>('[aria-label*="theme"]')?.click();
              }}>
                <span cmdk-item-icon=""><ThemeIcon /></span>
                <span cmdk-item-label="">Toggle theme</span>
              </Command.Item>
              <Command.Item value="github source code" onSelect={() => go('https://github.com/Jhong098/jasonhong.me')}>
                <span cmdk-item-icon=""><ExternalIcon /></span>
                <span cmdk-item-label="">View source on GitHub</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </Command.Dialog>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/>
    </svg>
  );
}

function FileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
      <path d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V6.414A2 2 0 0013.414 5L11 2.586A2 2 0 009.586 2H4zm0 1.5h5v2A1.5 1.5 0 0010.5 7H12.5v5a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5z"/>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V6.414A2 2 0 0013.414 5L11 2.586A2 2 0 009.586 2H4zm1.75 5.25a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 2.5a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd"/>
    </svg>
  );
}

function ThemeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
      <path d="M8 12a4 4 0 100-8 4 4 0 000 8zM8 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V.75A.75.75 0 018 0zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 018 13zM2.343 2.343a.75.75 0 011.061 0l1.06 1.061a.75.75 0 01-1.06 1.06l-1.061-1.06a.75.75 0 010-1.061zm9.193 9.193a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM0 8a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H.75A.75.75 0 010 8zm13 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0113 8z"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
      <path d="M6.22 8.72a.75.75 0 001.06 1.06l5.22-5.22v1.69a.75.75 0 001.5 0v-3.5a.75.75 0 00-.75-.75h-3.5a.75.75 0 000 1.5h1.69L6.22 8.72z"/>
      <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 007 4H4.75A2.75 2.75 0 002 6.75v4.5A2.75 2.75 0 004.75 14h4.5A2.75 2.75 0 0012 11.25V9a.75.75 0 00-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5z"/>
    </svg>
  );
}
