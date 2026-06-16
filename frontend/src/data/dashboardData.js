/**
 * 📊 ZMARKET ADMINISTRATIVE DASHBOARD MOCK DATA
 * Centralized data source for vendor metrics, revenue tracking, and order logs.
 */

// 1. Primary Metrics Statistics
export const dashboardStats = {
    totalRevenue: 50000,
    totalOrders: 120,
    totalProducts: 35,
    totalCustomers: 80,
    growthRates: {
        revenue: "+15%",
        orders: "+8.4%",
        products: "+2.1%",
        customers: "-1.5%"
    }
};

// 2. Periodic Revenue Breakdown
export const revenueBreakdown = {
    today: { amount: 2450, delta: "+4.2%" },
    monthly: { amount: 50000, delta: "+15.8%" },
    yearly: { amount: 584000, delta: "+22.4%" }
};

// 3. Recent Orders Ledger Tracking
export const recentOrders = [
    {
        id: 'ZMK-8941-11',
        customer: 'Aleena Manoj',
        amount: 898,
        status: 'Shipped',
        date: 'June 15, 2026'
    },
    {
        id: 'ZMK-2046-23',
        customer: 'Melit Joffy',
        amount: 4092,
        status: 'Processing',
        date: 'June 14, 2026'
    },
    {
        id: 'ZMK-1258-05',
        customer: 'Chrismon Sunny',
        amount: 12580,
        status: 'Delivered',
        date: 'June 12, 2026'
    },
    {
        id: 'ZMK-0583-92',
        customer: 'Edwin Shaju',
        amount: 583,
        status: 'Cancelled',
        date: 'June 10, 2026'
    },
    {
        id: 'ZMK-7721-04',
        customer: 'Farhan Nizam',
        amount: 2450,
        status: 'Delivered',
        date: 'June 08, 2026'
    }
];