import axios from "axios";

// Baseline API routing configurations matching your product service layer
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.zmarket.com/v1";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Fetch the active user's customer shopping cart from database state
 * Mapped to: Cart Page Initial Load (Hydrates item arrays, checks quantities)
 */
export const getCart = async () => {
    try {
        const response = await apiClient.get("/cart");
        return response.data;
    } catch (error) {
        console.error("Error retrieving the customer shopping cart:", error.message);
        throw error;
    }
};

/**
 * Append a newly selected item asset into the active cart registry
 * Mapped to: Product Details Page -> "Add To Cart" CTA button handler matrix
 */
export const addToCart = async (productId, quantity = 1) => {
    try {
        const response = await apiClient.post("/cart/items", {
            productId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error(`Error adding product item ${productId} to cart stream:`, error.message);
        throw error;
    }
};

/**
 * Modify specific line item counts (increments / decrements) directly on the ledger
 * Mapped to: Cart Page -> Capsule Quantity Selector interaction loops (`+` / `-`)
 */
export const updateCart = async (itemId, quantity) => {
    try {
        const response = await apiClient.put(`/cart/items/${itemId}`, {
            quantity
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating operational quantity parameters for item ${itemId}:`, error.message);
        throw error;
    }
};

/**
 * Clear a specific listing row out of the cart grid completely
 * Mapped to: Cart Page -> CartItem Component -> Trash Can Button `.filter()` calls
 */
export const removeFromCart = async (itemId) => {
    try {
        const response = await apiClient.delete(`/cart/items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error(`Error executing structural deletion on cart item line ${itemId}:`, error.message);
        throw error;
    }
};