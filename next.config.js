/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/DC-John',
  assetPrefix: '/DC-John/',
  reactStrictMode: true,
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
