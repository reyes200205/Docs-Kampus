import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, toolLinks } from '@/lib/layout.shared';

// Color del ícono de cada sección en el selector del sidebar (carpetas con `"root": true` en meta.json).
const tabColors: Record<string, string> = {
  '/docs': 'text-brand bg-brand/10',
  '/docs/backend': 'text-rose-500 bg-rose-500/10',
  '/docs/mobile': 'text-emerald-500 bg-emerald-500/10',
  '/docs/development': 'text-violet-500 bg-violet-500/10',
};

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      // Sin Home/Docs/Blog/Changelog: en la documentación el sidebar muestra las secciones y solo Plane y Slack.
      links={toolLinks}
      tabs={{
        transform: (tab) => ({
          ...tab,
          icon: tab.icon && (
            <span
              className={`flex size-full items-center justify-center rounded-md border [&_svg]:size-4 ${tabColors[tab.url] ?? 'text-brand bg-brand/10'}`}
            >
              {tab.icon}
            </span>
          ),
        }),
      }}
    >
      {children}
    </DocsLayout>
  );
}
