import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL 환경 변수를 설정해 주세요.');
}

export const api = axios.create({
  baseURL,
  timeout: 10_000,
});

api.interceptors.request.use((config) => {
  const authorizationCode = localStorage.getItem('authorizationCode');

  if (authorizationCode) {
    config.headers.set('Authorization', authorizationCode);
  }

  return config;
});
