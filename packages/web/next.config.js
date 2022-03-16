/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  // Note: this will become default in 12.2
  swcMinify: true
};

module.exports = nextConfig;
