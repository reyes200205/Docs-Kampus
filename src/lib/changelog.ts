import data from '../../content/changelog.json';

export const sectionTypes = ['features', 'improvements', 'fixes', 'breaking', 'security', 'docs'] as const;
export type SectionType = (typeof sectionTypes)[number];

/** Títulos de cada sección. scripts/release.mjs escribe las notas de los GitHub Releases con estos mismos títulos. */
export const sectionLabel: Record<SectionType, string> = {
  features: 'Nuevas funciones',
  improvements: 'Mejoras',
  fixes: 'Correcciones',
  breaking: 'Cambios importantes',
  security: 'Seguridad',
  docs: 'Documentación',
};

/**
 * Repositorios cuyos GitHub Releases aparecen en /changelog. Los crea el workflow `Versión`
 * al mergear un PR a main. Para un repo privado, el build necesita `GITHUB_TOKEN` con acceso de lectura.
 */
const releaseSources = [
  { repo: 'reyes200205/Docs-Kampus', project: 'docs' },
  { repo: 'reyes200205/Frontend-Kampus', project: 'app' },
  // Todavía sin releases: cada PR integrado en develop está a mano en content/changelog.json.
  { repo: 'WilbertDevMx/backend-kampus', project: 'api' },
];

export interface ChangelogItem {
  text: string;
  author?: string;
  link?: string;
}

export interface ChangelogSection {
  type: SectionType;
  items: ChangelogItem[];
}

export interface Release {
  date: string;
  project: string;
  version: string;
  summary?: string;
  link?: string;
  sections: ChangelogSection[];
}

/**
 * Valida content/changelog.json. Si hay un error, el build falla con un mensaje claro
 * en vez de publicar una página rota.
 */
function validate(raw: unknown): Release[] {
  const releases = (raw as { releases?: unknown }).releases;
  if (!Array.isArray(releases)) throw new Error('changelog.json: falta el arreglo "releases".');

  releases.forEach((r, i) => {
    const where = `changelog.json → releases[${i}]`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r?.date)) throw new Error(`${where}: "date" debe tener formato AAAA-MM-DD.`);
    if (!r.project || !r.version) throw new Error(`${where}: faltan "project" o "version".`);
    if (!Array.isArray(r.sections) || r.sections.length === 0) throw new Error(`${where}: "sections" está vacío.`);
    r.sections.forEach((s: ChangelogSection, j: number) => {
      if (!sectionTypes.includes(s.type)) {
        throw new Error(`${where}.sections[${j}]: tipo "${s.type}" no válido. Usa: ${sectionTypes.join(', ')}.`);
      }
      if (!Array.isArray(s.items) || s.items.some((item) => !item?.text)) {
        throw new Error(`${where}.sections[${j}]: cada elemento de "items" necesita "text".`);
      }
    });
  });

  return releases as Release[];
}

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  body: string | null;
  published_at: string | null;
  draft: boolean;
}

/** Convierte las notas de un release (### Sección + líneas "- texto · autor ([abc1234](url))") en secciones. */
function parseNotes(body: string): ChangelogSection[] {
  const result: ChangelogSection[] = [];
  let current: ChangelogSection | undefined;

  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^###\s+(.+?)\s*$/);
    if (heading) {
      const type = sectionTypes.find((t) => sectionLabel[t] === heading[1]);
      current = type ? { type, items: [] } : undefined;
      if (current) result.push(current);
      continue;
    }

    const item = line.match(/^[-*]\s+(.+)$/);
    if (!current || !item) continue;
    const parts = item[1].match(/^(.*?)(?: · (.+?))?(?: \(\[[0-9a-f]{7,}\]\((\S+)\)\))?$/);
    current.items.push({ text: parts?.[1] ?? item[1], author: parts?.[2], link: parts?.[3] });
  }

  return result.filter((section) => section.items.length > 0);
}

async function fetchReleases({ repo, project }: (typeof releaseSources)[number]): Promise<Release[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, {
      headers,
      // Caché corta: cada build (y cada minuto en `pnpm dev`) vuelve a leer los releases.
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const releases = (await res.json()) as GitHubRelease[];

    return releases
      .filter((r) => !r.draft && r.published_at)
      .map((r) => ({
        date: r.published_at!.slice(0, 10),
        project,
        version: r.tag_name,
        link: r.html_url,
        sections: parseNotes(r.body ?? ''),
      }))
      .filter((r) => r.sections.length > 0);
  } catch (error) {
    // Sin red o sin acceso: se publica solo lo de changelog.json en vez de romper el build.
    console.warn(`changelog: no se pudieron leer los releases de ${repo} (${error}).`);
    return [];
  }
}

/** Versiones de los GitHub Releases + content/changelog.json. Si una versión está en ambos, gana el release. */
export async function getReleases(): Promise<Release[]> {
  const fromGitHub = (await Promise.all(releaseSources.map(fetchReleases))).flat();
  const published = new Set(fromGitHub.map(releaseId));
  const manual = validate(data).filter((r) => !published.has(releaseId(r)));

  return [...fromGitHub, ...manual].sort((a, b) => b.date.localeCompare(a.date));
}

export function releaseId(release: Release): string {
  return `${release.project}-${release.version}`.toLowerCase().replace(/[^a-z0-9.-]+/g, '-');
}
