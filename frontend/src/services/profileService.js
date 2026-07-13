import apiClient from './apiClient.js';

/**
 * Fetch current user's profile
 */
export const getProfile = async () => {
    const response = await apiClient.get('/profile');
    return response.data;
};

/**
 * Update user profile (name, phone, avatar)
 */
export const updateProfile = async (profileData) => {
    const response = await apiClient.put('/profile', profileData);
    return response.data;
};

/**
 * Change password
 */
export const changePassword = async (currentPassword, newPassword) => {
    const response = await apiClient.put('/profile/password', { currentPassword, newPassword });
    return response.data;
};
