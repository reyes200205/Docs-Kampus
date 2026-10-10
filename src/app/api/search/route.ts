import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Con `output: 'export'` no hay servidor: el índice de búsqueda se genera en el build
// como archivo estático y el navegador lo descarga y busca localmente.
export const revalidate = false;

export const { staticGET: GET } = createFromSource(source);
