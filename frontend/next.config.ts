import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

// Use plugin wrapper as recommended by vanilla-extract
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
};

export default withVanillaExtract(nextConfig);