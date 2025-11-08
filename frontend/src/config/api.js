import axios from 'axios';

// URL base dell'API
// In produzione usa URL relativo, in development usa localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:3000/api');

// Crea istanza axios configurata
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per aggiungere token JWT alle richieste
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor per gestire errori di autenticazione
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token scaduto o non valido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Reindirizza al login se necessario
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Methods

// Auth
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// Users
export const getMyProfile = () => api.get('/users/me');
export const getUserProfile = (userId) => api.get(`/users/${userId}`);
export const getUserPhotos = (userId) => api.get(`/users/${userId}/photos`);
export const updateProfile = (updates) => api.put('/users/me', updates);

// Astronomical Objects
export const getAllObjects = () => api.get('/objects');
export const getObjectById = (id) => api.get(`/objects/${id}`);
export const searchObjects = (query) => api.get(`/objects/search/${query}`);
export const getObjectsByType = (type) => api.get(`/objects/type/${type}`);
export const createObject = (objectData) => api.post('/objects', objectData);

// Astrophotos
export const getAllPhotos = (limit = 50, offset = 0) => 
  api.get(`/photos?limit=${limit}&offset=${offset}`);
export const getPhotoById = (id) => api.get(`/photos/${id}`);
export const uploadPhoto = (formData) => 
  api.post('/photos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
export const deletePhoto = (id) => api.delete(`/photos/${id}`);

// OpenAI
export const getAstronomicalData = (objectName) => 
  api.post('/openai/astronomical-data', { objectName });

export default api;

