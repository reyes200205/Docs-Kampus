import Link from 'next/link';
import { LogoMark } from '@/components/logo';
import { AlignLeft, GitBranch, PanelLeft, Rocket, Search, ServerCog, Smartphone, FileText } from 'lucide-react';

const sections = [
  {
    icon: ServerCog,
    title: 'Backend y API',
    description: 'Laravel 13 y PostgreSQL: cómo levantarlo, y la API REST con autenticación y endpoints de ejemplo.',
    href: '/docs/backend',
  },
  {
    icon: Smartphone,
    title: 'App móvil',
    description: 'Expo y React Native: instalación, cómo verla en tu celular, estructura y solución de problemas.',
    href: '/docs/mobile',
  },
  {
    icon: GitBranch,
    title: 'Desarrollo',
    description: 'Flujo de ramas, convención de commits, pull requests y Definition of Done del equipo.',
    href: '/docs/development',
  },
  {
    icon: FileText,
    title: 'Rubricas de Trabajo',
    description: 'Instrumentos de evaluación del proyecto.',
    href:'https://drive.google.com/drive/folders/1imB-gA_tdjIHKwbCjUbrPufOmZtypxy1'
  }
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col pb-24">
      <section className="px-4 pt-4 md:px-6">
        <div className="hero-bg relative mx-auto max-w-350 overflow-hidden rounded-2xl border">
          <div className="hero-grain pointer-events-none absolute inset-0" />
          <div className="dot-sphere pointer-events-none absolute -right-16 top-24 hidden size-105 lg:block xl:right-24" />

          <div className="relative px-6 pt-20 md:px-14 md:pt-28">
            <span className="inline-flex rounded-full border border-brand/60 px-3 py-1 text-xs font-medium text-brand">
              Documentación interna · Acceso restringido
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
              Todo Kampus,
              <br />
              en <span className="text-brand">un solo lugar</span>.
            </h1>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="rounded-full bg-brand-solid px-6 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
              >
                Empezar
              </Link>
              <Link
                href="/docs/backend/api"
                className="rounded-full border bg-fd-background/60 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-fd-accent"
              >
                Ver la API
              </Link>
            </div>
          </div>

          <DocsPreview />
        </div>
      </section>

      <section className="mx-auto mt-24 w-full max-w-350 px-6 md:px-20">
        <p className="text-2xl leading-snug tracking-tight text-fd-muted-foreground md:text-4xl">
          <span className="text-brand">Kampus</span> conecta a estudiantes de la{' '}
          <span className="text-fd-foreground">UTT</span>, la <span className="text-fd-foreground">UAdeC</span> y el{' '}
          <span className="text-fd-foreground">Tec de la Laguna</span>. Aquí vive la documentación de la{' '}
          <span className="text-fd-foreground">API</span>, la <span className="text-fd-foreground">app móvil</span> y
          la forma de trabajar del equipo, para encontrar <span className="text-brand">la respuesta correcta</span> sin
          preguntar dos veces.
        </p>
      </section>

      <section className="mx-auto mt-20 grid w-full max-w-350 gap-4 px-6 sm:grid-cols-2 md:px-20 lg:grid-cols-3">
        {sections.map(({ icon: Icon, title, description, href }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border bg-fd-card p-6 transition-colors hover:border-brand/50"
          >
            <div className="mb-4 inline-flex rounded-lg border bg-fd-secondary p-2 text-brand">
              <Icon className="size-5" />
            </div>
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-fd-muted-foreground">{description}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto mt-20 w-full max-w-350 px-6 md:px-20">
        <div className="relative overflow-hidden rounded-2xl border bg-fd-card p-8 md:p-12">
          <div className="hero-bg absolute inset-0 opacity-40" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">¿No sabes por dónde empezar?</h2>
              <p className="mt-2 text-fd-muted-foreground">
                Revisa la introducción o busca cualquier tema con <kbd className="rounded border px-1.5 text-xs">Ctrl</kbd>{' '}
                <kbd className="rounded border px-1.5 text-xs">K</kbd>.
              </p>
            </div>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full bg-brand-solid px-6 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
            >
              <Rocket className="size-4" />
              Ir a la introducción
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Maqueta estática de la interfaz de docs, como la vista previa de fumadocs.dev. */
function DocsPreview() {
  const nav = ['Introducción', 'Backend', 'App móvil', 'Desarrollo'];
  const toc = ['Qué es Kampus', 'Instituciones', 'Stack', 'Equipo', 'Privacidad'];

  return (
    <div className="relative mt-16 ml-6 -mb-px overflow-hidden rounded-tl-2xl border-t border-l bg-fd-background/95 md:ml-[22%]">
      <div className="flex text-sm">
        <aside className="hidden w-60 shrink-0 flex-col gap-3 border-r p-4 sm:flex">
          <div className="flex items-center justify-between font-medium">
            <span className="flex items-center gap-2">
              <LogoMark className="size-4" />
              Kampus
            </span>
            <PanelLeft className="size-4 text-fd-muted-foreground" />
          </div>
          <div className="flex items-center gap-2 rounded-lg border bg-fd-secondary/50 px-2 py-1.5 text-xs text-fd-muted-foreground">
            <Search className="size-3.5" /> Buscar
          </div>
          <ul className="mt-2 flex flex-col gap-1 text-xs">
            {nav.map((item, i) => (
              <li
                key={item}
                className={
                  i === 0
                    ? 'rounded-md bg-brand/10 px-2 py-1.5 font-medium text-brand'
                    : 'px-2 py-1.5 text-fd-muted-foreground'
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1 p-6 md:p-8">
          <p className="text-2xl font-semibold">Introducción</p>
          <p className="mt-2 text-fd-muted-foreground">Bienvenido a la documentación de Kampus.</p>
          <div className="mt-4 flex gap-2 border-b pb-5 text-xs">
            <span className="rounded-md border px-2 py-1">Copiar Markdown</span>
            <span className="rounded-md border px-2 py-1">Abrir</span>
          </div>
          <p className="mt-6 text-lg font-semibold">Qué es Kampus</p>
          <div className="mt-3 space-y-2">
            <div className="h-2.5 w-11/12 rounded bg-fd-muted" />
            <div className="h-2.5 w-4/5 rounded bg-fd-muted" />
            <div className="h-2.5 w-2/3 rounded bg-fd-muted" />
          </div>
        </div>

        <aside className="hidden w-52 shrink-0 p-6 text-xs lg:block">
          <p className="flex items-center gap-2 text-fd-muted-foreground">
            <AlignLeft className="size-3.5" /> En esta página
          </p>
          <ul className="mt-3 border-l">
            {toc.map((item, i) => (
              <li
                key={item}
                className={
                  i === 0
                    ? '-ml-px border-l border-brand py-1 pl-3 text-brand'
                    : 'py-1 pl-3 text-fd-muted-foreground'
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
