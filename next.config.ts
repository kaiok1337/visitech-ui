import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add rewrites to allow direct access to the vanilla JS app
  async rewrites() {
    return [
      {
        source: '/graphing',
        destination: '/graphing.html',
      },
      {
        source: '/app/:path*',
        destination: '/:path*', // Redirect app paths to public folder equivalents
      }
    ]
  },
};

export default nextConfig;
