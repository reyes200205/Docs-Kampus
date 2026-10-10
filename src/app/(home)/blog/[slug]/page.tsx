import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getMDXComponents } from '@/components/mdx';
import { getPost, getPosts } from '@/lib/blog';
import { Authors, PostCover, PostMeta } from '../components';

// Sitio estático: solo existen los slugs con artículo .mdx.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts()
    .filter((post) => getPost(post.slug))
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const result = getPost(slug);
  if (!result) notFound();

  return { title: result.post.title, description: result.post.description };
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  const result = getPost(slug);
  if (!result) notFound();

  const { post, body } = result;
  const MDX = body.body;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 pt-12 pb-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground"
      >
        <ArrowLeft className="size-4" /> Blog
      </Link>

      <header className="mt-8">
        <PostMeta post={post} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-fd-muted-foreground">{post.description}</p>
        <div className="mt-6">
          <Authors authors={post.authors} />
        </div>
      </header>

      <div className="mt-10 aspect-video overflow-hidden rounded-2xl border">
        <PostCover post={post} />
      </div>

      <article className="prose mt-12 max-w-none">
        <MDX components={getMDXComponents()} />
      </article>
    </main>
  );
}
