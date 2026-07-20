import apiClient from './apiClient.js';

/**
 * Fetch saved shipping addresses
 */
export const getAddresses = async () => {
    const response = await apiClient.get('/addresses');
    return response.data;
};

/**
 * Add a new shipping address
 */
export const addAddress = async (addressData) => {
    const response = await apiClient.post('/addresses', addressData);
    return response.data;
};

/**
 * Update an existing address
 */
export const updateAddress = async (addressId, addressData) => {
    const response = await apiClient.put(`/addresses/${addressId}`, addressData);
    return response.data;
};

/**
 * Delete a shipping address
 */
export const deleteAddress = async (addressId) => {
    const response = await apiClient.delete(`/addresses/${addressId}`);
    return response.data;
};
