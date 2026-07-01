import axios from "axios";

// Core environment endpoint fallback mapping 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.zmarket.com/v1";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * 1. Fetch high-level metric records for the core dashboard view panel
 * Hydrates: Total Revenue, Orders, Customer distributions, and growth summary parameters
 */
export const getVendorDashboard = async () => {
    try {
        const response = await apiClient.get("/vendor/dashboard-summary");
        return response.data; // Expected: { dashboardStats, revenueBreakdown, recentOrders }
    } catch (error) {
        console.error("Failed to fetch primary vendor dashboard metrics package:", error.message);
        throw error;
    }
};

/**
 * 2. Retrieve chronological ledger entries of orders bound to the active seller identifier
 * Hydrates: Recent Dispatches datatables, individual shipping pipelines, and settlement logs
 */
export const getVendorOrders = async () => {
    try {
        const response = await apiClient.get("/vendor/orders-ledger");
        return response.data; // Expected: Array of tracking order records
    } catch (error) {
        console.error("Critical block intercepted while reading vendor order dispatch logs:", error.message);
        throw error;
    }
};

/**
 * 3. Pull active marketplace product listings managed by this vendor node
 * Hydrates: Inventory stock balances, product statuses, pricing variations, and item catalog maps
 */
export const getVendorProducts = async () => {
    try {
        const response = await apiClient.get("/vendor/products-catalog");
        return response.data; // Expected: Array of vendor product data models
    } catch (error) {
        console.error("Security or hardware crash caught during vendor catalog item matching:", error.message);
        throw error;
    }
};

/**
 * 4. Add a new product listing to the vendor storefront
 */
export const createProduct = async (productData) => {
    try {
        const response = await apiClient.post("/vendor/products", productData);
        return response.data;
    } catch (error) {
        console.error("Failed to list new vendor product:", error.message);
        throw error;
    }
};

/**
 * 5. Update an existing product's metadata or pricing
 */
export const updateProduct = async (productId, updatedData) => {
    try {
        const response = await apiClient.put(`/vendor/products/${productId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Failed to update vendor product ${productId}:`, error.message);
        throw error;
    }
};

/**
 * 6. Delete/remove a product listing
 */
export const deleteProduct = async (productId) => {
    try {
        const response = await apiClient.delete(`/vendor/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to delete vendor product ${productId}:`, error.message);
        throw error;
    }
};

/**
 * 7. Update status of a customer order bound to the vendor
 */
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await apiClient.put(`/vendor/orders/${orderId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error(`Failed to update status for order ${orderId}:`, error.message);
        throw error;
    }
};

/**
 * 8. Update inventory stock level for a product
 */
export const updateStock = async (productId, newStock) => {
    try {
        const response = await apiClient.put(`/vendor/products/${productId}/stock`, { stock: newStock });
        return response.data;
    } catch (error) {
        console.error(`Failed to update stock for product ${productId}:`, error.message);
        throw error;
    }
};

/**
 * 9. Save vendor store settings details
 */
export const updateVendorSettings = async (settingsData) => {
    try {
        const response = await apiClient.put("/vendor/settings", settingsData);
        return response.data;
    } catch (error) {
        console.error("Failed to update store settings configuration:", error.message);
        throw error;
    }
};