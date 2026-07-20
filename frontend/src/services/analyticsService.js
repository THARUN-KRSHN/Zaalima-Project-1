import apiClient from './apiClient.js';

/**
 * Vendor analytics overview metrics
 */
export const getAnalytics = async () => {
    const response = await apiClient.get('/analytics/overview-summary');
    return response.data;
};

/**
 * Revenue and sales time-series trends
 */
export const getRevenueData = async () => {
    const response = await apiClient.get('/analytics/revenue-trends');
    return response.data;
};

/**
 * Top selling products
 */
export const getTopProducts = async () => {
    const response = await apiClient.get('/analytics/top-products-ledger');
    return response.data;
};

/**
 * Order fulfillment ratio trends
 */
export const getOrderTrends = async () => {
    const response = await apiClient.get('/analytics/fulfillment-trends');
    return response.data;
};