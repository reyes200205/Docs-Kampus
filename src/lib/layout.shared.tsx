import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import { MessagesSquare, SquareKanban } from 'lucide-react';
import { LogoMark } from '@/components/logo';
import { planeUrl, slackUrl } from './shared';

/** Enlaces a las herramientas del equipo; también se muestran en el sidebar de la documentación. */
export const toolLinks: LinkItemType[] = [
  { icon: <SquareKanban />, text: 'Plane', description: 'Tareas y cronograma', url: planeUrl, external: true },
  { icon: <MessagesSquare />, text: 'Slack', description: 'Canal del equipo', url: slackUrl, external: true },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <LogoMark className="size-6" />
          {/* "Kam" en el color de acento, igual que el logotipo de la app. */}
          <span>
            <span className="text-brand">Kam</span>pus
          </span>
        </span>
      ),
    },
    links: [
      { text: 'Home', url: '/', active: 'nested-url' },
      { text: 'Docs', url: '/docs', active: 'nested-url' },
      { text: 'Blog', url: '/blog', active: 'nested-url' },
      { text: 'Changelog', url: '/changelog', active: 'nested-url' },
      { text: 'Equipo', url: '/team', active: 'nested-url' },
      ...toolLinks,
    ],
  };
}
