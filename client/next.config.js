/** @type {import('next').NextConfig} */
const nextConfig = {
  // Додайте ваші власні налаштування тут

  // Приклад: відключення автоматичного підбору Webpack
  webpack5: false,
  images: {
    domains: ['localhost','45.94.156.193'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // інші налаштування...
};

module.exports = nextConfig;
