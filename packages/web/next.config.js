/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  // Note: this will become default in 12.2
  swcMinify: true,
  env: {
    NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: process.env.ALGOLIA_SEARCH_KEY
  }
};

module.exports = nextConfig;
