import { cn } from '@/lib/cn';

/** Isotipo de Kampus: el pin de mapa con la K. */
export function LogoMark({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- sitio estático, sin optimizador de imágenes
  return <img src="/brand/logo-mark.svg" alt="" aria-hidden className={cn('size-5 shrink-0 object-contain', className)} />;
}
