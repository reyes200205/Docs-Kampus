import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  // Sitio estático: sin optimizador de imágenes (/_next/image no existe en Cloudflare).
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default withMDX(config);
