import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Store from '../models/Store.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import CheckoutSession from '../models/CheckoutSession.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Database connected for seeding...');

        // Clear existing data
        await Promise.all([
            User.deleteMany(),
            Store.deleteMany(),
            Product.deleteMany(),
            Cart.deleteMany(),
            Order.deleteMany(),
            CheckoutSession.deleteMany()
        ]);
        console.log('🧹 Cleared existing database records.');

        // ================================================================
        // 1. ADMIN USER
        // ================================================================
        const adminUser = await User.create({
            fullName: 'Zmarket Admin',
            email: 'admin@zaalima.com',
            password: 'password123',
            role: 'superadmin',
            isVerified: true
        });
        console.log('👑 Seeded Admin user.');

        // ================================================================
        // 2. VENDOR USER + STORE
        // ================================================================
        const vendorUser = new User({
            fullName: 'Tharun Krishna',
            email: 'vendor@zaalima.com',
            password: 'password123',
            phone: '9876543210',
            role: 'vendor',
            isVerified: true
        });

        const store = await Store.create({
            storeName: 'Zaalima Premium Hub',
            ownerName: 'Tharun Krishna',
            email: 'vendor@zaalima.com',
            gstNumber: '32AAAAA0000A1Z1',
            storeAddress: '401, Cheloorkavu Temple Road, Irinjalakuda, Kerala - 680121',
            owner: vendorUser._id,
            isApproved: true,
            status: 'active'
        });

        vendorUser.vendorStore = store._id;
        await vendorUser.save();
        console.log('🏪 Seeded Vendor owner & store.');

        // ================================================================
        // 3. CUSTOMER USER + CART
        // ================================================================
        const customerUser = await User.create({
            fullName: 'Aleena Manoj',
            email: 'customer@zaalima.com',
            password: 'password123',
            phone: '9778585423',
            role: 'customer',
            isVerified: true,
            addresses: [
                {
                    name: 'Aleena Manoj',
                    phone: '9778585423',
                    addressLine1: '401, Cheloorkavu Temple Road',
                    addressLine2: 'Temple Road',
                    city: 'Irinjalakuda',
                    state: 'Kerala',
                    pincode: '680121',
                    country: 'India',
                    isDefault: true
                }
            ]
        });

        await Cart.create({ user: customerUser._id, items: [] });
        console.log('🛍️ Seeded Customer user & cart.');

        // ================================================================
        // 4. PRODUCTS (multiple categories)
        // ================================================================
        const productsList = [
            // Fashion
            {
                title: 'Anarkali Kurta Set',
                brand: 'Zaalima Premium Hub',
                category: 'Fashion',
                description: 'Women Viscose Rayon Anarkali Kurta, Palazzo & Premium Dupatta Set.',
                image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60',
                rating: 4.4,
                reviewCount: 1374,
                price: 898,
                stock: 14,
                tag: 'Best Seller'
            },
            {
                title: 'Floral Print Kurta',
                brand: 'Oumad',
                category: 'Fashion',
                description: 'Traditional refined handwoven Floral Print Kurta, crisp Palazzo & complete Dupatta Set.',
                image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60',
                rating: 4.1,
                reviewCount: 23025,
                price: 583,
                stock: 22,
                tag: 'Top Rated'
            },
            {
                title: 'Casual Denim Jacket',
                brand: 'Roadster',
                category: 'Fashion',
                description: 'Classic denim jacket with a modern fit, perfect for casual outings.',
                image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&auto=format&fit=crop&q=60',
                rating: 4.2,
                reviewCount: 5231,
                price: 999,
                stock: 18,
                tag: 'Trending'
            },
            // Electronics
            {
                title: 'Vyb Diva Wristwatch',
                brand: 'Fastrack',
                category: 'Electronics',
                description: 'Vyb Diva Premium Analog Wristwatch. Designed gracefully for modern women.',
                image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60',
                rating: 4.5,
                reviewCount: 314,
                price: 2046,
                stock: 3,
                tag: 'New Arrival'
            },
            {
                title: 'Galaxy M06 5G',
                brand: 'Samsung',
                category: 'Electronics',
                description: 'Blazing Black configuration featuring 128 GB & MediaTek Dimensity 6300 chipset.',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60',
                rating: 4.1,
                reviewCount: 2355,
                price: 12580,
                stock: 15,
                tag: 'Trending'
            },
            {
                title: 'Wireless Bluetooth Earbuds',
                brand: 'boAt',
                category: 'Electronics',
                description: 'boAt Airdopes 161 with 40 hours total playback, IPX4 water resistance.',
                image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
                rating: 4.3,
                reviewCount: 18420,
                price: 1299,
                stock: 32,
                tag: 'Best Seller'
            },
            {
                title: 'Smart LED TV 43"',
                brand: 'LG',
                category: 'Electronics',
                description: '43-inch 4K Smart LED TV with WebOS, built-in Alexa, and HDR support.',
                image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60',
                rating: 4.6,
                reviewCount: 4892,
                price: 34990,
                stock: 7,
                tag: 'Featured'
            },
            // Books
            {
                title: 'Classic History Atlas',
                brand: 'Oxford',
                category: 'Books',
                description: 'Detailed cartography maps, historical breakdowns, and educational global timelines.',
                image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500&auto=format&fit=crop&q=60',
                rating: 4.6,
                reviewCount: 182,
                price: 450,
                stock: 10,
                tag: 'Education'
            },
            {
                title: 'The Sci-Fi Odyssey',
                brand: 'Penguin',
                category: 'Books',
                description: 'A breathtaking epic space fictional novel following extra-galactic space travel frameworks.',
                image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60',
                rating: 4.8,
                reviewCount: 942,
                price: 299,
                stock: 8,
                tag: 'Fiction'
            },
            {
                title: 'Atomic Habits',
                brand: 'James Clear',
                category: 'Books',
                description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
                image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop&q=60',
                rating: 4.9,
                reviewCount: 54321,
                price: 399,
                stock: 50,
                tag: 'Best Seller'
            },
            // Home & Kitchen
            {
                title: 'Stainless Steel Cookware Set',
                brand: 'Prestige',
                category: 'Home & Kitchen',
                description: '5-piece induction-compatible stainless steel cookware set with glass lids.',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60',
                rating: 4.4,
                reviewCount: 3201,
                price: 2499,
                stock: 12,
                tag: 'Top Rated'
            },
            {
                title: 'Air Fryer 4.5L',
                brand: 'Philips',
                category: 'Home & Kitchen',
                description: 'Digital Air Fryer with Rapid Air technology, 90% less fat.',
                image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&auto=format&fit=crop&q=60',
                rating: 4.7,
                reviewCount: 7843,
                price: 6999,
                stock: 9,
                tag: 'New Arrival'
            },
            // Sports
            {
                title: 'Running Shoes Pro',
                brand: 'Nike',
                category: 'Sports',
                description: 'Lightweight running shoes with cushioned sole for maximum comfort.',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
                rating: 4.5,
                reviewCount: 12450,
                price: 4999,
                stock: 25,
                tag: 'Trending'
            },
            {
                title: 'Yoga Mat Premium',
                brand: 'Boldfit',
                category: 'Sports',
                description: 'Anti-slip 6mm thick yoga mat with carrying strap.',
                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60',
                rating: 4.3,
                reviewCount: 4521,
                price: 799,
                stock: 40,
                tag: 'Best Seller'
            },
            // Beauty
            {
                title: 'Skincare Essentials Kit',
                brand: 'Mamaearth',
                category: 'Beauty',
                description: 'Complete skincare kit with face wash, toner, moisturizer, and sunscreen.',
                image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60',
                rating: 4.4,
                reviewCount: 8932,
                price: 1299,
                stock: 35,
                tag: 'New Arrival'
            }
        ];

        const mappedProducts = productsList.map(prod => ({
            ...prod,
            price: Math.round(prod.price * 100), // convert to paise
            vendor: vendorUser._id
        }));

        await Product.insertMany(mappedProducts);
        console.log(`📦 Seeded ${mappedProducts.length} products across ${new Set(productsList.map(p => p.category)).size} categories.`);

        // ================================================================
        // 5. SAMPLE ORDERS
        // ================================================================
        const dbProducts = await Product.find({});

        const shippingAddress = {
            fullName: 'Aleena Manoj',
            phone: '9778585423',
            email: 'customer@zaalima.com',
            addressLine1: '401, Cheloorkavu Temple Road',
            addressLine2: 'Temple Road',
            city: 'Irinjalakuda',
            state: 'Kerala',
            pincode: '680121'
        };

        const currentYear = new Date().getFullYear();

        const mockOrders = [
            {
                orderId: 'ZMK-8941-11',
                customer: customerUser._id,
                items: [{
                    product: dbProducts[0]._id,
                    title: dbProducts[0].title,
                    quantity: 1,
                    price: dbProducts[0].price,
                    vendor: vendorUser._id
                }],
                shippingAddress,
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                orderStatus: 'SHIPPED',
                pricingSummary: {
                    subtotal: dbProducts[0].price,
                    discount: 0,
                    tax: Math.round(dbProducts[0].price * 0.05),
                    shipping: 5000,
                    total: dbProducts[0].price + Math.round(dbProducts[0].price * 0.05) + 5000
                },
                createdAt: new Date(currentYear, 0, 15)
            },
            {
                orderId: 'ZMK-2046-23',
                customer: customerUser._id,
                items: [{
                    product: dbProducts[3]._id,
                    title: dbProducts[3].title,
                    quantity: 2,
                    price: dbProducts[3].price,
                    vendor: vendorUser._id
                }],
                shippingAddress,
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                orderStatus: 'PROCESSING',
                pricingSummary: {
                    subtotal: dbProducts[3].price * 2,
                    discount: 0,
                    tax: Math.round(dbProducts[3].price * 2 * 0.05),
                    shipping: 0,
                    total: dbProducts[3].price * 2 + Math.round(dbProducts[3].price * 2 * 0.05)
                },
                createdAt: new Date(currentYear, 1, 14)
            },
            {
                orderId: 'ZMK-1258-05',
                customer: customerUser._id,
                items: [{
                    product: dbProducts[4]._id,
                    title: dbProducts[4].title,
                    quantity: 1,
                    price: dbProducts[4].price,
                    vendor: vendorUser._id
                }],
                shippingAddress,
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                orderStatus: 'DELIVERED',
                pricingSummary: {
                    subtotal: dbProducts[4].price,
                    discount: 0,
                    tax: Math.round(dbProducts[4].price * 0.05),
                    shipping: 0,
                    total: dbProducts[4].price + Math.round(dbProducts[4].price * 0.05)
                },
                createdAt: new Date(currentYear, 2, 12)
            },
            {
                orderId: 'ZMK-0583-92',
                customer: customerUser._id,
                items: [{
                    product: dbProducts[1]._id,
                    title: dbProducts[1].title,
                    quantity: 1,
                    price: dbProducts[1].price,
                    vendor: vendorUser._id
                }],
                shippingAddress,
                paymentMethod: 'cod',
                paymentStatus: 'PENDING',
                orderStatus: 'PLACED',
                pricingSummary: {
                    subtotal: dbProducts[1].price,
                    discount: 0,
                    tax: Math.round(dbProducts[1].price * 0.05),
                    shipping: 5000,
                    total: dbProducts[1].price + Math.round(dbProducts[1].price * 0.05) + 5000
                },
                createdAt: new Date(currentYear, 3, 10)
            },
            {
                orderId: 'ZMK-7721-04',
                customer: customerUser._id,
                items: [{
                    product: dbProducts[7]._id,
                    title: dbProducts[7].title,
                    quantity: 1,
                    price: dbProducts[7].price,
                    vendor: vendorUser._id
                }],
                shippingAddress,
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                orderStatus: 'DELIVERED',
                pricingSummary: {
                    subtotal: dbProducts[7].price,
                    discount: 0,
                    tax: Math.round(dbProducts[7].price * 0.05),
                    shipping: 5000,
                    total: dbProducts[7].price + Math.round(dbProducts[7].price * 0.05) + 5000
                },
                createdAt: new Date(currentYear, 4, 8)
            }
        ];

        await Order.insertMany(mockOrders);
        console.log('📝 Seeded order records.');

        console.log('\n✅ Database seeding completed successfully!');
        console.log('\n🔐 Test Accounts:');
        console.log('   Admin:    admin@zaalima.com    / password123');
        console.log('   Vendor:   vendor@zaalima.com   / password123');
        console.log('   Customer: customer@zaalima.com / password123\n');

        process.exit(0);
    } catch (error) {
        console.error(`❌ Seeding failed: ${error.message}`);
        console.error(error);
        process.exit(1);
    }
};

seedData();
