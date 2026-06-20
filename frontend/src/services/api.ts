import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_BASE_URL = `${BACKEND_URL}/api`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically inject JWT token into requests
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Automatically handle unauthorized errors (clear token and redirect)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // Do not redirect if already on login page to avoid loops
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },
  login: async (credentials: any) => {
    const res = await apiClient.post('/auth/login', credentials);
    return res.data;
  },
  createAccount: async (data: any) => {
    const res = await apiClient.post('/auth/createaccount', data);
    return res.data;
  },
  loginWithToken: async (accessToken: string) => {
    const res = await apiClient.post('/auth/facebook', { accessToken });
    return res.data;
  },
  getLoginUrl: () => {
    return `${API_BASE_URL}/auth/facebook`;
  },
  getConnectFacebookUrl: () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return `${API_BASE_URL}/auth/facebook${token ? `?token=${token}` : ''}`;
  },
  deleteAccount: async () => {
    const res = await apiClient.delete('/auth/me');
    return res.data;
  }
};

export const pageService = {
  getPages: async () => {
    const res = await apiClient.get('/pages');
    return res.data;
  },
  syncPages: async () => {
    const res = await apiClient.post('/pages/sync');
    return res.data;
  }
};

export const postService = {
  publishPost: async (formData: FormData) => {
    const res = await apiClient.post('/posts/publish', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  getHistory: async () => {
    const res = await apiClient.get('/posts/history');
    return res.data;
  }
};

export const getMediaUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BACKEND_URL}${path}`;
};

export default apiClient;
