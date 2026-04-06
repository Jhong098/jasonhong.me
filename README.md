# jasonhong.me

Personal website and developer blog. Editor-inspired design with keyboard-first navigation, command palette, working terminal, and interactive MDX blog posts.

**Stack**: Astro 6 · Tailwind CSS v4 · React 18 · MDX · Vercel

## Local Development

Requires Node.js ≥ 22.12.0.

```bash
pnpm install
pnpm dev           # dev server at http://localhost:4321
pnpm build         # production build
pnpm preview       # preview production build locally
```

## Project Structure

```
src/
├── components/    # UI components (layout, terminal, command-palette, shared)
├── content/       # MDX blog posts and project entries
├── layouts/       # EditorLayout — root layout with nav, breadcrumbs, status bar
├── pages/         # Astro pages (index, blog, about, projects, uses)
├── lib/           # nanostores, GitHub API client, config
└── styles/        # global.css (Tailwind + CSS variables), syntax.css
public/
├── fonts/         # Self-hosted variable fonts (Space Grotesk, JetBrains Mono)
└── static/        # Favicons, images, resume PDF
```

## Key Features

- **Command palette** — `Cmd+K` or `/` to search posts, pages, and actions
- **Terminal panel** — `` Ctrl+` `` to toggle; supports `ls`, `cat`, `git log`, `open`, `neofetch`, `cowsay`, and more
- **Keyboard shortcuts** — `j/k` navigate, `Esc` go back, `?` show shortcuts
- **Dark/light mode** — persists across navigation via `localStorage`
- **MDX blog** — posts in `src/content/blog/` with frontmatter schema validation

## Content

Blog posts are MDX files in `src/content/blog/`. Required frontmatter:

```yaml
---
title: Post Title
date: 2025-01-15
description: One-line summary.
tags: [tag1, tag2]
status: published   # or draft
---
```
