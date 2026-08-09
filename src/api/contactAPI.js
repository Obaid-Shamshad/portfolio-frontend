import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const sendMessage = (messageData) => api.post("/contact/sendMessage", messageData);

export { sendMessage }