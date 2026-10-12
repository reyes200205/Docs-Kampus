# docs-kampus

Documentación interna de **Kampus**, hecha con [Fumadocs](https://fumadocs.dev) (Next.js) y publicada como sitio estático en Cloudflare Workers con acceso restringido por Cloudflare Access.

## Documentación del proyecto (Unidades 1 y 2)

**Kampus**: aplicación para la integración social de estudiantes universitarios de la UTT, la UAdeC y el Tecnológico de la Laguna. Equipo 9A · Desarrollo Web Integral.

### Unidad 1 · Anteproyecto

| # | Sección | Archivo |
| --- | --- | --- |
| 1–2 | Problemática y justificación | [problem.mdx](content/docs/project/unit-1/problem.mdx) |
| 3–4 | Objetivos | [objectives.mdx](content/docs/project/unit-1/objectives.mdx) |
| 5–6 | Alcance, MVP y limitaciones | [scope.mdx](content/docs/project/unit-1/scope.mdx) |
| 7 | Análisis de riesgos | [risks.mdx](content/docs/project/unit-1/risks.mdx) |
| 8 | Requisitos e historias de usuario | [requirements.mdx](content/docs/project/unit-1/requirements.mdx) |
| 9 | Metodología, roles y contingencia | [methodology.mdx](content/docs/project/unit-1/methodology.mdx) |
| 10 | Separación en tareas | [tasks.mdx](content/docs/project/unit-1/tasks.mdx) |
| 11 | Cronograma | [schedule.mdx](content/docs/project/unit-1/schedule.mdx) |
| 12 | Arquitectura y tecnologías | [architecture.mdx](content/docs/project/unit-1/architecture.mdx) |
| 13 | Patrones de diseño | [design-patterns.mdx](content/docs/project/unit-1/design-patterns.mdx) |
| 14 | Wireframes | [wireframes.mdx](content/docs/project/unit-1/wireframes.mdx) |
| 15 | Definición de contenido | [content.mdx](content/docs/project/unit-1/content.mdx) |

### Unidad 2 · Versionamiento y diseño

| Criterio de la rúbrica | Archivo |
| --- | --- |
| Rúbrica y avance por criterio | [index.mdx](content/docs/project/unit-2/index.mdx) |
| Justificación de Git y GitHub | [version-control.mdx](content/docs/project/unit-2/version-control.mdx) |
| Flujo de trabajo (ramas, merge y PR) | [workflow.mdx](content/docs/project/unit-2/workflow.mdx) |
| Configuración, accesos, `.gitignore` y credenciales | [repository-setup.mdx](content/docs/project/unit-2/repository-setup.mdx) |
| Repositorios y evidencias | [evidence.mdx](content/docs/project/unit-2/evidence.mdx) |
| Diagramas: arquitectura, casos de uso, DER y secuencia | [diagrams.mdx](content/docs/project/unit-2/diagrams.mdx) |
| Diccionario de datos | [data-dictionary.mdx](content/docs/project/unit-2/data-dictionary.mdx) |
| Prototipo y maquetado | [prototype.mdx](content/docs/project/unit-2/prototype.mdx) |

En el sitio, todo esto está en la sección **Proyecto** del selector del menú lateral, con los diagramas renderizados.

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
| `content/docs/project/` | Documentación formal: Unidad 1 (anteproyecto) y Unidad 2 |
| `content/docs/backend/` | Backend (Laravel) y, en `api/`, la API REST |
| `content/docs/mobile/` | App (Expo, web y móvil) |
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
| `src/components/mermaid.tsx` | Diagramas Mermaid en las páginas |
| `src/lib/changelog.ts`, `src/lib/blog.ts` | Lectura y validación de los JSON |
| `src/app/global.css` | Colores de la marca |
