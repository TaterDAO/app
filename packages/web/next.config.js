/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  swcMinify: false,
  env: {
    NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    INFURA_IPFS_JWT: `Basic ${Buffer.from(
      `${process.env.INFURA_IPFS_PROJECT_ID}:${process.env.INFURA_IPFS_PROJECT_SECRET}`
    ).toString("base64")}`,
    // Flag to disable minting / burning application-wide. Useful when running migrations or backfills.
    NEXT_PUBLIC_DISABLE_TRANSACTIONS: false
  },
  optimizeFonts: false,
  images: {
    domains: ["taterdao.infura-ipfs.io"]
  }
};

module.exports = nextConfig;
