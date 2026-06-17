import axios from "axios";

// Core environment gateway distribution endpoints map
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.zmarket.com/v1";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * 1. Fetch high-level consolidated analytical profile insights
 * Hydrates: AnalyticsCard.jsx (Total Revenue, Orders, Customer Metrics summaries)
 */
export const getAnalytics = async () => {
    try {
        const response = await apiClient.get("/analytics/overview-summary");
        return response.data;
    } catch (error) {
        console.error("Critical fail encountered reading aggregate analytics cards block:", error.message);
        throw error;
    }
};

/**
 * 2. Retrieve chronological data records for time-series charts
 * Hydrates: RevenueChart.jsx & SalesChart.jsx (6-month progress streams data arrays)
 */
export const getRevenueData = async () => {
    try {
        const response = await apiClient.get("/analytics/revenue-trends");
        return response.data;
    } catch (error) {
        console.error("Network crash caught during linear timeline revenue mapping streams:", error.message);
        throw error;
    }
};

/**
 * 3. Pull top-selling product conversion metrics matrices
 * Hydrates: TopProductsTable.jsx (Ranked item sales metrics logs)
 */
export const getTopProducts = async () => {
    try {
        const response = await apiClient.get("/analytics/top-products-ledger");
        return response.data;
    } catch (error) {
        console.error("Interception block caught on catalog inventory ranking pipelines:", error.message);
        throw error;
    }
};

/**
 * 4. Fetch status distribution logs for order tracking progress lines
 * Hydrates: OrderTrends.jsx (Fulfillment allocation tracking ratios indices)
 */
export const getOrderTrends = async () => {
    try {
        const response = await apiClient.get("/analytics/fulfillment-trends");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch analytical order status lifecycle records package:", error.message);
        throw error;
    }
};