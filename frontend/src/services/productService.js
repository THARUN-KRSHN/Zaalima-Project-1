import apiClient from './apiClient.js';

/**
 * Fetch all products with optional filters
 */
export const getProducts = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.rating) params.append('rating', filters.rating);
    if (filters.sort) params.append('sort', filters.sort);

    const response = await apiClient.get(`/products?${params.toString()}`);
    return response.data;
};

/**
 * Fetch single product details
 */
export const getProductById = async (productId) => {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
};

/**
 * Fetch similar/related products
 */
export const getSimilarProducts = async (productId, limit = 4) => {
    const response = await apiClient.get(`/products/${productId}/similar?limit=${limit}`);
    return response.data;
};

/**
 * Fetch all categories
 */
export const getCategories = async () => {
    const response = await apiClient.get('/categories');
    return response.data;
};

/**
 * Create a new product (vendor)
 */
export const createProduct = async (productData) => {
    const response = await apiClient.post('/products', productData);
    return response.data;
};

/**
 * Update an existing product (vendor)
 */
export const updateProduct = async (productId, updatedData) => {
    const response = await apiClient.put(`/products/${productId}`, updatedData);
    return response.data;
};

/**
 * Delete a product (vendor/admin)
 */
export const deleteProduct = async (productId) => {
    const response = await apiClient.delete(`/products/${productId}`);
    return response.data;
};