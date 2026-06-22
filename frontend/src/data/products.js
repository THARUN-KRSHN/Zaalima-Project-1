// src/data/products.js

// 1. Main products catalog used by ProductListing.jsx
export const allProducts = [
    {
        id: 1,
        brand: "The Style Story",
        title: "Anarkali Kurta",
        category: "Fashion",
        description: "Women Viscose Rayon Anarkali Kurta, Palazzo & Premium Dupatta Set.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60",
        rating: 4.4,
        reviewCount: 1374,
        price: 898,
        tag: "Best Seller"
    },
    {
        id: 2,
        brand: "Fastrack",
        title: "Analog Watch",
        category: "Electronics",
        description: "Vyb Diva Premium Analog Wristwatch. Designed gracefully for modern women.",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60",
        rating: 4.5,
        reviewCount: 314,
        price: 2046,
        tag: "New Arrival"
    },
    {
        id: 3,
        brand: "Samsung",
        title: "Galaxy M06 5G",
        category: "Electronics",
        description: "Blazing Black configuration featuring 128 GB & MediaTek Dimensity 6300 chipset.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
        rating: 4.1,
        reviewCount: 2355,
        price: 12580,
        tag: "Trending"
    },
    {
        id: 4,
        brand: "Oumad",
        title: "Floral Print Kurta",
        category: "Fashion",
        description: "Traditional refined handwoven Floral Print Kurta, crisp Palazzo & complete Dupatta Set.",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60",
        rating: 4.1,
        reviewCount: 23025,
        price: 583,
        tag: "Top Rated"
    },
    {
        id: 5,
        brand: "Oxford",
        title: "Classic History Atlas",
        category: "Books",
        description: "Detailed cartography maps, historical breakdowns, and educational global timelines.",
        image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500&auto=format&fit=crop&q=60",
        rating: 4.6,
        reviewCount: 182,
        price: 450,
        tag: "Education"
    },
    {
        id: 6,
        brand: "Penguin",
        title: "The Sci-Fi Odyssey",
        category: "Books",
        description: "A breathtaking epic space fictional novel following extra-galactic space travel frameworks.",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60",
        rating: 4.8,
        reviewCount: 942,
        price: 299,
        tag: "Fiction"
    }
];

// 2. Similar products list used by ProductGrid.jsx
export const sampleProducts = [
    {
        id: 1,
        brand: "The Style Story",
        title: "Women Viscose Rayon Anarkali Kurta Set",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60",
        price: 898,
        tag: "Best Seller"
    },
    {
        id: 2,
        brand: "Fastrack",
        title: "Vyb Diva Analog Watch - For Women",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60",
        price: 2046,
        tag: "New Arrival"
    },
    {
        id: 3,
        brand: "Samsung",
        title: "M06 5G (Blazing Black, 128 GB)",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
        price: 12580,
        tag: "Trending"
    },
    {
        id: 4,
        brand: "Oumad",
        title: "Floral Print Kurta, Palazzo Set",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60",
        price: 583,
        tag: "Top Rated"
    }
];

// 3. Paginated grid products used by PaginatedProductGrid in ProductGrid.jsx
export const paginatedProducts = [
    { id: 1, title: "Product One", price: 999, tag: "Best Seller" },
    { id: 2, title: "Product Two", price: 1499, tag: "New Arrival" },
    { id: 3, title: "Product Three", price: 2499, tag: "Trending" },
    { id: 4, title: "Product Four", price: 799, tag: "Top Rated" }
];

// 4. Fallback products used by SimilarProducts.jsx when no products are passed in props
export const similarFallbackProducts = [
    {
        id: 101,
        title: "Anarkali Kurta",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60",
        price: 898,
        tag: "Best Seller"
    },
    {
        id: 102,
        brand: "Fastrack",
        title: "Analog Watch",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60",
        price: 2046,
        tag: "New Arrival"
    },
    {
        id: 103,
        brand: "Samsung",
        title: "Galaxy M06 5G",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
        price: 12580,
        tag: "Trending"
    },
    {
        id: 104,
        brand: "Oumad",
        title: "Floral Print Kurta",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60",
        price: 583,
        tag: "Top Rated"
    }
];

// 5. Vendor products templates used in VendorProducts.jsx
export const vendorTemplateProducts = [
    { id: 1, name: "Anarkali Kurta Set", price: 898, stock: 14 }
];
