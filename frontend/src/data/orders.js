// src/data/orders.js

export const CONFIG_ORDER_MODULE_DATA = {
    labels: {
        title: "My Orders",
        subtitle: "Track and manage your orders, check shipping status, and view invoices.",
        searchPlaceholder: "Search by Order ID or item name...",
        backActionLabel: "Back to Catalog",
        emptyFeedMsg: "We couldn't find any orders matching your search.",
        recordsCountLabel: "Orders found:",
        backToLedgerLabel: "Back to My Orders",
        headerCategory: "Order Summary",
        metaRegisteredLabel: "Ordered on",
        timelineHeader: "Tracking History",
        logisticsHeader: "Delivery Address",
        financialsHeader: "Price Details",
        invoiceBtnText: "Download Invoice",
        cancelBtnText: "Cancel Order",
        currencyText: "Sold by",
        merchantSplitText: "sellers",
        actionText: "View Details",
        qtyText: "Quantity:",
        absoluteTotalText: "Total Amount",
        verificationText: "Payment Method"
    },
    statusFilters: [
        { key: 'all', label: 'All Orders' },
        { key: 'processing', label: 'Processing' },
        { key: 'shipped', label: 'In Transit' },
        { key: 'delivered', label: 'Completed' }
    ],
    items: [
        {
            id: "ZMK-98231-IND",
            date: "2026-06-28",
            time: "14:32 IST",
            status: "processing",
            statusLabel: "Processing",
            paymentMethod: "UPI (Razorpay)",
            address: "Tharun Krishna C U, Christ College Road, Irinjalakuda, Thrissur, Kerala - 680125",
            totalAmount: "₹14,398",
            merchantCount: 2,
            productItems: [
                { name: "Quantum Mechanical Keyboard v2" },
                { name: "Pro Wireless Dual-Sense Controller" }
            ],
            financials: {
                subtotal: "₹14,298",
                gatewayTax: "₹100",
                shipmentFee: "₹0",
                absoluteTotal: "₹14,398"
            },
            merchants: [
                { id: 101, storeName: "Apex Digital Hub", itemName: "Quantum Mechanical Keyboard v2", qty: 1, calculatedPrice: "₹8,499" },
                { id: 102, storeName: "Zaalima Boutiques", itemName: "Pro Wireless Dual-Sense Controller", qty: 1, calculatedPrice: "₹5,899" }
            ],
            timeline: [
                { id: 1, timestamp: "14:32 | 2026-06-28", desc: "Payment processed successfully." },
                { id: 2, timestamp: "14:30 | 2026-06-28", desc: "Order processed and confirmed." }
            ]
        },
        {
            id: "ZMK-87112-IND",
            date: "2026-06-24",
            time: "11:15 IST",
            status: "shipped",
            statusLabel: "Shipped",
            paymentMethod: "Net Banking (Razorpay)",
            address: "Tharun Krishna C U, Christ College Road, Irinjalakuda, Thrissur, Kerala - 680125",
            totalAmount: "₹4,299",
            merchantCount: 1,
            productItems: [
                { name: "Premium Leather Birken Clogs" }
            ],
            financials: {
                subtotal: "₹4,199",
                gatewayTax: "₹50",
                shipmentFee: "₹50",
                absoluteTotal: "₹4,299"
            },
            merchants: [
                { id: 103, storeName: "Zaalima Boutiques", itemName: "Premium Leather Birken Clogs", qty: 1, calculatedPrice: "₹4,199" }
            ],
            timeline: [
                { id: 1, timestamp: "18:00 | 2026-06-25", desc: "Package picked up by Delhivery." }
            ]
        }
    ]
};