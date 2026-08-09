import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const getProfile = () => api.get("/profile/get-profile");
const updateProfile = (profileData) => api.put("/profile/update-profile", profileData);
const uploadCV = (cvFile) => api.post("/profile/upload-cv", cvFile)

export { getProfile, updateProfile, uploadCV };