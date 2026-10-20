import type { Metadata } from 'next';
import { ChangelogView } from './changelog-view';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Cambios, mejoras y correcciones de la API, la app y la documentación de Kampus.',
};

// Sitio estático: los GitHub Releases se leen en el build.
export const dynamic = 'force-static';

export default function ChangelogPage() {
  return <ChangelogView />;
}
