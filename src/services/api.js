import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle errors
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

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  verifyToken: () => api.post('/auth/verify-token'),
};

// Website API
export const websiteAPI = {
  generate: (data) => api.post('/websites/generate', data),
  getAll: (params) => api.get('/websites', { params }),
  getById: (id) => api.get(`/websites/${id}`),
  update: (id, data) => api.put(`/websites/${id}`, data),
  delete: (id) => api.delete(`/websites/${id}`),
  publish: (id) => api.post(`/websites/${id}/publish`),
  regenerate: (id) => api.post(`/websites/${id}/regenerate`),
};

// Marketing API
export const marketingAPI = {
  generateEmail: (data) => api.post('/marketing/email/generate', data),
  sendEmail: (data) => api.post('/marketing/email/send', data),
  generateNewsletter: (data) => api.post('/marketing/newsletter/generate', data),
  generateSocial: (data) => api.post('/marketing/social/generate', data),
  generateProductDescription: (data) => api.post('/marketing/product/description', data),
  getTemplates: () => api.get('/marketing/templates'),
};

// Chatbot API
export const chatbotAPI = {
  sendMessage: (data) => api.post('/chatbot/message', data),
  getHistory: (sessionId) => api.get(`/chatbot/history/${sessionId}`),
  clearHistory: (sessionId) => api.delete(`/chatbot/history/${sessionId}`),
  generateFAQ: () => api.post('/chatbot/faq/generate'),
  generateTraining: (data) => api.post('/chatbot/training/generate', data),
  analyze: (data) => api.post('/chatbot/analyze', data),
  getSessions: () => api.get('/chatbot/sessions'),
};

// Analytics API
export const analyticsAPI = {
  analyzeFeedback: (data) => api.post('/analytics/feedback/analyze', data),
  generateInsights: (data) => api.post('/analytics/insights/generate', data),
  analyzeSentiment: (data) => api.post('/analytics/sentiment/analyze', data),
  getDashboard: () => api.get('/analytics/dashboard'),
  generateReport: (data) => api.post('/analytics/report/generate', data),
  analyzeTrends: (data) => api.post('/analytics/trends/analyze', data),
};

// Images API
export const imagesAPI = {
  generate: (data) => api.post('/images/generate', data),
  enhance: (formData) => api.post('/images/enhance', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  generateProduct: (data) => api.post('/images/product/generate', data),
  sketchToImage: (formData) => api.post('/images/sketch-to-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  removeBackground: (formData) => api.post('/images/background/remove', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getStyles: () => api.get('/images/styles'),
};

// Business API
export const businessAPI = {
  getProfile: () => api.get('/business/profile'),
  updateProfile: (data) => api.put('/business/profile', data),
  getIndustries: () => api.get('/business/industries'),
  getTemplates: (params) => api.get('/business/templates', { params }),
  completeOnboarding: (data) => api.post('/business/onboarding', data),
  getDashboard: () => api.get('/business/dashboard'),
  getSettings: () => api.get('/business/settings'),
  updateSettings: (data) => api.put('/business/settings', data),
};

// Utility functions
export const uploadFile = async (file, endpoint, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });
};

export const downloadFile = async (url, filename) => {
  try {
    const response = await api.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
