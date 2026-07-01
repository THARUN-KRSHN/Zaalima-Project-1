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
 * Fetch the active authenticated user's profile details
 * Mapped to: Account Profile settings view
 */
export const getProfile = async () => {
    try {
        const response = await apiClient.get("/profile");
        return response.data;
    } catch (error) {
        console.error("Error retrieving profile metrics:", error.message);
        throw error;
    }
};

/**
 * Commit profile changes (name, phone, password update) to database
 * Mapped to: Profile Details Edit Form -> "Save Changes" handler
 */
export const updateProfile = async (profileData) => {
    try {
        const response = await apiClient.put("/profile", profileData);
        return response.data;
    } catch (error) {
        console.error("Error updating user profile parameters:", error.message);
        throw error;
    }
};
