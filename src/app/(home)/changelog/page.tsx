import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Bug, ExternalLink, ShieldCheck, Sparkles, TrendingUp, TriangleAlert } from 'lucide-react';
import { getReleases, releaseId, sectionLabel, type ChangelogItem, type Release, type SectionType } from '@/lib/changelog';
import { CopyReleaseButton } from './copy-release-button';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Cambios, mejoras y correcciones de la API, la app y la documentación de Kampus.',
};

// Sitio estático: los GitHub Releases se leen en el build.
export const dynamic = 'force-static';

const sectionMeta: Record<SectionType, { label: string; icon: typeof Sparkles; color: string }> = {
  features: { label: sectionLabel.features, icon: Sparkles, color: 'text-brand' },
  improvements: { label: sectionLabel.improvements, icon: TrendingUp, color: 'text-fd-success' },
  fixes: { label: sectionLabel.fixes, icon: Bug, color: 'text-fd-warning' },
  breaking: { label: sectionLabel.breaking, icon: TriangleAlert, color: 'text-fd-error' },
  security: { label: sectionLabel.security, icon: ShieldCheck, color: 'text-fd-info' },
  docs: { label: sectionLabel.docs, icon: BookOpen, color: 'text-fd-muted-foreground' },
};

const dateFormat = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default async function ChangelogPage() {
  const releases = await getReleases();

  return (
    <main className="grid flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <aside className="relative overflow-hidden border-b lg:border-r lg:border-b-0">
        <div className="changelog-glow pointer-events-none absolute inset-0" />
        <div className="relative flex flex-col justify-center px-6 py-16 md:px-12 lg:sticky lg:top-14 lg:h-[calc(100dvh-3.5rem)] lg:py-0 xl:pl-[max(3rem,calc((100vw-1400px)/2+3rem))]">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Changelog</h1>
          <p className="mt-4 max-w-md text-lg text-fd-muted-foreground">
            Cambios, mejoras y correcciones de la API, la app y la documentación de Kampus.
          </p>
          <div className="mt-8 flex gap-6 text-sm font-medium">
            <Link href="/docs" className="inline-flex items-center gap-2 hover:text-brand">
              <BookOpen className="size-4" /> Documentación
            </Link>
          </div>
        </div>
      </aside>

      <section className="px-6 py-16 md:px-12">
        {releases.length === 0 ? (
          <p className="text-fd-muted-foreground">Todavía no hay versiones publicadas.</p>
        ) : (
          <ol className="relative max-w-2xl">
            {releases.map((release) => (
              <ReleaseEntry key={releaseId(release)} release={release} />
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}

function ReleaseEntry({ release }: { release: Release }) {
  const id = releaseId(release);

  return (
    <li id={id} className="relative scroll-mt-24 border-l pb-16 pl-8 last:pb-0">
      <span className="absolute top-1.5 -left-1.25 size-2.5 rounded-full bg-brand ring-4 ring-brand/20" />
      <time dateTime={release.date} className="font-mono text-xs text-fd-muted-foreground">
        {dateFormat.format(new Date(release.date))}
      </time>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-md border bg-fd-secondary px-2 py-0.5 font-mono text-xs">
            {release.project}
          </span>
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

/** github.com/org/repo/pull/12 → #12; cualquier otro enlace → "enlace". */
function shortLink(url: string): string {
  const match = url.match(/\/(?:pull|issues)\/(\d+)/) ?? url.match(/\/commit\/([0-9a-f]{7})/);
  return match ? (/^\d+$/.test(match[1]) ? `#${match[1]}` : match[1]) : 'enlace';
}

function toMarkdown(release: Release): string {
  const lines = [`## ${release.project} ${release.version} (${release.date})`];
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
