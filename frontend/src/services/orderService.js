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
 * Fetch all completed/processing customer orders
 * Mapped to: Orders Page
 */
export const getOrders = async () => {
    try {
        const response = await apiClient.get("/orders");
        return response.data;
    } catch (error) {
        console.error("Error retrieving orders list:", error.message);
        throw error;
    }
};

/**
 * Fetch single order detailed logs and timeline logs
 * Mapped to: Order Details Page
 */
export const getOrderById = async (orderId) => {
    try {
        const response = await apiClient.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error(`Error retrieving order details for ID ${orderId}:`, error.message);
        throw error;
    }
};

/**
 * Cancel a specific processing/in-transit order item
 * Mapped to: Order Details Page -> "Cancel Order" button handler
 */
export const cancelOrder = async (orderId) => {
    try {
        const response = await apiClient.post(`/orders/${orderId}/cancel`);
        return response.data;
    } catch (error) {
        console.error(`Error cancelling order ${orderId}:`, error.message);
        throw error;
    }
};
