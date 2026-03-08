/** @type {import('next').NextConfig} */
const repoBasePath = '/Suniel-Gupta'

const nextConfig = {
  output: 'export',
  basePath: repoBasePath,
  assetPrefix: `${repoBasePath}/`,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
