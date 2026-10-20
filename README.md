# docs-kampus

Documentación interna de **Kampus**, hecha con [Fumadocs](https://fumadocs.dev) (Next.js) y publicada como sitio estático en Cloudflare Workers. El sitio es público, igual que los repositorios.

**Sitio publicado:** https://doc.kodev.online/

**Kampus**: aplicación para la integración social de estudiantes universitarios de la UTT, la UAdeC y el Tecnológico de la Laguna. Equipo 9A · Desarrollo Web Integral.

## Repositorios

| Repositorio | Qué contiene |
| --- | --- |
| [backend-kampus](https://github.com/WilbertDevMx/backend-kampus) | Backend: API REST con Laravel |
| [Frontend-Kampus](https://github.com/reyes200205/Frontend-Kampus) | Frontend: app web y móvil con Expo |
| [Docs-Kampus](https://github.com/reyes200205/Docs-Kampus) | Esta documentación |

## Secciones del sitio

El menú lateral tiene un selector con cinco secciones:

| Sección | Qué contiene | Carpeta |
| --- | --- | --- |
| **General** | Introducción, el proyecto y privacidad de la ubicación (RNF-11) | `content/docs/(general)/` |
| **Proyecto** | Documentación formal: Unidad 1 (anteproyecto) y Unidad 2 | `content/docs/project/` |
| **Backend** | API REST con Laravel: instalación, configuración, comandos, CI y endpoints | `content/docs/backend/` |
| **App (Expo)** | Web y móvil con Expo y Expo Router: instalación, dispositivo, sistema de diseño y problemas comunes | `content/docs/mobile/` |
| **Desarrollo** | Flujo de Git, commits, pull requests, versiones y cómo documentar | `content/docs/development/` |

Además del contenido de `/docs`, el sitio tiene las páginas `/blog`, `/changelog` y `/team`.

## Documentación del proyecto (Unidades 1 y 2)

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

## Documentación técnica

### Backend (Laravel)

| Página | Archivo |
| --- | --- |
| Backend | [index.mdx](content/docs/backend/index.mdx) |
| Instalación | [installation.mdx](content/docs/backend/installation.mdx) |
| Configuración (variables de entorno) | [configuration.mdx](content/docs/backend/configuration.mdx) |
| Comandos útiles | [commands.mdx](content/docs/backend/commands.mdx) |
| Integración continua (GitHub Actions) | [continuous-integration.mdx](content/docs/backend/continuous-integration.mdx) |
| API REST · Introducción | [api/index.mdx](content/docs/backend/api/index.mdx) |
| API REST · Autenticación (Sanctum) | [api/authentication.mdx](content/docs/backend/api/authentication.mdx) |

### App (Expo)

| Página | Archivo |
| --- | --- |
| App (Expo) | [index.mdx](content/docs/mobile/index.mdx) |
| Instalación | [installation.mdx](content/docs/mobile/installation.mdx) |
| Ver la app en tu celular | [device.mdx](content/docs/mobile/device.mdx) |
| Sistema de diseño (T-03) | [design-system.mdx](content/docs/mobile/design-system.mdx) |
| Solución de problemas | [troubleshooting.mdx](content/docs/mobile/troubleshooting.mdx) |

### Desarrollo

| Página | Archivo |
| --- | --- |
| Desarrollo | [index.mdx](content/docs/development/index.mdx) |
| Flujo de Git | [git-workflow.mdx](content/docs/development/git-workflow.mdx) |
| Commits | [commits.mdx](content/docs/development/commits.mdx) |
| Pull requests | [pull-requests.mdx](content/docs/development/pull-requests.mdx) |
| Versiones y changelog | [releases.mdx](content/docs/development/releases.mdx) |
| Documentación (cómo agregar páginas) | [documentation.mdx](content/docs/development/documentation.mdx) |

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000.

## Contenido

| Ruta | Qué contiene |
| --- | --- |
| `content/docs/` | Páginas de la documentación (una carpeta por sección) |
| `content/changelog.json` | Versiones publicadas (página `/changelog`) |
| `content/blog.json` + `content/blog/*.mdx` | Publicaciones del blog (página `/blog`) |
| `content/team.json` | Integrantes y lo que hace cada uno (página `/team`) |

Cada carpeta de `content/docs` con `"root": true` en su `meta.json` es una sección del selector del menú lateral. Los JSON tienen su esquema en `*.schema.json`. La guía completa está en la página **Desarrollo → Documentación**.

## Build y despliegue

```bash
pnpm build                      # genera el sitio estático en out/
npx wrangler deploy             # publica out/ en Cloudflare Workers
```

La configuración del Worker está en `wrangler.jsonc`. El sitio queda en https://doc.kodev.online/.

## Código

| Ruta | Descripción |
| --- | --- |
| `src/app/(home)` | Inicio, blog, changelog y equipo |
| `src/app/docs` | Layout y páginas de la documentación |
| `src/app/api/search/route.ts` | Índice de búsqueda estático |
| `src/app/llms.txt`, `src/app/llms-full.txt`, `src/app/llms.mdx` | Versiones en texto de la documentación para LLMs |
| `src/app/og/docs` | Imágenes Open Graph de cada página |
| `src/lib/source.ts` | Colecciones de contenido (docs y blog) |
| `src/components/mermaid.tsx` | Diagramas Mermaid en las páginas |
| `src/components/risk-table.tsx` | Tabla del análisis de riesgos |
| `src/lib/changelog.ts`, `src/lib/blog.ts`, `src/lib/team.ts` | Lectura y validación de los JSON |
| `src/app/global.css` | Colores de la marca |
