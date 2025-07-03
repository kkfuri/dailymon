module.exports = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ]
  },
  compress: true,
  poweredByHeader: false,
}
