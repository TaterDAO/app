/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Future-Compatible
    styledComponents: true
  },
  // Note: this will become default in 12.2
  swcMinify: true
};

module.exports = nextConfig;
