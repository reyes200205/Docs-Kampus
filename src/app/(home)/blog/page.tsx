import type { Metadata } from 'next';
import { getPosts } from '@/lib/blog';
import { PostCard } from './components';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Lanzamientos, proyectos, módulos y artículos del equipo de Kampus.',
};

export default function BlogPage() {
  const [featured, ...rest] = getPosts();

  return (
    <main className="flex-1 pb-24">
      <section className="relative overflow-hidden border-b">
        <div className="blog-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-350 px-6 py-20 md:px-12">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Blog</h1>
          <p className="mt-5 max-w-2xl text-lg text-fd-muted-foreground md:text-xl">
            Lanzamientos, proyectos, módulos y artículos del equipo de Kampus.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-350 px-6 pt-12 md:px-12">
        {!featured ? (
          <p className="text-fd-muted-foreground">Todavía no hay publicaciones.</p>
        ) : (
          <>
            <PostCard post={featured} featured />
            {rest.length > 0 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
