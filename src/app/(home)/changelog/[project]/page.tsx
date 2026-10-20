import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isProjectId, projectIds, projects } from '@/lib/changelog';
import { ChangelogView } from '../changelog-view';

// Sitio estático: una página por proyecto (/changelog/app, /changelog/api, /changelog/docs).
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return projectIds.map((project) => ({ project }));
}

export async function generateMetadata({ params }: PageProps<'/changelog/[project]'>): Promise<Metadata> {
  const { project } = await params;
  if (!isProjectId(project)) return {};
  return { title: projects[project].title, description: projects[project].description };
}

export default async function ProjectChangelogPage({ params }: PageProps<'/changelog/[project]'>) {
  const { project } = await params;
  if (!isProjectId(project)) notFound();
  return <ChangelogView project={project} />;
}
