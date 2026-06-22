/**
 * 📈 ZMARKET VENDOR ANALYTICS MOCK DATA ENGINE
 * Centralized data models to feed the line charts, bar graphs, and item rank matrices.
 */

// 1. Line/Area Chart Time-Series Ledger
export const revenueData = [
    { month: "Jan", revenue: 18000 },
    { month: "Feb", revenue: 24000 },
    { month: "Mar", revenue: 32000 },
    { month: "Apr", revenue: 28000 },
    { month: "May", revenue: 41000 },
    { month: "Jun", revenue: 50000 },
    { month: "July", revenue: 18000 },
    { month: "Aug", revenue: 24000 },
    { month: "Sep", revenue: 32000 },
    { month: "Oct", revenue: 28000 },
    { month: "Nov", revenue: 41000 },
    { month: "Dec", revenue: 50000 },
];

// 2. Bar Chart Sales-Volume Distribution Nodes
export const salesVolumeData = [
    { month: "Jan", unitsSold: 45 },
    { month: "Feb", unitsSold: 58 },
    { month: "Mar", unitsSold: 82 },
    { month: "Apr", unitsSold: 69 },
    { month: "May", unitsSold: 94 },
    { month: "Jun", unitsSold: 120 },
    { month: "July", unitsSold: 45 },
    { month: "Aug", unitsSold: 58 },
    { month: "Sep", unitsSold: 82 },
    { month: "Oct", unitsSold: 69 },
    { month: "Nov", unitsSold: 94 },
    { month: "Dec", unitsSold: 120 },
];

// 3. Inventory Performance Matrix Ledgers
export const topProducts = [
    {
        id: "p_01",
        name: "Anarkali Kurta Set",
        sales: 48,
        revenue: 43104,
        stock: 14
    },
    {
        id: "p_02",
        name: "Vyb Diva Wristwatch",
        sales: 36,
        revenue: 73656,
        stock: 3
    },
    {
        id: "p_03",
        name: "Premium Silk Saree",
        sales: 22,
        revenue: 38500,
        stock: 25
    },
    {
        id: "p_04",
        name: "Casual Denim Jacket",
        sales: 14,
        revenue: 13986,
        stock: 0
    }
];

// 4. Progress Pipeline Status Distributions
export const fulfillmentTrends = {
    totalOrders: 120,
    breakdown: [
        { type: "pending", label: "Pending Orders", count: 24 },
        { type: "delivered", label: "Delivered Orders", count: 86 },
        { type: "cancelled", label: "Cancelled Orders", count: 10 }
    ]
};

// 5. Dashboard summary metrics used by AnalyticsCard.jsx
export const analyticsMetrics = [
    { id: 'rev', label: 'Total Revenue', value: '₹50,000', change: '+15.4%' },
    { id: 'ord', label: 'Total Orders', value: '120', change: '+8.2%' },
    { id: 'cust', label: 'Total Customers', value: '80', change: '+12.1%' },
    { id: 'top', label: 'Top Product', value: 'Anarkali Set', change: '48 Sold' },
];