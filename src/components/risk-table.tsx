import React from 'react';

export interface RiskData {
  id: string;
  riesgo: string;
  prob: number;
  impacto: number;
  puntaje?: number;
  nivel?: 'Alto' | 'Medio' | 'Bajo' | string;
  consecuencia: string;
  respuesta?: string;
  plan: string;
}

export interface RiskTableProps {
  items?: RiskData[];
  children?: React.ReactNode;
}

/** Componente auxiliar para declarar riesgos como hijos de RiskTable */
export function RiskItem(_props: RiskData) {
  return null;
}

function resolveLevel(score: number): { name: string; badgeClass: string; icon: string } {
  if (score >= 15) {
    return {
      name: 'Alto',
      icon: '🔴',
      badgeClass:
        'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/25',
    };
  }
  if (score >= 7) {
    return {
      name: 'Medio',
      icon: '🟡',
      badgeClass:
        'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25',
    };
  }
  return {
    name: 'Bajo',
    icon: '🟢',
    badgeClass:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25',
  };
}

export function RiskTable({ items, children }: RiskTableProps) {
  // Extrae los items ya sea desde la propiedad `items` o desde elementos <RiskItem /> hijos
  const list: RiskData[] = [];

  if (items && Array.isArray(items)) {
    list.push(...items);
  }

  if (children) {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement<RiskData>(child) && child.props) {
        list.push(child.props);
      }
    });
  }

  return (
    <div className="my-6 w-full overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-fd-border bg-fd-muted/50 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
              <th scope="col" className="px-3 py-3 text-center w-14">#</th>
              <th scope="col" className="px-4 py-3 min-w-55">Riesgo</th>
              <th scope="col" className="px-2 py-3 text-center w-14">Prob.</th>
              <th scope="col" className="px-2 py-3 text-center w-16">Impacto</th>
              <th scope="col" className="px-2 py-3 text-center w-16">Puntaje</th>
              <th scope="col" className="px-3 py-3 text-center w-24">Nivel</th>
              <th scope="col" className="px-4 py-3 min-w-55">Consecuencia</th>
              <th scope="col" className="px-3 py-3 text-center w-24">Respuesta</th>
              <th scope="col" className="px-4 py-3 min-w-65">Plan de manejo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fd-border text-fd-foreground">
            {list.map((item) => {
              const score = item.puntaje ?? item.prob * item.impacto;
              const levelInfo = resolveLevel(score);
              const levelText = item.nivel ?? levelInfo.name;
              const badgeClass =
                levelText.toLowerCase().includes('alto')
                  ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/25'
                  : levelText.toLowerCase().includes('medio')
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25';
              const icon =
                levelText.toLowerCase().includes('alto')
                  ? '🔴'
                  : levelText.toLowerCase().includes('medio')
                  ? '🟡'
                  : '🟢';

              return (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-fd-muted/30 align-top"
                >
                  {/* ID */}
                  <td className="px-3 py-3 text-center font-mono font-semibold text-fd-primary">
                    {item.id}
                  </td>

                  {/* Riesgo */}
                  <td className="px-4 py-3 font-medium text-fd-foreground">
                    {item.riesgo}
                  </td>

                  {/* Probabilidad */}
                  <td className="px-2 py-3 text-center text-fd-muted-foreground font-mono">
                    {item.prob}
                  </td>

                  {/* Impacto */}
                  <td className="px-2 py-3 text-center text-fd-muted-foreground font-mono">
                    {item.impacto}
                  </td>

                  {/* Puntaje */}
                  <td className="px-2 py-3 text-center font-bold text-fd-foreground font-mono">
                    {score}
                  </td>

                  {/* Nivel */}
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${badgeClass}`}
                    >
                      <span>{icon}</span>
                      <span>{levelText}</span>
                    </span>
                  </td>

                  {/* Consecuencia */}
                  <td className="px-4 py-3 text-fd-muted-foreground text-xs leading-relaxed">
                    {item.consecuencia}
                  </td>

                  {/* Respuesta */}
                  <td className="px-3 py-3 text-center whitespace-nowrap text-xs font-medium text-fd-foreground">
                    <span className="inline-block px-2 py-0.5 rounded bg-fd-secondary text-fd-secondary-foreground">
                      {item.respuesta ?? 'Mitigar'}
                    </span>
                  </td>

                  {/* Plan de manejo */}
                  <td className="px-4 py-3 text-fd-muted-foreground text-xs leading-relaxed">
                    {item.plan}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
