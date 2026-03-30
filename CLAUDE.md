# Personal Website — Project Brief

## Vision

A developer blog and personal website that borrows the **interaction model** of a code editor — keyboard-first navigation, command palette, working terminal, split panes — but wrapped in its **own modern design language**. Not a VS Code clone. Think Linear meets a code editor: functional depth under a clean, opinionated surface.

**One-sentence pitch**: "What a developer's personal website would look like if they designed it the way they design software — keyboard-first, functional, with real depth under the surface."

## Owner

Jason (Ren Jie) Hong — SDE at AWS (Amazon Connect Contact Lens). Building serverless backend systems and LLM-powered call center agent evaluation infrastructure. Currently exploring full-stack software engineering roles.

## Differentiation

There's an existing VS Code portfolio template ([itsnitinr/vscode-portfolio](https://github.com/itsnitinr/vscode-portfolio)) with 1.2k stars. Here's how this project is fundamentally different:

### What vscode-portfolio is
- A VS Code **skin** over static portfolio pages
- Hardcoded sidebar and tabs — no real file system logic
- No blog, no content system, no search
- Purely decorative editor UI — things look like VS Code but don't behave like it
- GitHub Dark theme, VS Code exact layout

### What this project is
- **Own design language** — editor-inspired, not editor-cosplay
- **Functional depth** — command palette searches real content, git log shows real commits, split panes actually work
- **Living blog** — MDX posts with interactive embedded demos
- **Working terminal** — real command parsing, not hardcoded echo
- **Keyboard-first** — every action has a shortcut, the site is operable without a mouse

### Four pillars of differentiation

**1. Own aesthetic (not VS Code)**
- Slim nav rail (icons + labels, expands on hover) instead of a literal VS Code file explorer — more Arc browser than VS Code
- Mix of sans-serif (prose, headings) and monospace (metadata, tags, dates, code) — reads as "editor-inspired" without being a code editor
- Custom color palette and syntax highlighting — not a VS Code theme, a design choice
- Tabs as minimal breadcrumb-style pills, not literal editor tabs
- Inspiration: Linear, Raycast, Arc browser, Vercel dashboard

**2. Functional depth**
- **Command palette** (`/` or `Cmd+K`): searches blog post content, page titles, tags, and actions. Built with `cmdk` library
- **Split pane**: button on any blog post to view rendered post alongside its raw MDX source — meta and impressive
- **Git log panel**: fetches real GitHub commit history via API, displayed as `git log --oneline`. Shows visitors how actively you ship
- **Keyboard shortcuts throughout**: `j/k` to navigate posts, `esc` to go back, `?` to show shortcut cheatsheet, `/` for command palette

**3. Working terminal**
A real terminal panel (toggle with `` Ctrl+` `` or a button) with actual command parsing:

```
$ ls blog/
leaderboard-design.mdx    typescript-patterns.mdx    serverless-at-scale.mdx

$ cat contact
{
  "name": "Jason Hong",
  "status": "open to opportunities",
  "email": "jason@hey.com"
}

$ git log --oneline -5
a3f2c1d  add: leaderboard system design post
8b1e4f7  fix: dark mode toggle persistence
...

$ open leaderboard-design
→ navigating to /blog/leaderboard-design...

$ help
Available commands: ls, cd, cat, open, git log, clear, whoami, neofetch, history

$ cowsay hire me
 __________
< hire me! >
 ----------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

Supported commands: `ls`, `cd`, `cat`, `open`, `git log`, `whoami`, `neofetch`, `clear`, `history`, `help`, `cowsay`, `theme`

**4. Interactive blog content**
MDX posts with live React component islands. The blog IS the portfolio — it proves technical skills through demonstration, not description.

## Tech Stack

- **Framework**: Astro 5 (static site, content-focused, zero JS by default)
- **Interactive islands**: React 18 (via Astro islands architecture, `client:visible` / `client:idle`)
- **Blog content**: MDX (markdown + embedded React components)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- **Command palette**: `cmdk` library
- **State management**: `nanostores` (lightweight, Astro-native)
- **Deployment**: Vercel
- **Git log data**: GitHub REST API (fetched at build time via Astro)

## Design System

### Typography
- **Prose & headings**: Space Grotesk (wght 400/500/600 via Google Fonts)
- **Metadata, tags, dates, terminal, code**: JetBrains Mono (wght 400/500 via Google Fonts)
- The mix of sans + mono is what makes it feel "editor-inspired"
- Chosen over Inter for its subtle letterform personality (a, g, 6, 9) without sacrificing legibility

### Color Palette
Dark mode default. Custom palette — NOT VS Code GitHub Dark.
- Background: `zinc-950` (`#09090b`)
- Surface: `zinc-900` (`#18181b`)
- Border: `zinc-800` (`#27272a`)
- Text primary: `zinc-100`
- Text muted: `zinc-400`/`zinc-500`
- Accent/interactive: `violet-400` (`#a78bfa`)
- Syntax: purple keywords, teal strings, blue functions, amber types

### Layout
- **Nav rail** (left): Slim vertical strip, `w-12` collapsed → `w-44` on hover. Icon + label per section.
- **Content area** (center): `max-w-2xl` for prose, generous padding
- **Terminal** (bottom): Collapsible panel, toggled via `Ctrl+\``
- **Command palette** (overlay): Centered modal
- **Status bar** (bottom edge): `h-7`, shows current page/theme/open-to-work

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── NavRail.astro          # Slim sidebar nav (Astro, Phase 1)
│   │   ├── Breadcrumbs.astro      # Path breadcrumb pills
│   │   └── StatusBar.astro        # Bottom status bar
│   ├── command-palette/
│   │   └── CommandPalette.tsx     # cmdk overlay (Phase 2)
│   ├── terminal/
│   │   ├── Terminal.tsx           # Terminal panel (Phase 2)
│   │   └── commands.ts            # Command registry
│   ├── blog/
│   │   ├── PostList.astro         # Blog index list
│   │   ├── SplitView.tsx          # MDX source split view (Phase 3)
│   │   └── GitLog.tsx             # Commit history panel (Phase 2)
│   ├── interactive/
│   │   ├── LeaderboardDemo.tsx    # Live Redis simulation (Phase 3)
│   │   ├── TypePlayground.tsx     # TypeScript type demo (Phase 3)
│   │   └── WorkflowViz.tsx        # Step Functions animation (Phase 3)
│   └── shared/
│       ├── ThemeToggle.tsx        # Dark/light mode toggle
│       └── KeyboardShortcuts.tsx  # Global shortcut listener (Phase 2)
├── content/
│   ├── config.ts                  # Collection schemas (zod)
│   ├── blog/                      # .mdx files
│   └── projects/                  # .md files
├── layouts/
│   └── EditorLayout.astro         # Root layout: nav + breadcrumbs + status bar
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── blog/index.astro
│   ├── blog/[...slug].astro
│   └── projects/index.astro
├── lib/
│   ├── github.ts                  # GitHub API fetch
│   ├── store.ts                   # nanostores: terminalOpen, theme, currentPath, commandPaletteOpen
│   └── search-index.ts            # Build-time search index (Phase 2)
└── styles/
    ├── global.css                 # @import "tailwindcss", @custom-variant dark, base styles
    └── syntax.css                 # Custom syntax highlighting tokens
```

## Path Aliases (tsconfig.json)

```
@/*              → src/*
@components/*    → src/components/*
@layouts/*       → src/layouts/*
@lib/*           → src/lib/*
@styles/*        → src/styles/*
```

## Implementation Phases

### Phase 1 — Core (ship first)
1. Astro project setup with Tailwind v4, content collections
2. `EditorLayout` with nav rail, breadcrumbs, status bar
3. Landing page (personal letter + project timeline)
4. Blog with MDX support — at least one real post
5. Dark/light mode via `nanostores` + `ThemeToggle`
6. Deploy to Vercel

### Phase 2 — Depth
7. Command palette with `cmdk` (search posts, pages, actions)
8. Keyboard shortcuts (`j/k`, `esc`, `/`, `?`, `Ctrl+\``)
9. Terminal panel with core commands
10. Git log panel (GitHub API)

### Phase 3 — Polish
11. Split pane view (rendered + MDX source)
12. Interactive blog demos
13. Terminal easter eggs
14. View transitions
15. Mobile responsive nav

---

# Figma MCP Integration Rules

These rules define how to translate Figma designs into production code for this project. Follow this workflow for every Figma-driven implementation task.

## Required Figma-to-Code Flow

**Do not skip steps.**

1. Run `get_design_context` for the exact node(s) being implemented
2. If response is too large, run `get_metadata` first to get the node map, then re-fetch only the needed nodes
3. Run `get_screenshot` for visual reference of the variant being implemented
4. Download any required assets (images, SVGs) via the assets endpoint
5. Translate the Figma output into this project's conventions (see rules below)
6. Validate against the Figma screenshot for 1:1 visual parity before marking complete

## Component Organization

- IMPORTANT: Check `src/components/` for existing components before creating new ones
- New layout primitives → `src/components/layout/`
- New shared UI → `src/components/shared/`
- New blog-specific components → `src/components/blog/`
- New interactive demos → `src/components/interactive/`
- Page-level components → inline in `src/pages/` or `src/layouts/`
- Phase 2+ components (terminal, command palette) → their respective subdirectories

## Component Format Rules

- **Static/server-rendered UI**: Use `.astro` files — zero JS shipped by default
- **Interactive UI with state**: Use `.tsx` files with Astro island directives:
  - `client:load` — hydrate immediately (nav, theme toggle)
  - `client:visible` — hydrate when in viewport (interactive demos)
  - `client:idle` — hydrate when browser is idle (non-critical UI)
- IMPORTANT: Do not make `.astro` components interactive with inline `<script>` tags when `nanostores` + a React island is cleaner

## Styling Rules

- IMPORTANT: Use Tailwind CSS v4 utility classes — there is no `tailwind.config.js`
- CSS customization goes in `src/styles/global.css` using `@theme { }` or `@layer base { }`
- Dark mode uses `@custom-variant dark (&:where(.dark, .dark *))` — target with `dark:` Tailwind prefix
- IMPORTANT: Never hardcode color hex values in components — use Tailwind's zinc/violet palette or CSS variables defined in `global.css`
- Typography scale: use `text-sm`, `text-base`, `text-lg`, etc. — no arbitrary font sizes
- Spacing: use Tailwind's default scale — no arbitrary pixel values unless truly necessary
- Monospace text (dates, tags, metadata, code): always add `font-mono` class
- Prose text (blog body): use `.prose-content` wrapper class defined in `global.css`

## Design Token Mapping

When Figma uses design tokens, map them to this project's equivalents:

| Figma token | Tailwind class |
|---|---|
| Background | `bg-zinc-950` |
| Surface / card | `bg-zinc-900` |
| Border | `border-zinc-800` |
| Text primary | `text-zinc-100` |
| Text secondary | `text-zinc-400` |
| Text muted | `text-zinc-500` / `text-zinc-600` |
| Accent / interactive | `text-violet-400` / `bg-violet-400` |
| Success / active | `text-emerald-400` |
| Warning / WIP | `text-amber-400` |

## State Management

- Cross-component state (theme, terminal open, command palette open, current path) lives in `src/lib/store.ts` as `nanostores` atoms
- Import in React components: `import { useStore } from '@nanostores/react'`
- Import in Astro pages: read initial value server-side from the atom directly
- Do NOT use React `useState` for state that needs to be shared between islands

## Asset Handling

- IMPORTANT: If Figma MCP returns a localhost source for an image or SVG asset, use that source directly
- IMPORTANT: Do NOT install new icon packages — use inline SVGs (as currently done in `NavRail.astro`)
- IMPORTANT: Do NOT use placeholder images — always use the actual asset from the Figma MCP payload
- Static assets (images, fonts, favicons) → `public/` directory
- Blog post images → `public/static/images/[post-slug]/`
- SVG icons used in components → inline in the component file

## Content Rules

- Blog posts: MDX files in `src/content/blog/` with frontmatter schema from `src/content/config.ts`
- Required frontmatter: `title`, `date`, `description`, `tags[]`, `status`
- Project entries: Markdown in `src/content/projects/`
- IMPORTANT: Never hardcode blog post data or project data in page files — always use `getCollection()`

## Astro-Specific Conventions

- Props in `.astro` files use the `interface Props` pattern in the frontmatter
- Pass current path from layout to nav: `const currentPathname = Astro.url.pathname`
- Use `class:list={[...]}` for conditional classes in Astro templates
- Import styles: `import '@styles/global.css'` only in `EditorLayout.astro` — not in individual pages
- Use `set:html={svgString}` for inline SVG injection in Astro

## What NOT to Do

- Do NOT use Chakra UI, Emotion, or any CSS-in-JS (old stack)
- Do NOT use `next/image`, `next/link`, or any Next.js imports
- Do NOT add `@tailwindcss/typography` — use the custom `.prose-content` class instead
- Do NOT use React for components that don't need interactivity
- Do NOT use `useState`/`useEffect` for cross-island shared state — use `nanostores`
- Do NOT commit `.env` files or Firebase credentials
