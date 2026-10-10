import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { LogoMark } from '@/components/logo';

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
    ],
  };
}
