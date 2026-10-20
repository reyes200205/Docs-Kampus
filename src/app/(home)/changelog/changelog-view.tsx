import Link from 'next/link';
import { BookOpen, Bug, ExternalLink, GitBranch, ShieldCheck, Sparkles, TrendingUp, TriangleAlert } from 'lucide-react';
import {
  getReleases,
  isProjectId,
  projectIds,
  projects,
  releaseId,
  sectionLabel,
  type ChangelogItem,
  type ProjectId,
  type Release,
  type SectionType,
} from '@/lib/changelog';
import { cn } from '@/lib/cn';
import { CopyReleaseButton } from './copy-release-button';

const sectionMeta: Record<SectionType, { label: string; icon: typeof Sparkles; color: string }> = {
  features: { label: sectionLabel.features, icon: Sparkles, color: 'text-brand' },
  improvements: { label: sectionLabel.improvements, icon: TrendingUp, color: 'text-fd-success' },
  fixes: { label: sectionLabel.fixes, icon: Bug, color: 'text-fd-warning' },
  breaking: { label: sectionLabel.breaking, icon: TriangleAlert, color: 'text-fd-error' },
  security: { label: sectionLabel.security, icon: ShieldCheck, color: 'text-fd-info' },
  docs: { label: sectionLabel.docs, icon: BookOpen, color: 'text-fd-muted-foreground' },
};

/** Color de cada proyecto: etiqueta, punto de la línea de tiempo y pestaña activa. */
const projectColor: Record<ProjectId, { dot: string; badge: string }> = {
  app: { dot: 'bg-brand ring-brand/20', badge: 'border-brand/40 bg-brand/10' },
  api: { dot: 'bg-sky-500 ring-sky-500/20', badge: 'border-sky-500/40 bg-sky-500/10' },
  docs: { dot: 'bg-emerald-500 ring-emerald-500/20', badge: 'border-emerald-500/40 bg-emerald-500/10' },
};
const otherColor = { dot: 'bg-fd-muted-foreground ring-fd-muted-foreground/20', badge: 'bg-fd-secondary' };

function colorOf(project: string) {
  return isProjectId(project) ? projectColor[project] : otherColor;
}

function nameOf(project: string) {
  return isProjectId(project) ? projects[project].name : project;
}

const dateFormat = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Sin `project`: todas las versiones juntas. Con `project`: solo las de ese proyecto. */
export async function ChangelogView({ project }: { project?: ProjectId }) {
  const all = await getReleases();
  const releases = project ? all.filter((r) => r.project === project) : all;
  const count = (id: ProjectId) => all.filter((r) => r.project === id).length;

  return (
    // Como nuxt.com/changelog: en pantallas anchas el panel izquierdo se queda fijo y solo avanza la lista
    // de versiones. Su borde derecho es la línea de tiempo.
    <main className="flex-1 lg:grid lg:grid-cols-2">
      <aside className="relative overflow-hidden border-b lg:sticky lg:top-14 lg:h-[calc(100dvh-3.5rem)] lg:border-r lg:border-b-0">
        <div className="changelog-glow pointer-events-none absolute inset-0" />
        <div className="relative flex h-full flex-col justify-center px-6 py-16 md:px-12 lg:py-0 xl:pl-[max(3rem,calc((100vw-1400px)/2+3rem))]">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {project ? projects[project].title : 'Changelog'}
          </h1>
          <p className="mt-4 max-w-md text-lg text-fd-muted-foreground">
            {project
              ? projects[project].description
              : 'Cambios, mejoras y correcciones de la API, la app y la documentación de Kampus.'}
          </p>

          <nav aria-label="Proyectos" className="mt-8 flex flex-wrap gap-2">
            <ProjectTab href="/changelog" active={!project} label="Todos" count={all.length} />
            {projectIds.map((id) => (
              <ProjectTab
                key={id}
                href={`/changelog/${id}`}
                active={project === id}
                label={projects[id].name}
                count={count(id)}
                dot={projectColor[id].dot}
              />
            ))}
          </nav>

          <div className="mt-8 flex gap-6 text-sm font-medium">
            <Link href="/docs/project" className="inline-flex items-center gap-2 hover:text-brand">
              <BookOpen className="size-4" /> Documentación
            </Link>
            {project && (
              <a
                href={`https://github.com/${projects[project].repo}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand"
              >
                <GitBranch className="size-4" /> Repositorio
              </a>
            )}
          </div>
        </div>
      </aside>

      {/* En pantallas anchas la lista entra 8rem en el panel izquierdo: ahí van la fecha y el punto, sobre la línea. */}
      <section className="relative px-6 py-16 md:px-12 lg:-ms-32 lg:ps-0 lg:py-24">
        {releases.length === 0 ? (
          <p className="text-fd-muted-foreground lg:ps-44">Todavía no hay versiones publicadas.</p>
        ) : (
          <ol className="relative lg:flex lg:flex-col lg:gap-20">
            {releases.map((release) => (
              <ReleaseEntry key={releaseId(release)} release={release} />
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}

function ProjectTab({
  href,
  active,
  label,
  count,
  dot,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
  dot?: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'border-fd-foreground bg-fd-foreground text-fd-background'
          : 'bg-fd-background/60 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground',
      )}
    >
      {dot && <span className={cn('size-2 rounded-full', dot)} />}
      {label}
      <span className={cn('font-mono text-xs', active ? 'opacity-70' : 'opacity-60')}>{count}</span>
    </Link>
  );
}

function ReleaseEntry({ release }: { release: Release }) {
  const id = releaseId(release);
  const color = colorOf(release.project);

  return (
    <li id={id} className="relative scroll-mt-24 border-l pb-16 pl-8 last:pb-0 lg:flex lg:items-start lg:border-l-0 lg:pb-0 lg:pl-0">
      {/* Pantallas anchas: fecha y punto en la línea del panel; se quedan arriba mientras se lee la versión. */}
      <div className="sticky top-14 -mt-24 hidden w-32 shrink-0 items-center justify-end gap-3 pt-24 lg:flex">
        <time dateTime={release.date} className="truncate font-mono text-xs text-fd-muted-foreground">
          {dateFormat.format(new Date(release.date))}
        </time>
        <span className={cn('-me-[4.5px] size-2.5 shrink-0 rounded-full ring-4', color.dot)} />
      </div>

      <div className="min-w-0 max-w-2xl flex-1 lg:ps-12">
        {/* Pantallas angostas: línea de tiempo a la izquierda de cada versión. */}
        <span className={cn('absolute top-1.5 -left-1.25 size-2.5 rounded-full ring-4 lg:hidden', color.dot)} />
        <time dateTime={release.date} className="font-mono text-xs text-fd-muted-foreground lg:hidden">
          {dateFormat.format(new Date(release.date))}
        </time>

        <div className="mt-3 flex items-start justify-between gap-4 lg:mt-0">
          <div>
            <Link
              href={isProjectId(release.project) ? `/changelog/${release.project}` : '/changelog'}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium hover:opacity-80',
                color.badge,
              )}
            >
              <span className={cn('size-1.5 rounded-full', color.dot)} />
              {nameOf(release.project)}
            </Link>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              <a href={`#${id}`} className="hover:text-brand">
                {release.version}
              </a>
            </h2>
            {release.summary && <p className="mt-2 text-fd-muted-foreground">{release.summary}</p>}
          </div>
          <CopyReleaseButton markdown={toMarkdown(release)} />
        </div>

        <div className="mt-6 space-y-8 border-t pt-6">
          {release.sections.map((section, i) => {
            const { label, icon: Icon, color } = sectionMeta[section.type];
            return (
              <div key={i}>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Icon className={`size-4 ${color}`} /> {label}
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-fd-muted-foreground">
                  {section.items.map((item, j) => (
                    <ChangelogLine key={j} item={item} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {release.link && (
          <a
            href={release.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            Ver cambios <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    </li>
  );
}

function ChangelogLine({ item }: { item: ChangelogItem }) {
  return (
    <li className="text-sm leading-relaxed">
      <InlineCode text={item.text} />
      {item.author && <span className="text-fd-muted-foreground"> · {item.author}</span>}
      {item.link && (
        <>
          {' '}
          <a href={item.link} target="_blank" rel="noreferrer" className="text-brand hover:underline">
            {shortLink(item.link)}
          </a>
        </>
      )}
    </li>
  );
}

/** Convierte `texto` entre comillas invertidas en <code>. */
function InlineCode({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <code key={i} className="rounded border bg-fd-secondary px-1 py-0.5 font-mono text-[0.85em]">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}

/** github.com/org/repo/pull/12 → #12; …/commit/abc1234… → abc1234; cualquier otro enlace → "enlace". */
function shortLink(url: string): string {
  const pr = url.match(/\/(?:pull|issues)\/(\d+)/);
  if (pr) return `#${pr[1]}`;
  const commit = url.match(/\/commit\/([0-9a-f]{7})/);
  return commit ? commit[1] : 'enlace';
}

function toMarkdown(release: Release): string {
  const lines = [`## ${nameOf(release.project)} ${release.version} (${release.date})`];
  if (release.summary) lines.push('', release.summary);
  for (const section of release.sections) {
    lines.push('', `### ${sectionMeta[section.type].label}`, '');
    for (const item of section.items) {
      const author = item.author ? ` (${item.author})` : '';
      const link = item.link ? ` ${item.link}` : '';
      lines.push(`- ${item.text}${author}${link}`);
    }
  }
  if (release.link) lines.push('', release.link);
  return lines.join('\n');
}
