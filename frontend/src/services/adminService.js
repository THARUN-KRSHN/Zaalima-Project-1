import apiClient from './apiClient.js';

// ============================================================
// ADMIN DASHBOARD
// ============================================================

export const getAdminDashboard = async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
};

// ============================================================
// USER MANAGEMENT
// ============================================================

export const getAllUsers = async (params = {}) => {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
};

export const getUserById = async (userId) => {
    const response = await apiClient.get(`/admin/users/${userId}`);
    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await apiClient.put(`/admin/users/${userId}`, userData);
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return response.data;
};

// ============================================================
// VENDOR MANAGEMENT
// ============================================================

export const getAllVendors = async (params = {}) => {
    const response = await apiClient.get('/admin/vendors', { params });
    return response.data;
};

export const approveVendor = async (vendorId) => {
    const response = await apiClient.put(`/admin/vendors/${vendorId}/approve`);
    return response.data;
};

export const rejectVendor = async (vendorId) => {
    const response = await apiClient.put(`/admin/vendors/${vendorId}/reject`);
    return response.data;
};

export const updateVendorStatus = async (vendorId, status) => {
    const response = await apiClient.put(`/admin/vendors/${vendorId}/status`, { status });
    return response.data;
};

// ============================================================
// PRODUCT MANAGEMENT
// ============================================================

export const getAllProductsAdmin = async (params = {}) => {
    const response = await apiClient.get('/admin/products', { params });
    return response.data;
};

export const deleteProductAdmin = async (productId) => {
    const response = await apiClient.delete(`/admin/products/${productId}`);
    return response.data;
};

export const featureProduct = async (productId, featured = true) => {
    const response = await apiClient.put(`/admin/products/${productId}/feature`, { featured });
    return response.data;
};

// ============================================================
// ORDER MANAGEMENT
// ============================================================

export const getAllOrdersAdmin = async (params = {}) => {
    const response = await apiClient.get('/admin/orders', { params });
    return response.data;
};

export const getOrderByIdAdmin = async (orderId) => {
    const response = await apiClient.get(`/admin/orders/${orderId}`);
    return response.data;
};

export const updateOrderAdmin = async (orderId, updateData) => {
    const response = await apiClient.put(`/admin/orders/${orderId}`, updateData);
    return response.data;
};

// ============================================================
// PLATFORM ANALYTICS
// ============================================================

export const getAdminAnalytics = async () => {
    const response = await apiClient.get('/admin/analytics');
    return response.data;
};
