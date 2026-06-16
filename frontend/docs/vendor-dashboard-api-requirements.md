Here is the comprehensive, functional, and clean API specification markdown document for your backend team. It maps your newly built **Vendor Dashboard** client layout (Stats Cards, Revenue Summary, and Recent Orders Table) directly to backend endpoint definitions, payloads, and database constraints.

---

# Zmarket Vendor Dashboard API Specifications & Requirements

This document outlines the endpoints, request/response models, validation logic, and lifecycle definitions required to power the administrative vendor console dashboard page.

---

## 1. Global Core Specifications

* **Base Endpoint Path:** `/api/v1/vendor`
* **Content-Type Header:** `application/json`
* **Authorization:** HTTP Bearer Protocol (`Authorization: Bearer <JWT_VENDOR_TOKEN>`)
* **Core Error Payload Schema:**
```json
{
  "success": false,
  "errorCode": "UNAUTHORIZED_VENDOR_NODE",
  "message": "The requesting token signature does not have administrative rights to this vendor ID.",
  "timestamp": "2026-06-16T21:57:00Z"
}

```



---

## 2. API Endpoints Map & Requirements

### Master Endpoint: `GET /api/v1/vendor/dashboard-summary`

**Purpose:** Maps directly to the initialization hook of `VendorDashboard.jsx`. It returns high-level business analytics, comparative growth factors, periodic distribution matrices, and the absolute latest order dispatches in a single combined payload.

#### Server Success Response (`200 OK`)

```json
{
  "success": true,
  "dashboardStats": {
    "totalRevenue": 50000,
    "totalOrders": 120,
    "totalProducts": 35,
    "totalCustomers": 80,
    "growthRates": {
      "revenue": "+15%",
      "orders": "+8.4%",
      "products": "+2.1%",
      "customers": "-1.5%"
    }
  },
  "revenueBreakdown": {
    "today": { "amount": 2450, "delta": "+4.2%" },
    "monthly": { "amount": 50000, "delta": "+15.8%" },
    "yearly": { "amount": 584000, "delta": "+22.4%" }
  },
  "recentOrders": [
    { 
      "id": "ZMK-8941-11", 
      "customer": "Aleena Manoj", 
      "amount": 898, 
      "status": "Shipped", 
      "date": "2026-06-15" 
    },
    { 
      "id": "ZMK-2046-23", 
      "customer": "Melit Joffy", 
      "amount": 4092, 
      "status": "Processing", 
      "date": "2026-06-14" 
    },
    { 
      "id": "ZMK-1258-05", 
      "customer": "Chrismon Sunny", 
      "amount": 12580, 
      "status": "Delivered", 
      "date": "2026-06-12" 
    },
    { 
      "id": "ZMK-0583-92", 
      "customer": "Edwin Shaju", 
      "amount": 583, 
      "status": "Pending", 
      "date": "2026-06-10" 
    }
  ]
}

```

---

### Extended Data Node 1: `GET /api/v1/vendor/orders-ledger`

**Purpose:** Triggered when the vendor interacts with or switches views directly into the dedicated **Orders** tab panel. Returns a comprehensive, paginated history of transactions containing inventory matching their specific seller ID.

#### Supported Query Parameters

* `page`: Integer (Default: `1`)
* `limit`: Integer (Default: `20`)
* `status`: String Filter (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`)

#### Server Success Response (`200 OK`)

```json
{
  "success": true,
  "metaData": {
    "totalRecords": 120,
    "currentPage": 1,
    "totalPages": 6
  },
  "orders": [
    {
      "id": "ZMK-8941-11",
      "customer": "Aleena Manoj",
      "amount": 898,
      "status": "Shipped",
      "date": "2026-06-15",
      "items": [
        { "title": "Anarkali Kurta Set", "quantity": 1, "skuPrice": 898 }
      ]
    }
  ]
}

```

---

### Extended Data Node 2: `GET /api/v1/vendor/products-catalog`

**Purpose:** Hydrates the **Products** inventory board view list framework.

#### Server Success Response (`200 OK`)

```json
{
  "success": true,
  "products": [
    {
      "productId": "prod_3591a",
      "title": "Anarkali Kurta Set",
      "stockCount": 14,
      "basePrice": 898,
      "status": "ACTIVE"
    },
    {
      "productId": "prod_4412b",
      "title": "Vyb Diva Wristwatch",
      "stockCount": 3,
      "basePrice": 2046,
      "status": "LOW_STOCK"
    }
  ]
}

```

---

## 3. Business Logic & Strict Constraints

1. **Multi-Tenant Isolation Filters:** The database query engines must enforce an absolute boundary limit via the active session token (`WHERE vendor_id = token.vendor_id`). A vendor must never be able to access financial metrics, customer names, or item counts belonging to another merchant.
2. **Order Lifecycle Synchronization Rules:** The client layout maps state statuses via colored badges. The backend validation router must restrict modifications to order states according to this strict directional logic flow map:
* `Pending` ➔ Can transition directly to `Processing` or `Cancelled`.
* `Processing` ➔ Can transition directly to `Shipped`.
* `Shipped` ➔ Can transition directly to `Delivered`.
* Any item marked `Delivered` or `Cancelled` is locked permanently as an immutable archive record node.


3. **Financial Value Consistency:** All fields mapping monetary parameters (`amount`, `basePrice`, `skuPrice`) must be pulled from the database or calculated internally using precise integer formats representing the lowest denomination (e.g., full Paise values in database schemas) before compiling into clean float or string responses for frontend layout elements. Use ISO standard UTC timestamps (`YYYY-MM-DD`) for date strings.