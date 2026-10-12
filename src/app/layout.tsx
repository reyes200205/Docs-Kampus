import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import StaticSearchDialog from '@/components/search';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {/* Resaltado de coincidencias del buscador (ver global.css): fuera del CSS procesado por Lightning CSS. */}
        <style>{'::highlight(fd-search){color:var(--color-fd-primary);text-decoration-line:underline}'}</style>
        <RootProvider search={{ SearchDialog: StaticSearchDialog }}>{children}</RootProvider>
      </body>
    </html>
  );
}
