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
  getAll: (params = {}) => api.get('/websites', { params }),
  getById: (id) => api.get(`/websites/${id}`),
  update: (id, data) => api.put(`/websites/${id}`, data),
  delete: (id) => api.delete(`/websites/${id}`),
  publish: (id) => api.post(`/websites/${id}/publish`),
  unpublish: (id) => api.post(`/websites/${id}/unpublish`),
  regenerate: (id) => api.post(`/websites/${id}/regenerate`),
  duplicate: (id) => api.post(`/websites/${id}/duplicate`),
  getAnalytics: (id) => api.get(`/websites/${id}/analytics`),
  getPreview: (id) => api.get(`/websites/${id}/preview`),
  updateContent: (id, content) => api.put(`/websites/${id}/content`, { content }),
  updateDesign: (id, design) => api.put(`/websites/${id}/design`, { design }),
  exportHTML: (id) => api.get(`/websites/${id}/export`),
  // Public API endpoints
  getPublicWebsite: (username) => api.get(`/websites/public/${username}`),
  getUserWebsites: (username) => api.get(`/websites/user/${username}`),

  // Image generation with Gemini AI
  generateWebsiteImages: (data) => api.post('/websites/generate-images', data),
  generateSingleImage: (data) => api.post('/websites/generate-single-image', data),
  deleteGeneratedImage: (fileName) => api.delete(`/websites/images/${fileName}`),
};

// Marketing API
export const marketingAPI = {
  // Campaigns
  generateCampaign: (data) => api.post('/marketing/campaigns/generate', data),
  getCampaigns: (params = {}) => api.get('/marketing/campaigns', { params }),
  getCampaign: (id) => api.get(`/marketing/campaigns/${id}`),
  updateCampaign: (id, data) => api.put(`/marketing/campaigns/${id}`, data),
  deleteCampaign: (id) => api.delete(`/marketing/campaigns/${id}`),
  sendCampaign: (id) => api.post(`/marketing/campaigns/${id}/send`),

  // Content Generation
  generateSocial: (data) => api.post('/marketing/social/generate', data),
  generateNewsletter: (data) => api.post('/marketing/newsletter/generate', data),

  // Legacy endpoints
  generateEmail: (data) => api.post('/marketing/email/generate', data),
  sendEmail: (data) => api.post('/marketing/email/send', data),
  generateProductDescription: (data) => api.post('/marketing/product/description', data),
  getTemplates: () => api.get('/marketing/templates'),
};

// Leads API
export const leadsAPI = {
  getLeads: (params = {}) => api.get('/leads', { params }),
  getLead: (id) => api.get(`/leads/${id}`),
  createLead: (data) => api.post('/leads', data),
  updateLead: (id, data) => api.put(`/leads/${id}`, data),
  deleteLead: (id) => api.delete(`/leads/${id}`),
  addActivity: (id, data) => api.post(`/leads/${id}/activities`, data),
  addNote: (id, data) => api.post(`/leads/${id}/notes`, data),
  importLeads: (data) => api.post('/leads/import', data),
};

// Analytics API
export const analyticsAPI = {
  // Dashboard and metrics
  getDashboard: () => api.get('/analytics/dashboard'),
  getMetrics: (params = {}) => api.get('/analytics/metrics', { params }),
  recordMetrics: (data) => api.post('/analytics/metrics/record', data),

  // AI-powered analysis
  generateInsights: (data) => api.post('/analytics/ai-analysis', data),
  generateCompetitiveAnalysis: (data) => api.post('/analytics/competitive-analysis', data),
  generatePredictions: (data) => api.post('/analytics/predictions', data),

  // KPI management
  getKPIs: (params = {}) => api.get('/analytics/kpi', { params }),
  createKPI: (data) => api.post('/analytics/kpi/create', data),
  updateKPI: (id, data) => api.put(`/analytics/kpi/${id}/update`, data),
  deleteKPI: (id) => api.delete(`/analytics/kpi/${id}`),

  // Feedback analysis
  getFeedback: (params = {}) => api.get('/analytics/feedback', { params }),
  submitFeedback: (data) => api.post('/analytics/feedback/submit', data),
  analyzeFeedback: (data) => api.post('/analytics/feedback/analyze', data),
  analyzeSentiment: (data) => api.post('/analytics/sentiment/analyze', data),

  // Reports
  getReports: (params = {}) => api.get('/analytics/reports', { params }),
  generateReport: (data) => api.post('/analytics/reports/generate', data),
  exportReport: (id) => api.get(`/analytics/reports/${id}/export`),
  analyzeTrends: (data) => api.post('/analytics/trends/analyze', data),
};

// Images API
export const imagesAPI = {
  // AI-powered prompt generation
  generatePrompt: (data) => api.post('/images/generate-prompt', data),
  enhancePrompt: (data) => api.post('/images/enhance-prompt', data),
  generateConcepts: (data) => api.post('/images/generate-concepts', data),
  analyzeRequirements: (data) => api.post('/images/analyze-requirements', data),

  // Image generation and processing
  generateImage: (data) => api.post('/images/generate', data),
  generateFromPrompt: (data) => api.post('/images/generate-from-prompt', data),

  // Google Gemini AI image generation
  generateWithGemini: (data) => api.post('/images/generate-with-gemini', data),
  generateWebsiteImagesGemini: (data) => api.post('/images/generate-website-images-gemini', data),
  enhanceImage: (data) => api.post('/images/enhance', data),
  generateProductImages: (data) => api.post('/images/product/generate', data),
  sketchToImage: (data) => api.post('/images/sketch-to-image', data),
  removeBackground: (data) => api.post('/images/background/remove', data),

  // Image management
  getImages: (params = {}) => api.get('/images', { params }),
  getImage: (id) => api.get(`/images/${id}`),
  updateImage: (id, data) => api.put(`/images/${id}`, data),
  deleteImage: (id) => api.delete(`/images/${id}`),
  getImageStats: () => api.get('/images/stats/overview'),

  // Utility
  getStyles: () => api.get('/images/styles'),
  testGeneration: (data) => api.post('/images/test-generation', data),
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
