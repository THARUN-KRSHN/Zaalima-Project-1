// src/data/orders.js

export const CONFIG_ORDER_MODULE_DATA = {
    labels: {
        title: "Order Tracking Architecture",
        subtitle: "Trace node logistics dispatch histories, process verification records, and monitor multi-vendor transactions.",
        searchPlaceholder: "Search by order hash reference or item name...",
        backActionLabel: "Back to Catalog",
        emptyFeedMsg: "No recorded transaction logs matched your query parameters.",
        recordsCountLabel: "Active Operations Index:",
        backToLedgerLabel: "Return to Operations Ledger",
        headerCategory: "Order Configuration Data Matrix",
        metaRegisteredLabel: "Registered Log",
        timelineHeader: "Telemetry Route Registry Timeline",
        logisticsHeader: "Delivery Node Registry Address",
        financialsHeader: "Settlement Framework Metrics",
        invoiceBtnText: "Download Cryptographic Invoice",
        cancelBtnText: "Request Transaction Annulment",
        currencyText: "Sellers:",
        merchantSplitText: "Tenant Split",
        actionText: "Details",
        absoluteTotalText: "Absolute Total Settlement",
        verificationText: "Signature Verification"
    },
    statusFilters: [
        { key: 'all', label: 'All Operations' },
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
            statusLabel: "Processing at Node",
            paymentMethod: "Razorpay Escrow Node (UPI)",
            address: "Tharun Krishna C U, Christ College Road, Irinjalakuda, Thrissur, Kerala - 680125",
            totalAmount: "₹14,398",
            merchantCount: 2,
            // 🌟 UX FIX: Structured as an array instead of a messy raw text string
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
                { id: 1, timestamp: "14:32 | 2026-06-28", desc: "Funds captured via secure multi-tenant escrow settlement layer rails." },
                { id: 2, timestamp: "14:30 | 2026-06-28", desc: "Tenant micro-ledgers cleared and verified by gateway signature structural check." }
            ]
        },
        {
            id: "ZMK-87112-IND",
            date: "2026-06-24",
            time: "11:15 IST",
            status: "shipped",
            statusLabel: "Handed over to Logistics",
            paymentMethod: "Razorpay NetBanking Portal",
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
                { id: 1, timestamp: "18:00 | 2026-06-25", desc: "Package picked up by transit partner Delhivery." }
            ]
        }
    ]
};