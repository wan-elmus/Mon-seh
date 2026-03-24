// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   images: {
//     formats: ['image/webp', 'image/avif'],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256],
//   },
//   experimental: {
//     optimizeCss: true,
//   },
//   devIndicators: false,
// }

// export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['195.7.7.15'],
  turbopack: {
    root: '/root/sensei/Mon-seh',
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig