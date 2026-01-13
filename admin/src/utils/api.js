import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    init: () => api.post('/auth/init'),
};

export const profileAPI = {
    get: () => api.get('/profile'),
    update: (data) => api.put('/profile', data),
};

export const aboutAPI = {
    get: () => api.get('/about'),
    update: (data) => api.put('/about', data),
};

export const skillsAPI = {
    getAll: () => api.get('/skills/all'),
    get: (id) => api.get(`/skills/${id}`),
    create: (data) => api.post('/skills', data),
    update: (id, data) => api.put(`/skills/${id}`, data),
    delete: (id) => api.delete(`/skills/${id}`),
};

export const toolsAPI = {
    getAll: () => api.get('/tools/all'),
    get: (id) => api.get(`/tools/${id}`),
    create: (data) => api.post('/tools', data),
    update: (id, data) => api.put(`/tools/${id}`, data),
    delete: (id) => api.delete(`/tools/${id}`),
};

export const projectsAPI = {
    getAll: () => api.get('/projects/all'),
    get: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post('/projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    update: (id, data) => api.put(`/projects/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/projects/${id}`),
};

export const certificationsAPI = {
    getAll: () => api.get('/certifications/all'),
    get: (id) => api.get(`/certifications/${id}`),
    create: (data) => api.post('/certifications', data),
    update: (id, data) => api.put(`/certifications/${id}`, data),
    delete: (id) => api.delete(`/certifications/${id}`),
};

export const blogAPI = {
    getAll: () => api.get('/blog/all'),
    get: (slug) => api.get(`/blog/${slug}`),
    create: (data) => api.post('/blog', data),
    update: (id, data) => api.put(`/blog/${id}`, data),
    delete: (id) => api.delete(`/blog/${id}`),
};

export const contactAPI = {
    getAll: () => api.get('/contact'),
    get: (id) => api.get(`/contact/${id}`),
    updateStatus: (id, data) => api.put(`/contact/${id}/status`, data),
    delete: (id) => api.delete(`/contact/${id}`),
};

export const uploadAPI = {
    upload: (file, folder = 'uploads') => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        return api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export default api;
