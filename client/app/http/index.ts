import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

const authInterceptor = (config: any) => {
  config.headers.KEY = localStorage.getItem('token');
  return config;
};

const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
