/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'm.media-amazon.com',
      'encrypted-tbn0.gstatic.com',
      'encrypted-tbn3.gstatic.com' // ✅ Add this to allow tbn3
    ],
    remotePatterns: [
      {
        protocol: 'https', // ✅ Use https here instead of http
        hostname: '*',
      },
    ],
  },
};

module.exports = nextConfig;
