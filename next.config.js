const isProd = process.env.NODE_ENV === 'production';
const repoName = '/Suniel-Gupta';

const nextConfig = {
  output: 'export',
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? repoName : '',
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
