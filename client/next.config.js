/** @type {import('next').NextConfig} */
const nextConfig = {
  // Додайте ваші власні налаштування тут

  // Приклад: відключення автоматичного підбору Webpack
  
  images: {
    domains: ['localhost'],
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
