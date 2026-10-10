import Link from 'next/link';
import { blogDateFormat, categoryLabel, postUrl, type Author, type Post } from '@/lib/blog';
import { cn } from '@/lib/cn';
import { LogoMark } from '@/components/logo';

/** Portada: la imagen del post o, si no tiene, una generada con los colores de la marca. */
export function PostCover({ post, className }: { post: Post; className?: string }) {
  if (post.image) {
    // eslint-disable-next-line @next/next/no-img-element -- sitio estático, sin optimizador de imágenes
    return <img src={post.image} alt="" className={cn('size-full object-cover', className)} />;
  }

  return (
    <div className={cn('hero-bg relative flex size-full items-center justify-center overflow-hidden p-8', className)}>
      <div className="hero-grain pointer-events-none absolute inset-0" />
      <div className="dot-sphere pointer-events-none absolute -right-10 -bottom-16 size-56 opacity-70" />
      <div className="relative text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-medium text-white/70">
          <LogoMark className="size-4" />
          Kampus
        </p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {post.coverText ?? post.title}
        </p>
      </div>
    </div>
  );
}

export function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-3 text-sm text-fd-muted-foreground">
      <span className="rounded-md border border-brand/40 bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
        {categoryLabel[post.category]}
      </span>
      <time dateTime={post.date}>{blogDateFormat.format(new Date(post.date))}</time>
    </div>
  );
}

export function Authors({ authors }: { authors?: Author[] }) {
  if (!authors?.length) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {authors.map((author) =>
          author.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element -- sitio estático, sin optimizador de imágenes
            <img
              key={author.name}
              src={author.avatar}
              alt={author.name}
              className="size-8 rounded-full border-2 border-fd-card object-cover"
            />
          ) : (
            <span
              key={author.name}
              title={author.name}
              className="flex size-8 items-center justify-center rounded-full border-2 border-fd-card bg-brand-solid text-xs font-semibold text-white"
            >
              {initials(author.name)}
            </span>
          ),
        )}
      </div>
      {authors.length === 1 && <span className="text-sm font-medium">{authors[0].name}</span>}
    </div>
  );
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={postUrl(post)}
      className={cn(
        'group flex overflow-hidden rounded-2xl border bg-fd-card transition-colors hover:border-brand/50',
        featured ? 'flex-col md:flex-row' : 'flex-col',
      )}
    >
      <div className={cn('aspect-video shrink-0 overflow-hidden', featured && 'md:aspect-auto md:min-h-80 md:w-1/2')}>
        <PostCover post={post} className="transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className={cn('flex flex-1 flex-col gap-3 p-6', featured && 'md:justify-center md:p-10')}>
        <PostMeta post={post} />
        <h2 className={cn('font-semibold tracking-tight', featured ? 'text-2xl md:text-3xl' : 'text-lg')}>
          {post.title}
        </h2>
        <p className="text-fd-muted-foreground">{post.description}</p>
        <div className="mt-auto pt-3">
          <Authors authors={post.authors} />
        </div>
      </div>
    </Link>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}
