import apiClient from './apiClient.js';

/**
 * Fetch all customer orders
 */
export const getOrders = async () => {
    const response = await apiClient.get('/orders');
    return response.data;
};

/**
 * Fetch a single order by ID
 */
export const getOrderById = async (orderId) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
};

/**
 * Cancel an order
 */
export const cancelOrder = async (orderId) => {
    const response = await apiClient.post(`/orders/${orderId}/cancel`);
    return response.data;
};
