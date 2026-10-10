import data from '../../content/team.json';

export const areas = ['scrum', 'product', 'backend', 'frontend', 'docs'] as const;
export type Area = (typeof areas)[number];

export const areaLabel: Record<Area, string> = {
  scrum: 'Scrum',
  product: 'Producto',
  backend: 'Backend',
  frontend: 'App móvil',
  docs: 'Documentación',
};

export interface Member {
  name: string;
  role: string;
  areas: Area[];
  summary: string;
  responsibilities: string[];
  github?: string;
  avatar?: string;
}

/**
 * Valida content/team.json. Si hay un error, el build falla con un mensaje claro
 * en vez de publicar una página rota.
 */
function validate(raw: unknown): Member[] {
  const members = (raw as { members?: unknown }).members;
  if (!Array.isArray(members)) throw new Error('team.json: falta el arreglo "members".');

  members.forEach((m, i) => {
    const where = `team.json → members[${i}]`;
    if (!m?.name || !m.role || !m.summary) throw new Error(`${where}: faltan "name", "role" o "summary".`);
    if (!Array.isArray(m.areas) || m.areas.length === 0) throw new Error(`${where}: "areas" está vacío.`);
    m.areas.forEach((a: string) => {
      if (!areas.includes(a as Area)) throw new Error(`${where}: área "${a}" no válida. Usa: ${areas.join(', ')}.`);
    });
    if (!Array.isArray(m.responsibilities) || m.responsibilities.length === 0) {
      throw new Error(`${where}: "responsibilities" está vacío.`);
    }
  });

  return members as Member[];
}

export function getMembers(): Member[] {
  return validate(data);
}

/** Foto del integrante: la propia, la de GitHub o ninguna (se muestran sus iniciales). */
export function avatarUrl(member: Member): string | undefined {
  return member.avatar ?? (member.github ? `https://github.com/${member.github}.png?size=160` : undefined);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}
