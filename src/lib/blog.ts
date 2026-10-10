import data from '../../content/blog.json';
import { blogPosts } from './source';

export const categories = ['release', 'project', 'module', 'article'] as const;
export type Category = (typeof categories)[number];

export const categoryLabel: Record<Category, string> = {
  release: 'Lanzamiento',
  project: 'Proyecto',
  module: 'Módulo',
  article: 'Artículo',
};

export interface Author {
  name: string;
  avatar?: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  authors?: Author[];
  image?: string;
  coverText?: string;
  href?: string;
}

export type BlogEntry = (typeof blogPosts)[number];

/** Artículo MDX de cada slug: content/blog/<slug>.mdx */
function findBody(slug: string): BlogEntry | undefined {
  return blogPosts.find((entry) => entry.info.path.replace(/\.mdx?$/, '') === slug);
}

/**
 * Valida content/blog.json. Si hay un error, el build falla con un mensaje claro
 * en vez de publicar una página rota.
 */
function validate(raw: unknown): Post[] {
  const posts = (raw as { posts?: unknown }).posts;
  if (!Array.isArray(posts)) throw new Error('blog.json: falta el arreglo "posts".');

  const seen = new Set<string>();
  posts.forEach((p, i) => {
    const where = `blog.json → posts[${i}]`;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p?.slug)) throw new Error(`${where}: "slug" debe ir en minúsculas con guiones.`);
    if (seen.has(p.slug)) throw new Error(`${where}: el slug "${p.slug}" está repetido.`);
    seen.add(p.slug);
    if (!p.title || !p.description) throw new Error(`${where}: faltan "title" o "description".`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) throw new Error(`${where}: "date" debe tener formato AAAA-MM-DD.`);
    if (!categories.includes(p.category)) {
      throw new Error(`${where}: categoría "${p.category}" no válida. Usa: ${categories.join(', ')}.`);
    }
    if (!p.href && !findBody(p.slug)) {
      throw new Error(`${where}: crea content/blog/${p.slug}.mdx o agrega "href" con el enlace al contenido.`);
    }
  });

  return posts as Post[];
}

export function getPosts(): Post[] {
  return [...validate(data)].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): { post: Post; body: BlogEntry } | undefined {
  const post = getPosts().find((p) => p.slug === slug);
  const body = post && findBody(slug);
  return post && body ? { post, body } : undefined;
}

/** URL de la tarjeta: el artículo propio si existe; si no, el `href`. */
export function postUrl(post: Post): string {
  return findBody(post.slug) ? `/blog/${post.slug}` : post.href!;
}

export const blogDateFormat = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});
