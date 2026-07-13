import apiClient from './apiClient.js';

/**
 * Fetch all items in wishlist
 */
export const getWishlist = async () => {
    const response = await apiClient.get('/wishlist');
    return response.data;
};

/**
 * Add a product to wishlist
 */
export const addToWishlist = async (productId) => {
    const response = await apiClient.post('/wishlist', { productId });
    return response.data;
};

/**
 * Remove a product from wishlist
 */
export const removeFromWishlist = async (productId) => {
    const response = await apiClient.delete(`/wishlist/${productId}`);
    return response.data;
};

/**
 * Move wishlist item to cart
 */
export const moveToCart = async (productId) => {
    const response = await apiClient.post('/wishlist/move-to-cart', { productId });
    return response.data;
};
