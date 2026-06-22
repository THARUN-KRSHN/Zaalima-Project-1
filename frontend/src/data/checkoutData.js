// src/data/checkoutData.js

// 1. Export the summary calculations
export const checkoutSummary = {
    subtotal: 5000,
    tax: 250,
    shipping: 50,
    total: 5300,
};

// 2. 🌟 MAKE SURE 'export' IS HERE: This resolves your exact Uncaught SyntaxError
export const checkoutCartItems = [
    {
        id: 1,
        title: "Anarkali Kurta Set",
        brand: "Zaalima Premium Hub",
        price: 898,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 2,
        title: "Vyb Diva Wristwatch",
        brand: "Fastrack",
        price: 2046,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&auto=format&fit=crop&q=80"
    }
];

// 3. Export the default values for the forms
export const defaultShippingAddress = {
    fullName: 'Tharunkrishna CU',
    phone: '9778585423',
    email: 'tharun@zmarket.com',
    addressLine1: '401, Cheloorkavu, moonupeedika road',
    addressLine2: 'Cheloorkavu Temple Road',
    city: 'Irinjalakuda',
    state: 'Kerala',
    pincode: '680121'
};