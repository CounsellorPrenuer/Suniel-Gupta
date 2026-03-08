const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/Suniel_Gupta' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Suniel_Gupta/' : '',
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
