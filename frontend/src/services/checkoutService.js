import apiClient from './apiClient.js';

/**
 * Initiate a checkout session — validates cart items and locks pricing
 */
export const createCheckout = async (cartItems, promoCode = null) => {
    const response = await apiClient.post('/checkout/initiate', {
        cartItems,
        promoCode
    });
    return response.data;
};

/**
 * Place an order with shipping address and payment method
 */
export const placeOrder = async (shippingAddress, paymentMethod, checkoutToken) => {
    const response = await apiClient.post('/orders/create', {
        shippingAddress,
        paymentMethod,
        checkoutToken
    });
    return response.data;
};

/**
 * Verify Razorpay payment signature
 */
export const verifyPayment = async (paymentResponsePayload) => {
    const response = await apiClient.post('/payments/verify', paymentResponsePayload);
    return response.data;
};