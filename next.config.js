/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.immediate.co.uk',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
