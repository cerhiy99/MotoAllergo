const axios = require('axios');

const $browser = axios.create({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Accept-Language': 'uk-UA,uk;q=0.9',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    Connection: 'keep-alive',
    Referer: 'https://google.com',
  },
  timeout: 10000, // 10 секунд, можеш змінити
});

module.exports = $browser;
