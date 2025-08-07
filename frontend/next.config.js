/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  

  
  // API configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*'
      }
    ]
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
  },
  
  // Webpack configuration for audio files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|flac)$/,
      type: 'asset/resource'
    })
    return config
  }
}

module.exports = nextConfig