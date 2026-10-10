# docs-kampus

Documentación interna de **Kampus**, hecha con [Fumadocs](https://fumadocs.dev) (Next.js) y publicada como sitio estático en Cloudflare Workers con acceso restringido por Cloudflare Access.

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000.

## Contenido

| Ruta | Qué contiene |
| --- | --- |
| `content/docs/(general)/` | Introducción, el proyecto y privacidad de la ubicación |
| `content/docs/backend/` | Backend (Laravel) y, en `api/`, la API REST |
| `content/docs/mobile/` | App móvil (Expo) |
| `content/docs/development/` | Flujo de Git, commits, pull requests y cómo documentar |
| `content/changelog.json` | Versiones publicadas (página `/changelog`) |
| `content/blog.json` + `content/blog/*.mdx` | Publicaciones del blog (página `/blog`) |
| `content/team.json` | Integrantes y lo que hace cada uno (página `/team`) |

Cada carpeta de `content/docs` con `"root": true` en su `meta.json` es una sección del selector del menú lateral. La guía completa está en la página **Desarrollo → Documentación**.

## Build y despliegue

```bash
pnpm build                      # genera el sitio estático en out/
npx wrangler deploy             # publica out/ en Cloudflare Workers
```

La configuración del Worker está en `wrangler.jsonc`.

## Código

| Ruta | Descripción |
| --- | --- |
| `src/app/(home)` | Inicio, blog y changelog |
| `src/app/docs` | Layout y páginas de la documentación |
| `src/app/api/search/route.ts` | Índice de búsqueda estático |
| `src/lib/source.ts` | Colecciones de contenido (docs y blog) |
| `src/lib/changelog.ts`, `src/lib/blog.ts` | Lectura y validación de los JSON |
| `src/app/global.css` | Colores de la marca |
