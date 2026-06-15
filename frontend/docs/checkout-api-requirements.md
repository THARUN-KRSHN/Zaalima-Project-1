

---

# Zmarket Checkout API Specifications & Requirements

This document outlines the required endpoints, payloads, validation criteria, and state transitions needed from the backend services to support the Day 05 frontend checkout pipeline.

---

## 1. Global Core Specifications

* **Base Architecture Pattern:** RESTful State Engines
* **Default Data Payload Content-Type:** `application/json`
* **Authentication Mechanism:** HTTP Bearer Token (`Authorization: Bearer <JWT_ACCESS_TOKEN>`)
* **Standard Error Wrapper Format:**
```json
{
  "success": false,
  "errorCode": "INVALID_PARAMETERS",
  "message": "Detailed developer debugging context text goes here.",
  "validationErrors": { "field_key": "Specific user friendly feedback message" }
}

```



---

## 2. API Endpoints Map & Requirements

### Entry Check: `POST /api/v1/checkout/initiate`

**Purpose:** Maps directly to a user entering the checkout screen. This method reads the client's current cart inventory array, checks multi-vendor warehouse counts, locks individual product prices against mutations, and compiles standard financial ledgers.

#### Client Request Payload

```json
{
  "cartItems": [
    { "productId": "prod_76b12f", "quantity": 1 },
    { "productId": "prod_98a34c", "quantity": 2 }
  ],
  "promoCode": "ZMARKET50"
}

```

#### Server Success Response (`200 OK`)

```json
{
  "success": true,
  "checkoutToken": "chk_token_884172bb9fbc332a",
  "pricingSummary": {
    "subtotal": 5000,
    "discount": 150,
    "tax": 250,
    "shipping": 0,
    "total": 5100
  }
}

```

---

### Step 1: Address Processing: `POST /api/v1/orders/create`

**Purpose:** Triggered when the customer executes the primary checkout action button. It records delivery address credentials, creates a permanent immutable master order record, and spins up native payment intents.

#### Client Request Payload

```json
{
  "checkoutToken": "chk_token_884172bb9fbc332a",
  "shippingAddress": {
    "fullName": "Tharunkrishna CU",
    "phone": "9778585423",
    "email": "tharun@zmarket.com",
    "addressLine1": "401, Cheloorkavu, moonupeedika road",
    "addressLine2": "Cheloorkavu Temple Road",
    "city": "Irinjalakuda",
    "state": "Kerala",
    "pincode": "680121"
  },
  "paymentMethod": "razorpay"
}

```

#### Required Backend Field Validations

* `fullName`: String, Required, Min length 3.
* `phone`: String, Required, Must pass valid regex patterns for Indian standard dial strings (`^[6-9]\d{9}$`).
* `addressLine1`: String, Required.
* `pincode`: String, Required, Must contain exactly 6 numeric digits (`^\d{6}$`).

#### Server Success Response (`201 Created`)

* **Case A: If Payment Method is Online (`razorpay` / `card`):**
```json
{
  "success": true,
  "orderStatus": "PENDING_PAYMENT",
  "orderId": "ZMK-1172-8542",
  "gatewayConfig": {
    "gateway": "razorpay",
    "gatewayOrderId": "order_Rzp_992147bb",
    "amount": 510000,
    "currency": "INR"
  }
}

```


* **Case B: If Payment Method is Offline (`cod`):**
```json
{
  "success": true,
  "orderStatus": "PLACED",
  "orderId": "ZMK-1172-8543",
  "gatewayConfig": null
}

```



---

### Step 2: Security Verification: `POST /api/v1/payments/verify`

**Purpose:** Fired directly after a customer interacting with the frontend webview completes payment inside third-party popups. The backend must run cryptographic signature checks before marking invoices safe to prevent payment tampering.

#### Client Request Payload

```json
{
  "orderId": "ZMK-1172-8542",
  "razorpay_order_id": "order_Rzp_992147bb",
  "razorpay_payment_id": "pay_98214fbc3b",
  "razorpay_signature": "e7c2d73f8a42b9c7d1e8f3a9b6c0d5e4f2a1b9c8d7e6f5"
}

```

#### Core Backend Verification Pseudocode Logic

```crypto
generated_signature = HMAC_SHA256(
  razorpay_order_id + "|" + razorpay_payment_id, 
  process.env.RAZORPAY_KEY_SECRET
);

if (generated_signature === razorpay_signature) {
   updateOrderStatus(orderId, "PLACED");
   triggerMultiVendorAllocation(orderId);
   return response(200, { "verified": true });
} else {
   updateOrderStatus(orderId, "PAYMENT_FAILED");
   return response(400, { "error": "Signature verification failed" });
}

```

#### Server Success Response (`200 OK`)

```json
{
  "success": true,
  "verified": true,
  "orderStatus": "PLACED",
  "trackingDetails": {
    "initiatedAt": "2026-06-15T13:04:47Z",
    "estDelivery": "2026-06-20T18:30:00Z"
  }
}

```

---

## 3. Order State Lifecycle Management

To prevent data corruption, database records must follow this strict directional state flow path exclusively:

| Current State | Target State Allowed | Condition Triggers |
| --- | --- | --- |
| `PENDING_PAYMENT` | `PLACED` | Online verification signature matches successfully. |
| `PENDING_PAYMENT` | `PAYMENT_FAILED` | Interactive gateway checkout modal explicitly aborted or card declined. |
| `N/A (New)` | `PLACED` | Order matches Cash On Delivery (`cod`) parameter checks. |
| `PLACED` | `CANCELLED` | Multi-vendor automated out-of-stock check fallback overrides occur. |

---

## 4. Frontend-Backend Synchronicity Agreement

1. **Monetary Resolution Integrity:** All values sent inside `gatewayConfig.amount` fields for currency generation must be compiled in **lowest fractional denominations** (e.g., multiply Indian Rupees by 100 to pass as pure Paise integers: `₹5,100` ➔ `510000`) to avoid floating-point rounding issues across networks.
2. **Stock Multi-Lock Constraints:** Initializing checkouts (`/checkout/initiate`) must temporarily reserve items for a maximum of **15 minutes**. If no transaction verify signature payload hits within that window, inventory blocks must automatically free up back into global store stocks.