import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/web",        destination: "/services", permanent: true },
      { source: "/referral",   destination: "/services", permanent: true },
      { source: "/consulting", destination: "/services", permanent: true },
      { source: "/work",       destination: "/",         permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
