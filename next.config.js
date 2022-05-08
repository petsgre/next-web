/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 严格模式会渲染两次组件
  env: {
    mode: 'dev',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
