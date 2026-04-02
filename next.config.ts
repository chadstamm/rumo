import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/docs/:slug',
        destination: '/anchors/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
