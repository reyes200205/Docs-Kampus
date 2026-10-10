import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

// Colecciones de contenido. fumadocs-mdx genera `.source/` a partir de este archivo.
// Se usa este modo (y no `fumadocs-mdx/macro`) porque el macro carga un binario nativo
// que el Control inteligente de aplicaciones de Windows bloquea.
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Cuerpo de los artículos del blog: content/blog/<slug>.mdx (los datos de cada tarjeta viven en content/blog.json).
export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/blog',
});

export default defineConfig();
