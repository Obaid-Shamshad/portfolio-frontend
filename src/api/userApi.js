import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
const login = (credentials) => api.post('/auth/login', credentials);
const logout = () => api.post('/auth/logout');
const checkLogin = () => api.get('/auth/check-login');

export { login, logout, checkLogin };
