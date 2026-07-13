import apiClient from './apiClient.js';

/**
 * Get vendor dashboard summary stats
 */
export const getVendorDashboard = async () => {
    const response = await apiClient.get('/vendor/dashboard');
    return response.data;
};

/**
 * Get vendor orders
 */
export const getVendorOrders = async (params = {}) => {
    const response = await apiClient.get('/vendor/orders', { params });
    return response.data;
};

/**
 * Get vendor products catalog
 */
export const getVendorProducts = async (params = {}) => {
    const response = await apiClient.get('/vendor/products', { params });
    return response.data;
};

/**
 * Create a new vendor product
 */
export const createProduct = async (productData) => {
    const response = await apiClient.post('/vendor/products', productData);
    return response.data;
};

/**
 * Update a vendor product
 */
export const updateProduct = async (productId, updatedData) => {
    const response = await apiClient.put(`/vendor/products/${productId}`, updatedData);
    return response.data;
};

/**
 * Delete a vendor product
 */
export const deleteProduct = async (productId) => {
    const response = await apiClient.delete(`/vendor/products/${productId}`);
    return response.data;
};

/**
 * Update order status
 */
export const updateOrderStatus = async (orderId, status) => {
    const response = await apiClient.put(`/vendor/orders/${orderId}/status`, { status });
    return response.data;
};

/**
 * Update product inventory stock
 */
export const updateStock = async (productId, newStock) => {
    const response = await apiClient.put(`/vendor/products/${productId}/stock`, { stock: newStock });
    return response.data;
};

/**
 * Get vendor profile
 */
export const getVendorProfile = async () => {
    const response = await apiClient.get('/vendor/profile');
    return response.data;
};

/**
 * Update vendor profile/settings
 */
export const updateVendorSettings = async (settingsData) => {
    const response = await apiClient.put('/vendor/profile', settingsData);
    return response.data;
};

/**
 * Update vendor password
 */
export const updateVendorPassword = async (currentPassword, newPassword) => {
    const response = await apiClient.put('/vendor/password', { currentPassword, newPassword });
    return response.data;
};