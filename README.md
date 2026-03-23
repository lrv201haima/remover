# HAIMA Imagine Background Remover

A lightweight SEO-focused MVP for removing image backgrounds online using the remove.bg API.

## Tech Stack

- Next.js
- Tailwind CSS
- remove.bg API

## Local Development

```bash
pnpm install
cp .env.example .env.local
# fill REMOVE_BG_API_KEY
pnpm dev
```

## Environment Variables

- `REMOVE_BG_API_KEY`: API key for https://www.remove.bg/api

## MVP Scope

- Landing page with SEO-ready hero and FAQ
- Upload JPG / PNG / WebP
- Server-side remove.bg API proxy
- Transparent PNG preview and download
- No persistent image storage
