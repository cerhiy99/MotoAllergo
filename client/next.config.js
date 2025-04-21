/** @type {import('next').NextConfig} */
const { URL } = require('url');
const serverUrl = process.env.NEXT_PUBLIC_SERVER || 'http://89.116.23.200:4444';
const parsedUrl = new URL(serverUrl);
const nextConfig = {
  // Додайте ваші власні налаштування тут

  // Приклад: відключення автоматичного підбору Webpack
  webpack5: false,
  images: {
    domains: ['localhost','45.94.156.193','89.116.23.200'],
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
