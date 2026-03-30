export interface Command {
  name: string;
  description: string;
  run: (args: string[], ctx?: CommandContext) => string | string[];
}

export interface CommandContext {
  cmdHistory?: string[];
}

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'List available commands',
    run: () => Object.values(commands).map(c => `  ${c.name.padEnd(12)} ${c.description}`),
  },
  whoami: {
    name: 'whoami',
    description: 'Print current user info',
    run: () => [
      'jason hong',
      'SDE @ AWS — Amazon Connect Contact Lens',
      'Waterloo CE \'21 — Toronto, ON',
    ],
  },
  ls: {
    name: 'ls',
    description: 'List site sections',
    run: (args) => {
      const dir = args[0] ?? '.';
      if (dir === 'blog/' || dir === 'blog') return ['asia-trip-19.mdx'];
      if (dir === 'projects/' || dir === 'projects') {
        return ['jasonhong-me.md', 'signsense.md', 'hackthenorth-2019.md', 'hacker-applications.md', 'hackioca.md', 'vision-motion.md'];
      }
      return ['blog/', 'projects/', 'about/', 'uses/'];
    },
  },
  cd: {
    name: 'cd',
    description: 'Navigate to a section',
    run: (args) => {
      const dest = args[0];
      if (!dest) return 'usage: cd <section>';
      const routes: Record<string, string> = {
        '~': '/', home: '/', blog: '/blog',
        projects: '/projects', about: '/about', uses: '/uses',
      };
      const href = routes[dest.replace(/\/$/, '')];
      if (!href) return `cd: no such directory: ${dest}`;
      return `__NAV__:${href}`;
    },
  },
  open: {
    name: 'open',
    description: 'Open a page or post by slug',
    run: (args) => {
      const target = args[0];
      if (!target) return 'usage: open <page|post-slug>';
      const routes: Record<string, string> = {
        home: '/', blog: '/blog', projects: '/projects',
        about: '/about', uses: '/uses',
      };
      const href = routes[target] ?? `/blog/${target}`;
      return `__NAV__:${href}`;
    },
  },
  cat: {
    name: 'cat',
    description: 'Print info about a section',
    run: (args) => {
      const target = args[0];
      const data: Record<string, string[]> = {
        contact: [
          '{',
          '  "name": "Jason Hong",',
          '  "email": "jason@jasonhong.me",',
          '  "github": "Jhong098",',
          '  "status": "open to work"',
          '}',
        ],
        about: [
          'SDE at AWS building serverless systems and LLM-powered tools.',
          'Waterloo CE \'21. Based in Toronto.',
        ],
      };
      return data[target] ?? `cat: ${target}: no such file`;
    },
  },
  echo: {
    name: 'echo',
    description: 'Print arguments',
    run: (args) => args.join(' ') || '',
  },
  history: {
    name: 'history',
    description: 'Show command history',
    run: (_args, ctx) => {
      const hist = ctx?.cmdHistory ?? [];
      if (hist.length === 0) return 'no history yet';
      return [...hist].reverse().map((cmd, i) => `  ${String(i + 1).padStart(3)}  ${cmd}`);
    },
  },
  clear: {
    name: 'clear',
    description: 'Clear terminal output',
    run: () => '__CLEAR__',
  },
  cowsay: {
    name: 'cowsay',
    description: 'Make a cow say something',
    run: (args) => {
      const msg = args.join(' ') || 'moo';
      const bar = '-'.repeat(msg.length + 2);
      return [
        ` ${bar}`,
        `< ${msg} >`,
        ` ${bar}`,
        '        \\   ^__^',
        '         \\  (oo)\\_______',
        '            (__)\\       )\\/\\',
        '                ||----w |',
        '                ||     ||',
      ];
    },
  },
  neofetch: {
    name: 'neofetch',
    description: 'Show system info',
    run: () => [
      '       ___           jasonhong@jasonhong.me',
      '      /   \\          -------------------------',
      '     / \\ / \\         OS: jasonhong.me v2',
      '    /   V   \\        Host: Vercel',
      '   /  editor \\       Kernel: Astro 6',
      '  /____________\\     Shell: zsh',
      '                     Theme: zinc-950 + violet-400',
      '                     Font: Space Grotesk / JetBrains Mono',
      '                     Stack: Astro · React · Tailwind v4',
    ],
  },
};

export function runCommand(input: string, ctx?: CommandContext): string | string[] {
  const [name, ...args] = input.trim().split(/\s+/);
  const cmd = commands[name.toLowerCase()];
  if (!cmd) return `command not found: ${name}. Type 'help' for available commands.`;
  return cmd.run(args, ctx);
}
