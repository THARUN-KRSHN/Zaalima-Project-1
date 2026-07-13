import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// Shared axios instance used by all services
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000
});

// Request interceptor — attach JWT from localStorage
// The Redux authSlice stores the token under 'z_token'
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('z_token') ||
            localStorage.getItem('token') ||
            localStorage.getItem('authToken') ||
            localStorage.getItem('zmarket_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle auth errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login if unauthorized
            localStorage.removeItem('token');
            localStorage.removeItem('authToken');
            localStorage.removeItem('zmarket_token');
            // Only redirect if not already on auth pages
            const currentPath = window.location.pathname;
            if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
                // Dispatch a custom event so Redux/context can handle it
                window.dispatchEvent(new CustomEvent('auth:unauthorized'));
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
