// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/projects', // URL backend Anda
});

export const getCountAllProjects = () => api.get('/countAll');
export const getCountOngoingProjects = () => api.get('/countOngoing');
export const getCountCompletedProjects = () => api.get('/countCompleted');

export default api;
