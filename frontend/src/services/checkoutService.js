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
 * 1. Initialize a pending server-side checkout session ledger
 * Mapped to: Entering Checkout page (Validates active inventory quantities, locks pricing, registers temporary intents)
 */
export const createCheckout = async (cartItems, discountAmount = 0) => {
    try {
        const response = await apiClient.post("/checkout/initiate", {
            items: cartItems,
            discount: discountAmount
        });
        return response.data; // Expected: checkoutSessionToken, finalPricingBreakdown
    } catch (error) {
        console.error("Failed to compile or register checkout initialization tokens:", error.message);
        throw error;
    }
};

/**
 * 2. Dispatch shipping data and create the finalized invoice record 
 * Mapped to: Clicking "Confirm and Place Order" (Generates native database entries and creates Gateway Order IDs)
 */
export const placeOrder = async (shippingAddress, paymentMethod, checkoutToken) => {
    try {
        const response = await apiClient.post("/orders/create", {
            shippingAddress,
            paymentMethod,
            checkoutToken
        });
        return response.data; // Expected: orderRecordDetails, gatewayOrderId (e.g., Razorpay Order ID)
    } catch (error) {
        console.error("Critical block intercepted during transactional order allocation:", error.message);
        throw error;
    }
};

/**
 * 3. Verify cryptographic checkout signatures received from third-party webhook relays
 * Mapped to: Post-payment validation gateways (Ensures the customer's payment isn't tampered with)
 */
export const verifyPayment = async (paymentResponsePayload) => {
    try {
        // payload matches signatures returned from interactive popups:
        // { razorpay_payment_id, razorpay_order_id, razorpay_signature }
        const response = await apiClient.post("/payments/verify", paymentResponsePayload);
        return response.data; // Expected: { success: true, trackingId: '...' }
    } catch (error) {
        console.error("Security signature mismatch caught during payment authorization tracking:", error.message);
        throw error;
    }
};