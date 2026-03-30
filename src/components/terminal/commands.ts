export interface Command {
  name: string;
  description: string;
  run: (args: string[]) => string | string[];
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
    run: () => 'jason — SDE @ AWS, Waterloo CS, Toronto',
  },
  ls: {
    name: 'ls',
    description: 'List site sections',
    run: () => ['blog/', 'projects/', 'about/'],
  },
  clear: {
    name: 'clear',
    description: 'Clear terminal output',
    run: () => '__CLEAR__',
  },
  echo: {
    name: 'echo',
    description: 'Print arguments',
    run: (args) => args.join(' '),
  },
};

export function runCommand(input: string): string | string[] {
  const [name, ...args] = input.trim().split(/\s+/);
  const cmd = commands[name.toLowerCase()];
  if (!cmd) return `command not found: ${name}. Type 'help' for available commands.`;
  return cmd.run(args);
}
