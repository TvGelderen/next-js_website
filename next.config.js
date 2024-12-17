/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "www.nps.gov" },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
