import axios from "axios";

// Baseline API routing configurations
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.zmarket.com/v1";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ==========================================================================
// 1. CUSTOMER COMPONENT FLOW LINK MODULES
// ==========================================================================

/**
 * Fetch products with dynamic search, category department, and sort parameters
 * Mapped to: Product Listing Page (Search Products, Filter Categories, Sort Products)
 */
export const getProducts = async (filters = {}) => {
    try {
        const { search, category, sort, page, limit } = filters;

        // Appends query strings natively: ?search=kurta&category=Fashion&sort=price_low
        const response = await apiClient.get("/products", {
            params: { search, category, sort, page, limit }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching marketplace products:", error.message);
        throw error;
    }
};

/**
 * Fetch a single product's detailed metadata by its ID
 * Mapped to: Product Details Page (Gallery, Description, Reviews, Vendor Info)
 */
export const getProductById = async (productId) => {
    try {
        const response = await apiClient.get(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product data for ID ${productId}:`, error.message);
        throw error;
    }
};

/**
 * Fetch cross-selling recommendations based on active items
 * Mapped to: Product Details Page (Similar Products Grid Shelf)
 */
export const getSimilarProducts = async (productId, limit = 4) => {
    try {
        const response = await apiClient.get(`/products/${productId}/similar`, {
            params: { limit }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching recommendations for product ID ${productId}:`, error.message);
        throw error;
    }
};


// ==========================================================================
// 2. VENDOR ECOSYSTEM MANAGED HUB MODULES
// ==========================================================================

/**
 * Fetch specialized stock feeds belonging exclusively to the logged-in merchant
 * Mapped to: Vendor Dashboard (Analytics Overview, Inventory Table, Revenue tracking)
 */
export const getVendorProducts = async (vendorId, params = {}) => {
    try {
        const response = await apiClient.get(`/vendor/${vendorId}/products`, { params });
        return response.data;
    } catch (error) {
        console.error(`Error fetching vendor inventory tracking data for vendor ${vendorId}:`, error.message);
        throw error;
    }
};

/**
 * Inject a new commercial product listing configuration into the catalog
 * Mapped to: Vendor Dashboard UI -> Products Page -> Add Product Modal Actions
 */
export const createProduct = async (productData) => {
    try {
        const response = await apiClient.post("/products", productData);
        return response.data;
    } catch (error) {
        console.error("Error creating a brand new catalog product configuration entry:", error.message);
        throw error;
    }
};

/**
 * Update stock metadata metrics, pricing layers, or item descriptions
 * Mapped to: Vendor Dashboard UI -> Products Page -> Edit Product Actions
 */
export const updateProduct = async (productId, updatedData) => {
    try {
        const response = await apiClient.put(`/products/${productId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error updating product metadata parameters for ID ${productId}:`, error.message);
        throw error;
    }
};

/**
 * Terminate a product listing completely from the customer storefront pipeline
 * Mapped to: Vendor Dashboard UI -> Products Page -> Delete Product Confirmation Handles
 */
export const deleteProduct = async (productId) => {
    try {
        const response = await apiClient.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error executing structural database purge termination on product ID ${productId}:`, error.message);
        throw error;
    }
};