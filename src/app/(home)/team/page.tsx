import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { areaLabel, areas, avatarUrl, getMembers, initials, type Area, type Member } from '@/lib/team';

export const metadata: Metadata = {
  title: 'Equipo',
  description: 'Quiénes construyen Kampus y qué hace cada integrante.',
};

const areaColor: Record<Area, string> = {
  scrum: 'border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-300',
  product: 'border-brand/40 bg-brand/10 text-brand',
  backend: 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-300',
  frontend: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  docs: 'border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-300',
};

export default function TeamPage() {
  const members = getMembers();
  const count = (area: Area) => members.filter((m) => m.areas.includes(area)).length;

  return (
    <main className="flex-1 pb-24">
      <section className="relative overflow-hidden border-b">
        <div className="blog-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-350 px-6 py-20 md:px-12">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Equipo</h1>
          <p className="mt-5 max-w-2xl text-lg text-fd-muted-foreground md:text-xl">
            Las personas que construyen Kampus y de qué se encarga cada una.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {areas
              .filter((area) => count(area) > 0)
              .map((area) => (
                <span key={area} className={`rounded-md border px-2.5 py-1 text-xs font-medium ${areaColor[area]}`}>
                  {areaLabel[area]} · {count(area)}
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* Los 5 en una fila en pantallas anchas (con subgrid para alinear las secciones); en las demás, la última fila se centra. */}
      <div className="mx-auto flex max-w-400 flex-wrap justify-center gap-5 px-6 pt-12 md:px-12 xl:grid xl:grid-cols-5 xl:gap-y-6">
        {members.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </div>
    </main>
  );
}

function MemberCard({ member }: { member: Member }) {
  const avatar = avatarUrl(member);

  return (
    <article className="flex w-full flex-col rounded-2xl border bg-fd-card p-6 transition-colors hover:border-brand/50 sm:w-[calc(50%-0.625rem)] lg:w-[calc((100%-2.5rem)/3)] xl:row-span-2 xl:grid xl:w-auto xl:grid-rows-subgrid">
      <div className="flex flex-col items-center text-center">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element -- sitio estático, sin optimizador de imágenes
          <img src={avatar} alt="" className="size-16 shrink-0 rounded-full border object-cover" />
        ) : (
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-solid text-xl font-semibold text-brand-foreground">
            {initials(member.name)}
          </span>
        )}
        <h2 className="mt-4 text-balance font-semibold leading-snug">{member.name}</h2>
        <p className="mt-1 text-sm text-brand">{member.role}</p>
        {member.github && (
          <a
            href={`https://github.com/${member.github}`}
            target="_blank"
            rel="noreferrer"
            className="mt-1 text-xs text-fd-muted-foreground hover:text-fd-foreground"
          >
            @{member.github}
          </a>
        )}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {member.areas.map((area) => (
            <span key={area} className={`rounded-md border px-2 py-0.5 text-xs font-medium ${areaColor[area]}`}>
              {areaLabel[area]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t pt-5 xl:mt-0">
        <p className="text-sm text-fd-muted-foreground">{member.summary}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {member.responsibilities.map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
