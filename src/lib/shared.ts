import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Kampus';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// Repositorio de esta documentación (botón "Abrir en GitHub" de cada página).
export const gitConfig = {
  user: 'reyes200205',
  repo: 'docs-kampus',
  branch: 'main',
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}

// Herramientas del equipo: tareas y cronograma en Plane, comunicación en Slack.
export const planeUrl = 'https://app.plane.so/utt-plane/';
export const slackUrl = 'https://app.slack.com/client/T0C3K8PBWG1/C0C3FBXP938';
