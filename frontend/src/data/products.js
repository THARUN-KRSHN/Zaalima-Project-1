// src/data/products.js
// Central mock product catalog for the storefront.
// Import { allProducts } for the full catalog, or the smaller derived
// lists below for specific components.

export const categories = [
    "Fashion",
    "Electronics",
    "Books",
    "Home & Kitchen",
    "Beauty",
    "Sports & Fitness"
];

// 1. Main products catalog used by ProductListing.jsx
export const allProducts = [
    {
        id: 1,
        brand: "The Style Story",
        title: "Anarkali Kurta Set",
        category: "Fashion",
        description: "Women Viscose Rayon Anarkali Kurta, Palazzo & Premium Dupatta Set.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        rating: 4.4,
        reviewCount: 1374,
        price: 898,
        tag: "Best Seller"
    },
    {
        id: 2,
        brand: "Oumad",
        title: "Floral Print Kurta Set",
        category: "Fashion",
        description: "Traditional refined handwoven Floral Print Kurta, crisp Palazzo & complete Dupatta Set.",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
        rating: 4.1,
        reviewCount: 23025,
        price: 583,
        tag: "Top Rated"
    },
    {
        id: 3,
        brand: "Roadster",
        title: "Men's Slim Fit Denim Jacket",
        category: "Fashion",
        description: "Classic washed-blue denim jacket with a slim fit cut, button closure, and dual chest pockets.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
        rating: 4.3,
        reviewCount: 5821,
        price: 1299,
        tag: "Trending"
    },
    {
        id: 4,
        brand: "Bata",
        title: "Men's Leather Formal Shoes",
        category: "Fashion",
        description: "Premium genuine leather formal shoes with cushioned insole and non-slip outsole for all-day comfort.",
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80",
        rating: 4.5,
        reviewCount: 3120,
        price: 1899,
        tag: "New Arrival"
    },
    {
        id: 5,
        brand: "Fastrack",
        title: "Vyb Diva Premium Analog Watch",
        category: "Electronics",
        description: "Vyb Diva Premium Analog Wristwatch. Designed gracefully for modern women.",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
        rating: 4.5,
        reviewCount: 314,
        price: 2046,
        tag: "New Arrival"
    },
    {
        id: 6,
        brand: "Samsung",
        title: "Galaxy M06 5G",
        category: "Electronics",
        description: "Blazing Black configuration featuring 128 GB & MediaTek Dimensity 6300 chipset.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
        rating: 4.1,
        reviewCount: 2355,
        price: 12580,
        tag: "Trending"
    },
    {
        id: 7,
        brand: "boAt",
        title: "Rockerz 450 Wireless Headphones",
        category: "Electronics",
        description: "Over-ear Bluetooth headphones with 15-hour playback, padded ear cushions, and deep bass.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
        rating: 4.3,
        reviewCount: 18942,
        price: 1299,
        tag: "Best Seller"
    },
    {
        id: 8,
        brand: "HP",
        title: "Pavilion 15 Laptop",
        category: "Electronics",
        description: "15.6-inch laptop with Intel Core i5 processor, 16GB RAM and 512GB SSD, built for work and play.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
        rating: 4.4,
        reviewCount: 967,
        price: 54990,
        tag: "Top Rated"
    },
    {
        id: 9,
        brand: "Oxford",
        title: "Classic History Atlas",
        category: "Books",
        description: "Detailed cartography maps, historical breakdowns, and educational global timelines.",
        image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=600&auto=format&fit=crop&q=80",
        rating: 4.6,
        reviewCount: 182,
        price: 450,
        tag: "Education"
    },
    {
        id: 10,
        brand: "Penguin",
        title: "The Sci-Fi Odyssey",
        category: "Books",
        description: "A breathtaking epic space fictional novel following extra-galactic space travel frameworks.",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=80",
        rating: 4.8,
        reviewCount: 942,
        price: 299,
        tag: "Fiction"
    },
    {
        id: 11,
        brand: "HarperCollins",
        title: "The Mindful Entrepreneur",
        category: "Books",
        description: "A practical guide blending mindfulness practices with startup strategy for founders seeking balance.",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80",
        rating: 4.5,
        reviewCount: 631,
        price: 349,
        tag: "Non-Fiction"
    },
    {
        id: 12,
        brand: "Scholastic",
        title: "Adventures of the Lost Kingdom",
        category: "Books",
        description: "A vivid children's fantasy adventure following three siblings who discover a hidden magical realm.",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
        rating: 4.7,
        reviewCount: 1204,
        price: 249,
        tag: "Kids"
    },
    {
        id: 13,
        brand: "Prestige",
        title: "Non-Stick Induction Cookware Set",
        category: "Home & Kitchen",
        description: "5-piece non-stick cookware set compatible with induction and gas stovetops, includes tawa, kadhai & sauce pan.",
        image: "https://images.unsplash.com/photo-1584990347449-a2d4c3ba2e1a?w=600&auto=format&fit=crop&q=80",
        rating: 4.4,
        reviewCount: 2871,
        price: 1799,
        tag: "Best Seller"
    },
    {
        id: 14,
        brand: "Milton",
        title: "Thermosteel Insulated Water Bottle",
        category: "Home & Kitchen",
        description: "Double-wall vacuum insulated stainless steel bottle that keeps beverages hot for 12 hours and cold for 24 hours.",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
        rating: 4.6,
        reviewCount: 6532,
        price: 599,
        tag: "Top Rated"
    },
    {
        id: 15,
        brand: "Philips",
        title: "Air Fryer HD9200",
        category: "Home & Kitchen",
        description: "Rapid air technology fryer that cooks with up to 90% less fat, perfect for healthier everyday meals.",
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80",
        rating: 4.5,
        reviewCount: 4210,
        price: 6495,
        tag: "Trending"
    },
    {
        id: 16,
        brand: "Fabindia",
        title: "Handloom Cotton Bedsheet Set",
        category: "Home & Kitchen",
        description: "Breathable pure cotton double bedsheet with two matching pillow covers, handwoven in traditional patterns.",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
        rating: 4.3,
        reviewCount: 987,
        price: 1199,
        tag: "New Arrival"
    },
    {
        id: 17,
        brand: "Mamaearth",
        title: "Vitamin C Face Serum",
        category: "Beauty",
        description: "Brightening face serum with Vitamin C and Turmeric that reduces dark spots and evens skin tone.",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
        rating: 4.4,
        reviewCount: 9821,
        price: 499,
        tag: "Best Seller"
    },
    {
        id: 18,
        brand: "Nykaa",
        title: "Matte Liquid Lipstick",
        category: "Beauty",
        description: "Long-lasting transfer-proof matte liquid lipstick with a lightweight, comfortable finish.",
        image: "https://images.unsplash.com/photo-1512207736890-6ffed4b64fdf?w=600&auto=format&fit=crop&q=80",
        rating: 4.5,
        reviewCount: 15234,
        price: 349,
        tag: "Trending"
    },
    {
        id: 19,
        brand: "Forest Essentials",
        title: "Sandalwood Luxury Soap",
        category: "Beauty",
        description: "Handcrafted luxury bathing bar infused with pure sandalwood oil for naturally soft, fragrant skin.",
        image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=600&auto=format&fit=crop&q=80",
        rating: 4.7,
        reviewCount: 2145,
        price: 425,
        tag: "Top Rated"
    },
    {
        id: 20,
        brand: "Wow Skin Science",
        title: "Onion Black Seed Hair Oil",
        category: "Beauty",
        description: "Nourishing hair oil blend with onion and black seed extract that strengthens roots and reduces hair fall.",
        image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop&q=80",
        rating: 4.3,
        reviewCount: 11890,
        price: 349,
        tag: "Best Seller"
    },
    {
        id: 21,
        brand: "Decathlon",
        title: "Anti-Slip Yoga Mat",
        category: "Sports & Fitness",
        description: "6mm thick anti-slip yoga mat with superior cushioning, ideal for yoga, pilates and floor workouts.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80",
        rating: 4.5,
        reviewCount: 7642,
        price: 799,
        tag: "Best Seller"
    },
    {
        id: 22,
        brand: "Boldfit",
        title: "Adjustable Dumbbell Set (20kg)",
        category: "Sports & Fitness",
        description: "Space-saving adjustable dumbbell pair with quick-lock mechanism, adjustable from 2.5kg to 20kg total.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80",
        rating: 4.4,
        reviewCount: 1893,
        price: 2499,
        tag: "Trending"
    },
    {
        id: 23,
        brand: "Puma",
        title: "Men's Running Shoes",
        category: "Sports & Fitness",
        description: "Lightweight mesh running shoes with cushioned midsole and reinforced heel support for daily runs.",
        image: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?w=600&auto=format&fit=crop&q=80",
        rating: 4.4,
        reviewCount: 4567,
        price: 2199,
        tag: "New Arrival"
    },
    {
        id: 24,
        brand: "Boldfit",
        title: "Resistance Bands Set (5 Levels)",
        category: "Sports & Fitness",
        description: "Set of 5 latex resistance bands with varying tension levels, ideal for strength training and rehab workouts.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=80",
        rating: 4.3,
        reviewCount: 3298,
        price: 599,
        tag: "Top Rated"
    }
];

// 2. Similar products list used by ProductGrid.jsx
export const sampleProducts = [
    {
        id: 1,
        brand: "The Style Story",
        title: "Anarkali Kurta Set",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        price: 898,
        tag: "Best Seller"
    },
    {
        id: 2,
        brand: "Oumad",
        title: "Floral Print Kurta Set",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
        price: 583,
        tag: "Top Rated"
    },
    {
        id: 3,
        brand: "Roadster",
        title: "Men's Slim Fit Denim Jacket",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
        price: 1299,
        tag: "Trending"
    },
    {
        id: 4,
        brand: "Bata",
        title: "Men's Leather Formal Shoes",
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80",
        price: 1899,
        tag: "New Arrival"
    },
    {
        id: 5,
        brand: "Fastrack",
        title: "Vyb Diva Premium Analog Watch",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
        price: 2046,
        tag: "New Arrival"
    },
    {
        id: 6,
        brand: "Samsung",
        title: "Galaxy M06 5G",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
        price: 12580,
        tag: "Trending"
    },
    {
        id: 7,
        brand: "boAt",
        title: "Rockerz 450 Wireless Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
        price: 1299,
        tag: "Best Seller"
    },
    {
        id: 8,
        brand: "HP",
        title: "Pavilion 15 Laptop",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
        price: 54990,
        tag: "Top Rated"
    }
];

// 3. Paginated grid products used by PaginatedProductGrid in ProductGrid.jsx
export const paginatedProducts = [
    { id: 1, title: "Product 1", price: 750, tag: "New Arrival" },
    { id: 2, title: "Product 2", price: 1000, tag: "Trending" },
    { id: 3, title: "Product 3", price: 1250, tag: "Top Rated" },
    { id: 4, title: "Product 4", price: 1500, tag: "Best Seller" },
    { id: 5, title: "Product 5", price: 1750, tag: "New Arrival" },
    { id: 6, title: "Product 6", price: 2000, tag: "Trending" },
    { id: 7, title: "Product 7", price: 2250, tag: "Top Rated" },
    { id: 8, title: "Product 8", price: 2500, tag: "Best Seller" },
    { id: 9, title: "Product 9", price: 2750, tag: "New Arrival" },
    { id: 10, title: "Product 10", price: 3000, tag: "Trending" },
    { id: 11, title: "Product 11", price: 3250, tag: "Top Rated" },
    { id: 12, title: "Product 12", price: 3500, tag: "Best Seller" }
];

// 4. Fallback products used by SimilarProducts.jsx when no products are passed in props
export const similarFallbackProducts = [
    {
        id: 101,
        brand: "The Style Story",
        title: "Anarkali Kurta Set",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        price: 898,
        tag: "Best Seller"
    },
    {
        id: 102,
        brand: "Oumad",
        title: "Floral Print Kurta Set",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
        price: 583,
        tag: "Top Rated"
    },
    {
        id: 105,
        brand: "Fastrack",
        title: "Vyb Diva Premium Analog Watch",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
        price: 2046,
        tag: "New Arrival"
    },
    {
        id: 106,
        brand: "Samsung",
        title: "Galaxy M06 5G",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
        price: 12580,
        tag: "Trending"
    }
];

// 5. Vendor products templates used in VendorProducts.jsx
export const vendorTemplateProducts = [
    { id: 1, name: "Anarkali Kurta Set", price: 898, stock: 17 },
    { id: 2, name: "Floral Print Kurta Set", price: 583, stock: 24 },
    { id: 3, name: "Men's Slim Fit Denim Jacket", price: 1299, stock: 31 },
    { id: 4, name: "Men's Leather Formal Shoes", price: 1899, stock: 38 },
    { id: 5, name: "Vyb Diva Premium Analog Watch", price: 2046, stock: 45 },
    { id: 6, name: "Galaxy M06 5G", price: 12580, stock: 52 },
    { id: 7, name: "Rockerz 450 Wireless Headphones", price: 1299, stock: 59 },
    { id: 8, name: "Pavilion 15 Laptop", price: 54990, stock: 6 },
    { id: 9, name: "Classic History Atlas", price: 450, stock: 13 },
    { id: 10, name: "The Sci-Fi Odyssey", price: 299, stock: 20 }
];

// 6. Helper: get products filtered by category
export const getProductsByCategory = (category) =>
    category ? allProducts.filter((p) => p.category === category) : allProducts;

// 7. Helper: get a single product by id
export const getProductById = (id) =>
    allProducts.find((p) => p.id === Number(id));