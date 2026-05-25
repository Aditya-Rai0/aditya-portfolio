import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(err);
  }
);

export const getProfile = () => api.get('/profile');
export const updateProfile = (formData) => api.put('/profile', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const seedProfile = () => api.post('/profile/seed');

export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const getCertificates = () => api.get('/certificates');
export const createCertificate = (formData) => api.post('/certificates', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const updateCertificate = (id, formData) => api.put(`/certificates/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const deleteCertificate = (id) => api.delete(`/certificates/${id}`);

export const login = (email, password) => api.post('/auth/login', { email, password });
export const checkAuth = () => api.get('/auth/me');

export const sendContact = (data) => api.post('/contact', data);

export const groqChat = (message) => api.post('/chat', { message });

export const getExperiences = () => api.get('/experiences');
export const createExperience = (data) => api.post('/experiences', data);
export const updateExperience = (id, data) => api.put(`/experiences/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experiences/${id}`);

export const getSkills = () => api.get('/skills');
export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

export const getAchievements = () => api.get('/achievements');
export const createAchievement = (data) => api.post('/achievements', data);
export const updateAchievement = (id, data) => api.put(`/achievements/${id}`, data);
export const deleteAchievement = (id) => api.delete(`/achievements/${id}`);

export const seedAllData = () => api.post('/seed/all');

export default api;
