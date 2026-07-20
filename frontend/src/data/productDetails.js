// src/data/productDetails.js
// Detailed product data used by ProductDetail / PDP pages.
// Keyed by product id so it maps 1:1 with allProducts in products.js.

export const mockProductDetails = {
    1: {
        id: 1,
        title: "Anarkali Kurta Set",
        brand: "The Style Story",
        category: "Fashion",
        price: 898,
        mrp: 1499,
        discountPercent: 40,
        rating: 4.4,
        reviewCount: 1374,
        description:
            "Women Viscose Rayon Anarkali Kurta, Palazzo & Premium Dupatta Set.",
        highlights: [
            "100% Viscose Rayon fabric",
            "3-piece set: Kurta, Palazzo & Dupatta",
            "Machine washable",
            "Regular fit, calf length"
        ],
        specifications: {
            "Fabric": "Viscose Rayon",
            "Fit": "Regular",
            "Sleeve": "3/4 Sleeve",
            "Pattern": "Floral Print",
            "Wash Care": "Machine Wash"
        },
        inStock: true,
        stockCount: 33,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Maroon", "Navy Blue", "Mustard"],
        images: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Best Seller"
    },

    2: {
        id: 2,
        title: "Floral Print Kurta Set",
        brand: "Oumad",
        category: "Fashion",
        price: 583,
        mrp: 999,
        discountPercent: 42,
        rating: 4.1,
        reviewCount: 23025,
        description:
            "Traditional refined handwoven Floral Print Kurta, crisp Palazzo & complete Dupatta Set.",
        highlights: [
            "Handwoven floral print",
            "3-piece set: Kurta, Palazzo & Dupatta",
            "Breathable cotton blend",
            "Ideal for festive & casual wear"
        ],
        specifications: {
            "Fabric": "Cotton Blend",
            "Fit": "Relaxed",
            "Sleeve": "3/4 Sleeve",
            "Pattern": "Floral Print",
            "Wash Care": "Hand Wash Recommended"
        },
        inStock: true,
        stockCount: 46,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Teal", "Peach", "Off White"],
        images: [
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Top Rated"
    },

    3: {
        id: 3,
        title: "Men's Slim Fit Denim Jacket",
        brand: "Roadster",
        category: "Fashion",
        price: 1299,
        mrp: 2199,
        discountPercent: 41,
        rating: 4.3,
        reviewCount: 5821,
        description:
            "Classic washed-blue denim jacket with a slim fit cut, button closure, and dual chest pockets.",
        highlights: [
            "100% Cotton denim",
            "Slim fit",
            "Button-front closure",
            "Machine washable"
        ],
        specifications: {
            "Fabric": "Cotton Denim",
            "Fit": "Slim",
            "Closure": "Button",
            "Wash Care": "Machine Wash Cold"
        },
        inStock: true,
        stockCount: 59,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Light Blue", "Dark Blue"],
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Trending"
    },

    4: {
        id: 4,
        title: "Men's Leather Formal Shoes",
        brand: "Bata",
        category: "Fashion",
        price: 1899,
        mrp: 2999,
        discountPercent: 37,
        rating: 4.5,
        reviewCount: 3120,
        description:
            "Premium genuine leather formal shoes with cushioned insole and non-slip outsole for all-day comfort.",
        highlights: [
            "Genuine leather upper",
            "Cushioned memory foam insole",
            "Non-slip rubber outsole",
            "Formal lace-up design"
        ],
        specifications: {
            "Material": "Genuine Leather",
            "Closure": "Lace-up",
            "Sole": "Rubber",
            "Occasion": "Formal"
        },
        inStock: true,
        stockCount: 72,
        sizes: ["6", "7", "8", "9", "10", "11"],
        colors: ["Black", "Brown"],
        images: [
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "New Arrival"
    },

    5: {
        id: 5,
        title: "Vyb Diva Premium Analog Watch",
        brand: "Fastrack",
        category: "Electronics",
        price: 2046,
        mrp: 2795,
        discountPercent: 27,
        rating: 4.5,
        reviewCount: 314,
        description:
            "Vyb Diva Premium Analog Wristwatch. Designed gracefully for modern women.",
        highlights: [
            "Water resistant up to 30m",
            "Stainless steel case",
            "1-year manufacturer warranty",
            "Adjustable strap"
        ],
        specifications: {
            "Movement": "Quartz Analog",
            "Case Material": "Stainless Steel",
            "Strap Material": "Leather",
            "Water Resistance": "30m",
            "Warranty": "1 Year"
        },
        inStock: true,
        stockCount: 85,
        sizes: [],
        colors: ["Rose Gold", "Silver", "Black"],
        images: [
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "New Arrival"
    },

    6: {
        id: 6,
        title: "Galaxy M06 5G",
        brand: "Samsung",
        category: "Electronics",
        price: 12580,
        mrp: 14999,
        discountPercent: 16,
        rating: 4.1,
        reviewCount: 2355,
        description:
            "Blazing Black configuration featuring 128 GB & MediaTek Dimensity 6300 chipset.",
        highlights: [
            "128 GB storage / 6 GB RAM",
            "MediaTek Dimensity 6300 chipset",
            "5000 mAh battery",
            "50 MP rear camera"
        ],
        specifications: {
            "Display": "6.7\" HD+",
            "Processor": "MediaTek Dimensity 6300",
            "RAM": "6 GB",
            "Storage": "128 GB",
            "Battery": "5000 mAh",
            "Network": "5G"
        },
        inStock: true,
        stockCount: 98,
        sizes: [],
        colors: ["Blazing Black", "Sunrise Gold"],
        images: [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Trending"
    },

    7: {
        id: 7,
        title: "Rockerz 450 Wireless Headphones",
        brand: "boAt",
        category: "Electronics",
        price: 1299,
        mrp: 2999,
        discountPercent: 57,
        rating: 4.3,
        reviewCount: 18942,
        description:
            "Over-ear Bluetooth headphones with 15-hour playback, padded ear cushions, and deep bass.",
        highlights: [
            "15-hour battery backup",
            "Bluetooth v5.0",
            "Padded ear cushions",
            "Built-in mic for calls"
        ],
        specifications: {
            "Connectivity": "Bluetooth 5.0",
            "Battery Life": "15 Hours",
            "Driver Size": "40mm",
            "Charging": "USB Type-C"
        },
        inStock: true,
        stockCount: 111,
        sizes: [],
        colors: ["Black", "Blue", "Red"],
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Best Seller"
    },

    8: {
        id: 8,
        title: "Pavilion 15 Laptop",
        brand: "HP",
        category: "Electronics",
        price: 54990,
        mrp: 68990,
        discountPercent: 20,
        rating: 4.4,
        reviewCount: 967,
        description:
            "15.6-inch laptop with Intel Core i5 processor, 16GB RAM and 512GB SSD, built for work and play.",
        highlights: [
            "Intel Core i5 12th Gen",
            "16GB RAM, 512GB SSD",
            "15.6\" Full HD display",
            "Backlit keyboard"
        ],
        specifications: {
            "Processor": "Intel Core i5",
            "RAM": "16 GB",
            "Storage": "512 GB SSD",
            "Display": "15.6\" FHD",
            "OS": "Windows 11"
        },
        inStock: true,
        stockCount: 124,
        sizes: [],
        colors: ["Silver"],
        images: [
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Top Rated"
    },

    9: {
        id: 9,
        title: "Classic History Atlas",
        brand: "Oxford",
        category: "Books",
        price: 450,
        mrp: 650,
        discountPercent: 31,
        rating: 4.6,
        reviewCount: 182,
        description:
            "Detailed cartography maps, historical breakdowns, and educational global timelines.",
        highlights: [
            "200+ detailed maps",
            "Historical timelines from ancient to modern era",
            "Hardcover, premium print quality",
            "Includes index & glossary"
        ],
        specifications: {
            "Format": "Hardcover",
            "Pages": "312",
            "Language": "English",
            "Publisher": "Oxford Press",
            "ISBN": "978-0-19-812345-6"
        },
        inStock: true,
        stockCount: 137,
        sizes: [],
        colors: [],
        images: [
            "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Education"
    },

    10: {
        id: 10,
        title: "The Sci-Fi Odyssey",
        brand: "Penguin",
        category: "Books",
        price: 299,
        mrp: 399,
        discountPercent: 25,
        rating: 4.8,
        reviewCount: 942,
        description:
            "A breathtaking epic space fictional novel following extra-galactic space travel frameworks.",
        highlights: [
            "Award-nominated science fiction novel",
            "Paperback, 420 pages",
            "First in a planned trilogy",
            "Includes author's note & star maps"
        ],
        specifications: {
            "Format": "Paperback",
            "Pages": "420",
            "Language": "English",
            "Publisher": "Penguin Books",
            "ISBN": "978-0-14-098765-4"
        },
        inStock: true,
        stockCount: 150,
        sizes: [],
        colors: [],
        images: [
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Fiction"
    },

    11: {
        id: 11,
        title: "The Mindful Entrepreneur",
        brand: "HarperCollins",
        category: "Books",
        price: 349,
        mrp: 499,
        discountPercent: 30,
        rating: 4.5,
        reviewCount: 631,
        description:
            "A practical guide blending mindfulness practices with startup strategy for founders seeking balance.",
        highlights: [
            "Practical exercises in every chapter",
            "Written by a serial founder",
            "Paperback, 280 pages",
            "Includes downloadable workbook"
        ],
        specifications: {
            "Format": "Paperback",
            "Pages": "280",
            "Language": "English",
            "Publisher": "HarperCollins",
            "ISBN": "978-0-06-345678-9"
        },
        inStock: true,
        stockCount: 163,
        sizes: [],
        colors: [],
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Non-Fiction"
    },

    12: {
        id: 12,
        title: "Adventures of the Lost Kingdom",
        brand: "Scholastic",
        category: "Books",
        price: 249,
        mrp: 349,
        discountPercent: 29,
        rating: 4.7,
        reviewCount: 1204,
        description:
            "A vivid children's fantasy adventure following three siblings who discover a hidden magical realm.",
        highlights: [
            "Illustrated on every page",
            "Ages 8-12",
            "Paperback, 190 pages",
            "Part of a 5-book series"
        ],
        specifications: {
            "Format": "Paperback",
            "Pages": "190",
            "Language": "English",
            "Publisher": "Scholastic",
            "ISBN": "978-0-545-11223-4"
        },
        inStock: true,
        stockCount: 176,
        sizes: [],
        colors: [],
        images: [
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1584990347449-a2d4c3ba2e1a?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Kids"
    },

    13: {
        id: 13,
        title: "Non-Stick Induction Cookware Set",
        brand: "Prestige",
        category: "Home & Kitchen",
        price: 1799,
        mrp: 2999,
        discountPercent: 40,
        rating: 4.4,
        reviewCount: 2871,
        description:
            "5-piece non-stick cookware set compatible with induction and gas stovetops, includes tawa, kadhai & sauce pan.",
        highlights: [
            "Induction & gas compatible",
            "5-piece set",
            "Food-grade non-stick coating",
            "Soft-touch handles"
        ],
        specifications: {
            "Material": "Aluminium with Non-Stick Coating",
            "Pieces": "5",
            "Compatibility": "Induction, Gas",
            "Warranty": "2 Years"
        },
        inStock: true,
        stockCount: 189,
        sizes: [],
        colors: ["Black"],
        images: [
            "https://images.unsplash.com/photo-1584990347449-a2d4c3ba2e1a?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Best Seller"
    },

    14: {
        id: 14,
        title: "Thermosteel Insulated Water Bottle",
        brand: "Milton",
        category: "Home & Kitchen",
        price: 599,
        mrp: 899,
        discountPercent: 33,
        rating: 4.6,
        reviewCount: 6532,
        description:
            "Double-wall vacuum insulated stainless steel bottle that keeps beverages hot for 12 hours and cold for 24 hours.",
        highlights: [
            "24-hour cold / 12-hour hot retention",
            "Leak-proof design",
            "BPA-free",
            "Rust-resistant body"
        ],
        specifications: {
            "Material": "Stainless Steel",
            "Capacity": "1 Litre",
            "Insulation": "Double Wall Vacuum",
            "Warranty": "1 Year"
        },
        inStock: true,
        stockCount: 22,
        sizes: ["500ml", "1L"],
        colors: ["Steel", "Blue", "Green"],
        images: [
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Top Rated"
    },

    15: {
        id: 15,
        title: "Air Fryer HD9200",
        brand: "Philips",
        category: "Home & Kitchen",
        price: 6495,
        mrp: 8995,
        discountPercent: 28,
        rating: 4.5,
        reviewCount: 4210,
        description:
            "Rapid air technology fryer that cooks with up to 90% less fat, perfect for healthier everyday meals.",
        highlights: [
            "Rapid Air Technology",
            "4.1L capacity",
            "Dishwasher-safe parts",
            "Digital touch panel"
        ],
        specifications: {
            "Capacity": "4.1 Litres",
            "Power": "1400W",
            "Timer": "60 min with auto shut-off",
            "Warranty": "2 Years"
        },
        inStock: true,
        stockCount: 35,
        sizes: [],
        colors: ["Black"],
        images: [
            "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Trending"
    },

    16: {
        id: 16,
        title: "Handloom Cotton Bedsheet Set",
        brand: "Fabindia",
        category: "Home & Kitchen",
        price: 1199,
        mrp: 1799,
        discountPercent: 33,
        rating: 4.3,
        reviewCount: 987,
        description:
            "Breathable pure cotton double bedsheet with two matching pillow covers, handwoven in traditional patterns.",
        highlights: [
            "100% pure cotton",
            "Includes 2 pillow covers",
            "Handwoven traditional print",
            "Machine washable"
        ],
        specifications: {
            "Fabric": "Cotton",
            "Size": "Double (90x100 in)",
            "Thread Count": "220 TC",
            "Wash Care": "Machine Wash"
        },
        inStock: true,
        stockCount: 48,
        sizes: ["Double"],
        colors: ["Indigo Print", "Rust Print"],
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "New Arrival"
    },

    17: {
        id: 17,
        title: "Vitamin C Face Serum",
        brand: "Mamaearth",
        category: "Beauty",
        price: 499,
        mrp: 699,
        discountPercent: 29,
        rating: 4.4,
        reviewCount: 9821,
        description:
            "Brightening face serum with Vitamin C and Turmeric that reduces dark spots and evens skin tone.",
        highlights: [
            "With Vitamin C & Turmeric",
            "Reduces dark spots",
            "Non-sticky, fast absorbing",
            "No parabens, no sulphates"
        ],
        specifications: {
            "Skin Type": "All Skin Types",
            "Volume": "30ml",
            "Key Ingredient": "Vitamin C",
            "Cruelty Free": "Yes"
        },
        inStock: true,
        stockCount: 61,
        sizes: ["30ml"],
        colors: [],
        images: [
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1512207736890-6ffed4b64fdf?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Best Seller"
    },

    18: {
        id: 18,
        title: "Matte Liquid Lipstick",
        brand: "Nykaa",
        category: "Beauty",
        price: 349,
        mrp: 499,
        discountPercent: 30,
        rating: 4.5,
        reviewCount: 15234,
        description:
            "Long-lasting transfer-proof matte liquid lipstick with a lightweight, comfortable finish.",
        highlights: [
            "Transfer-proof formula",
            "Matte finish",
            "Lasts up to 8 hours",
            "Enriched with Vitamin E"
        ],
        specifications: {
            "Volume": "3.5ml",
            "Finish": "Matte",
            "Wear Time": "8 Hours",
            "Cruelty Free": "Yes"
        },
        inStock: true,
        stockCount: 74,
        sizes: [],
        colors: ["Rustic Red", "Nude Brown", "Coral Pink"],
        images: [
            "https://images.unsplash.com/photo-1512207736890-6ffed4b64fdf?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Trending"
    },

    19: {
        id: 19,
        title: "Sandalwood Luxury Soap",
        brand: "Forest Essentials",
        category: "Beauty",
        price: 425,
        mrp: 550,
        discountPercent: 23,
        rating: 4.7,
        reviewCount: 2145,
        description:
            "Handcrafted luxury bathing bar infused with pure sandalwood oil for naturally soft, fragrant skin.",
        highlights: [
            "Pure sandalwood oil",
            "Handcrafted in small batches",
            "Free from synthetic fragrance",
            "Ayurvedic formulation"
        ],
        specifications: {
            "Weight": "125g",
            "Skin Type": "All Skin Types",
            "Key Ingredient": "Sandalwood Oil"
        },
        inStock: true,
        stockCount: 87,
        sizes: ["125g"],
        colors: [],
        images: [
            "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Top Rated"
    },

    20: {
        id: 20,
        title: "Onion Black Seed Hair Oil",
        brand: "Wow Skin Science",
        category: "Beauty",
        price: 349,
        mrp: 599,
        discountPercent: 42,
        rating: 4.3,
        reviewCount: 11890,
        description:
            "Nourishing hair oil blend with onion and black seed extract that strengthens roots and reduces hair fall.",
        highlights: [
            "Reduces hair fall",
            "With Onion & Black Seed extract",
            "No mineral oil, no parabens",
            "Suitable for all hair types"
        ],
        specifications: {
            "Volume": "200ml",
            "Hair Type": "All Hair Types",
            "Key Ingredient": "Onion Extract"
        },
        inStock: true,
        stockCount: 100,
        sizes: ["200ml"],
        colors: [],
        images: [
            "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Best Seller"
    },

    21: {
        id: 21,
        title: "Anti-Slip Yoga Mat",
        brand: "Decathlon",
        category: "Sports & Fitness",
        price: 799,
        mrp: 1199,
        discountPercent: 33,
        rating: 4.5,
        reviewCount: 7642,
        description:
            "6mm thick anti-slip yoga mat with superior cushioning, ideal for yoga, pilates and floor workouts.",
        highlights: [
            "Anti-slip textured surface",
            "6mm cushioned thickness",
            "Lightweight & foldable",
            "Includes carry strap"
        ],
        specifications: {
            "Material": "TPE Foam",
            "Thickness": "6mm",
            "Dimensions": "183 x 61 cm",
            "Weight": "1kg"
        },
        inStock: true,
        stockCount: 113,
        sizes: ["6mm", "8mm"],
        colors: ["Purple", "Teal", "Grey"],
        images: [
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Best Seller"
    },

    22: {
        id: 22,
        title: "Adjustable Dumbbell Set (20kg)",
        brand: "Boldfit",
        category: "Sports & Fitness",
        price: 2499,
        mrp: 3999,
        discountPercent: 38,
        rating: 4.4,
        reviewCount: 1893,
        description:
            "Space-saving adjustable dumbbell pair with quick-lock mechanism, adjustable from 2.5kg to 20kg total.",
        highlights: [
            "Adjustable 2.5kg - 20kg",
            "Quick-lock plate system",
            "Rubber coated grip",
            "Compact storage tray included"
        ],
        specifications: {
            "Total Weight": "20kg (pair)",
            "Material": "Cast Iron with Rubber Coating",
            "Adjustment": "Dial-based"
        },
        inStock: true,
        stockCount: 126,
        sizes: [],
        colors: ["Black/Red"],
        images: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Trending"
    },

    23: {
        id: 23,
        title: "Men's Running Shoes",
        brand: "Puma",
        category: "Sports & Fitness",
        price: 2199,
        mrp: 3499,
        discountPercent: 37,
        rating: 4.4,
        reviewCount: 4567,
        description:
            "Lightweight mesh running shoes with cushioned midsole and reinforced heel support for daily runs.",
        highlights: [
            "Breathable mesh upper",
            "Cushioned EVA midsole",
            "Reinforced heel support",
            "Durable rubber outsole"
        ],
        specifications: {
            "Upper Material": "Mesh",
            "Sole": "Rubber",
            "Closure": "Lace-up",
            "Use": "Running, Training"
        },
        inStock: true,
        stockCount: 139,
        sizes: ["6", "7", "8", "9", "10", "11"],
        colors: ["Black/White", "Blue/Grey"],
        images: [
            "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "New Arrival"
    },

    24: {
        id: 24,
        title: "Resistance Bands Set (5 Levels)",
        brand: "Boldfit",
        category: "Sports & Fitness",
        price: 599,
        mrp: 999,
        discountPercent: 40,
        rating: 4.3,
        reviewCount: 3298,
        description:
            "Set of 5 latex resistance bands with varying tension levels, ideal for strength training and rehab workouts.",
        highlights: [
            "5 resistance levels",
            "Natural latex material",
            "Includes carry pouch",
            "Ideal for home workouts"
        ],
        specifications: {
            "Material": "Natural Latex",
            "Levels": "5 (Light to Heavy)",
            "Includes": "Carry Pouch, Guide"
        },
        inStock: true,
        stockCount: 152,
        sizes: [],
        colors: ["Multicolor"],
        images: [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9,
            location: "Kerala, India"
        },
        tag: "Top Rated"
    }
};

// Convenience helper: fetch a single product's details by id, with a safe fallback.
export const getProductDetailsById = (id) =>
    mockProductDetails[id] || mockProductDetails[1];

// Backward-compatible default export (single product), matching the
// original structure you shared, for pages that don't pass an id yet.
export const mockProductData = mockProductDetails[1];

export default mockProductDetails;