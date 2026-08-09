import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const addSkill = (skillData) => api.post('/skill/addSkill', skillData);
const editSkill = (skillId, skillData) => api.put(`/skill/edit-skill/${skillId}`, skillData);
const deleteSkill = (skillId) => api.delete(`/skill/delete-skill/${skillId}`);
const getSkills = () => api.get('/skill/get-skills');
const getSkill = (skillId) => api.get(`/skill/get-skill/${skillId}`); 

export { addSkill, editSkill, deleteSkill, getSkills, getSkill };