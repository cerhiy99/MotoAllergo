/** @type {import('next').NextConfig} */
const nextConfig = {
  // Додайте ваші власні налаштування тут

  // Приклад: відключення автоматичного підбору Webpack
  webpack5: false,
  images: {
    domains: ["localhost"],
  },

  // інші налаштування...
};

module.exports = nextConfig;
