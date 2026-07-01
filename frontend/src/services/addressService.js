import axios from "axios";

// Baseline API routing configurations matching project settings
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.zmarket.com/v1";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Fetch list of saved shipping addresses
 * Mapped to: Saved Addresses view list
 */
export const getAddresses = async () => {
    try {
        const response = await apiClient.get("/addresses");
        return response.data;
    } catch (error) {
        console.error("Error fetching shipping addresses list:", error.message);
        throw error;
    }
};

/**
 * Register a new shipping address
 * Mapped to: Address Form creation overlay
 */
export const addAddress = async (addressData) => {
    try {
        const response = await apiClient.post("/addresses", addressData);
        return response.data;
    } catch (error) {
        console.error("Error registering new delivery coordinates:", error.message);
        throw error;
    }
};

/**
 * Update an existing shipping address' details
 * Mapped to: Address Form edit state
 */
export const updateAddress = async (addressId, addressData) => {
    try {
        const response = await apiClient.put(`/addresses/${addressId}`, addressData);
        return response.data;
    } catch (error) {
        console.error(`Error updating address record ${addressId}:`, error.message);
        throw error;
    }
};

/**
 * Delete a shipping address from user profile
 * Mapped to: AddressCard -> Delete modal confirm dispatch
 */
export const deleteAddress = async (addressId) => {
    try {
        const response = await apiClient.delete(`/addresses/${addressId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting address record ${addressId}:`, error.message);
        throw error;
    }
};
