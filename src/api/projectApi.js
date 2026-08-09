import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const addProject = (projectData) => api.post("/project/add-project", projectData)
const editProject = (projectId, projectData) => api.put(`/project/edit-project/${projectId}`, projectData)
const deleteProject = (projectId) => api.delete(`/project/delete-project/${projectId}`);
const getProjects = () => api.get('/project/get-projects');
const getProject = (projectId) => api.get(`/project/get-project/${projectId}`);

export { addProject, editProject, deleteProject, getProjects, getProject };
