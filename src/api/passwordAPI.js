import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const changePassword = (passwordData) => api.post("password/change-password", passwordData);
const forgotPassword = (userData) => api.post("password/forgot-password", userData);

export { changePassword, forgotPassword }