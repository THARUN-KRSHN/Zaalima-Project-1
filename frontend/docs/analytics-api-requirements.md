
# Zmarket Analytics Dashboard API Specifications & Requirements

This document outlines the strict endpoint designs, query configurations, data models, and system rules required to power the administrative performance analytics view portal.

---

## 1. Global Integration Configuration

* **Base Endpoint Path:** `/api/v1/analytics`
* **Data Payload Format:** `application/json`
* **Authentication Matrix:** Bearer Protocol (`Authorization: Bearer <JWT_TOKEN>`)
* **Time Zone Baseline:** All incoming parameters, query bounds, and structural data arrays must follow ISO 8601 standard timestamps (`YYYY-MM-DD`).

---

## 2. Structural API Endpoints Map

### Node A: Consolidating Macro Indicators

* **Endpoint:** `GET /api/v1/analytics/overview-summary`
* **Target Interface:** `AnalyticsCard.jsx` (Unified Summary Strip Banner)
* **Frequency:** Initial page load event loop hook.

#### Server Success Payload (`200 OK`)

```json
{
  "success": true,
  "metrics": {
    "totalRevenue": 50000,
    "totalOrders": 120,
    "totalCustomers": 80,
    "topSellingProduct": {
      "name": "Anarkali Kurta Set",
      "unitsSold": 48
    },
    "growthRates": {
      "revenueDelta": "+15.4%",
      "ordersDelta": "+8.2%",
      "customersDelta": "+12.1%"
    }
  }
}

```

---

### Node B: Time-Series Periodic Trends

* **Endpoint:** `GET /api/v1/analytics/time-series-trends`
* **Target Interfaces:** `RevenueChart.jsx` & `SalesChart.jsx`
* **Optional Query Filters:** `?range=12m` (Default), `?range=6m`

#### Server Success Payload (`200 OK`)

```json
{
  "success": true,
  "timeRange": "12m",
  "series": [
    { "month": "Jan", "revenue": 18000, "unitsSold": 45 },
    { "month": "Feb", "revenue": 24000, "unitsSold": 58 },
    { "month": "Mar", "revenue": 32000, "unitsSold": 82 },
    { "month": "Apr", "revenue": 28000, "unitsSold": 69 },
    { "month": "May", "revenue": 41000, "unitsSold": 94 },
    { "month": "Jun", "revenue": 50000, "unitsSold": 120 },
    { "month": "Jul", "revenue": 19000, "unitsSold": 46 },
    { "month": "Aug", "revenue": 26000, "unitsSold": 59 },
    { "month": "Sep", "revenue": 33000, "unitsSold": 83 },
    { "month": "Oct", "revenue": 29000, "unitsSold": 70 },
    { "month": "Nov", "revenue": 42000, "unitsSold": 95 },
    { "month": "Dec", "revenue": 51000, "unitsSold": 122 }
  ]
}

```

---

### Node C: Inventory Conversion Ranking Matrix

* **Endpoint:** `GET /api/v1/analytics/top-products-ledger`
* **Target Interface:** `TopProductsTable.jsx`
* **Pagination Parameter Defaults:** `?limit=5&sort=sales_desc`

#### Server Success Payload (`200 OK`)

```json
{
  "success": true,
  "topProducts": [
    { "id": "p_01", "name": "Anarkali Kurta Set", "sales": 48, "revenue": 43104, "stock": 14 },
    { "id": "p_02", "name": "Vyb Diva Wristwatch", "sales": 36, "revenue": 73656, "stock": 3 },
    { "id": "p_03", "name": "Premium Silk Saree", "sales": 22, "revenue": 38500, "stock": 25 },
    { "id": "p_04", "name": "Casual Denim Jacket", "sales": 14, "revenue": 13986, "stock": 0 }
  ]
}

```

---

### Node D: Fulfillment Ratio Allocations

* **Endpoint:** `GET /api/v1/analytics/fulfillment-ratios`
* **Target Interface:** `OrderTrends.jsx`

#### Server Success Payload (`200 OK`)

```json
{
  "success": true,
  "fulfillmentTrends": {
    "totalOrders": 120,
    "breakdown": [
      { "type": "pending", "label": "Pending Orders", "count": 24 },
      { "type": "delivered", "label": "Delivered Orders", "count": 86 },
      { "type": "cancelled", "label": "Cancelled Orders", "count": 10 }
    ]
  }
}

```

---

## 3. Mandatory Business Logic Constraints & Optimization Rules

1. **Strict Context Isolation:** All backend lookup tables must filter data specifically to the authenticated request identifier signature extracted safely from the verified token payloads (`WHERE merchant_id = active_jwt_token.id`). Merchants must never be able to access financial trends, inventory stats, or order volume logs belonging to other platform sellers.
2. **Deterministic Integer Math:** To eliminate rounding inaccuracies inherent to float or double processing pipelines, monetary records must be saved as integers at the lowest value subdivision tier (e.g., full Paise integers inside DB columns) before being parsed into accurate numeric floats for client delivery arrays.
3. **Data Uniformity Guarantee:** The chronological data array returned by `Node B` must guarantee a strict 12-entry sequence payload mapping exactly to the 12 calendar intervals (`Jan` to `Dec`), avoiding missing element arrays that would break Recharts axis alignment components. Empty or uninitialized periods must return explicit zero bounds (`0`) instead of being completely skipped.