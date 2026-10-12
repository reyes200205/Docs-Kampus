'use client';

import { useEffect, useId, useState } from 'react';

/** Detecta el tema oscuro de Fumadocs (clase `dark` en <html>) y lo sigue en vivo. */
function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains('dark'));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

/** Diagrama Mermaid renderizado en el navegador: `<Mermaid chart={`erDiagram ...`} />`. */
export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '');
  const isDark = useIsDark();
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let cancelled = false;
    void import('mermaid').then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        fontFamily: 'inherit',
        theme: isDark ? 'dark' : 'default',
      });
      const { svg } = await mermaid.render(`mermaid-${id}`, chart.trim());
      if (!cancelled) setSvg(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id, isDark]);

  return (
    <div
      className="my-6 flex justify-center overflow-x-auto rounded-xl border bg-fd-card p-4 [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
