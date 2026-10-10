import data from '../../content/changelog.json';

export const sectionTypes = ['features', 'improvements', 'fixes', 'breaking', 'security', 'docs'] as const;
export type SectionType = (typeof sectionTypes)[number];

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

export function getReleases(): Release[] {
  return [...validate(data)].sort((a, b) => b.date.localeCompare(a.date));
}

export function releaseId(release: Release): string {
  return `${release.project}-${release.version}`.toLowerCase().replace(/[^a-z0-9.-]+/g, '-');
}
