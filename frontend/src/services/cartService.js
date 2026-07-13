import apiClient from './apiClient.js';

/**
 * Fetch the active user's shopping cart
 */
export const getCart = async () => {
    const response = await apiClient.get('/cart');
    return response.data;
};

/**
 * Add an item to cart
 */
export const addToCart = async (productId, quantity = 1) => {
    const response = await apiClient.post('/cart/items', { productId, quantity });
    return response.data;
};

/**
 * Update cart item quantity
 */
export const updateCart = async (itemId, quantity) => {
    const response = await apiClient.put(`/cart/items/${itemId}`, { quantity });
    return response.data;
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (itemId) => {
    const response = await apiClient.delete(`/cart/items/${itemId}`);
    return response.data;
};

/**
 * Clear entire cart
 */
export const clearCart = async () => {
    const response = await apiClient.delete('/cart/clear');
    return response.data;
};