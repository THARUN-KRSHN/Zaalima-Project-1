import apiClient from './apiClient.js';

export const authService = {
    async login(email, password) {
        const response = await apiClient.post('/auth/login', { email, password });
        return response.data;
    },

    async registerCustomer(payload) {
        const response = await apiClient.post('/auth/register/customer', payload);
        return response.data;
    },

    async registerVendor(payload) {
        const response = await apiClient.post('/auth/register/vendor', payload);
        return response.data;
    },

    async forgotPassword(email) {
        const response = await apiClient.post('/auth/forgot-password', { email });
        return response.data;
    },

    async resetPassword(token, password) {
        const response = await apiClient.post('/auth/reset-password', { token, password });
        return response.data;
    },

    async logout() {
        try {
            await apiClient.post('/auth/logout');
        } catch {
            // Stateless logout — ignore server error, always clear local token
        } finally {
            localStorage.removeItem('z_token');
            localStorage.removeItem('z_user');
            localStorage.removeItem('token');
            localStorage.removeItem('authToken');
            localStorage.removeItem('zmarket_token');
        }
        return { success: true };
    },

    async getMe() {
        const response = await apiClient.get('/auth/me');
        return response.data;
    }
};