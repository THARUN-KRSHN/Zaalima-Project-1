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
 * Fetch all items saved in the customer's wishlist
 * Mapped to: Wishlist Page view list
 */
export const getWishlist = async () => {
    try {
        const response = await apiClient.get("/wishlist");
        return response.data;
    } catch (error) {
        console.error("Error retrieving user wishlist list:", error.message);
        throw error;
    }
};

/**
 * Migrate a catalog item from the wishlist directly into the active cart
 * Mapped to: WishlistCard -> "Move to Cart" button action click
 */
export const moveToCart = async (productId) => {
    try {
        const response = await apiClient.post(`/wishlist/move-to-cart`, { productId });
        return response.data;
    } catch (error) {
        console.error(`Error migrating item ${productId} from wishlist to cart:`, error.message);
        throw error;
    }
};
