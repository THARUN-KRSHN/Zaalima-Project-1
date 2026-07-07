import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
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
        console.log('Database Connected for seeding...');

        
        await User.deleteMany();
        await Store.deleteMany();
        await Product.deleteMany();
        await Cart.deleteMany();
        await Order.deleteMany();
        await CheckoutSession.deleteMany();
        console.log('Cleared existing database records.');

        
        const vendorUser = new User({
            fullName: 'Tharun Krishna',
            email: 'vendor@zaalima.com',
            password: 'password123', 
            role: 'vendor'
        });

        
        const store = await Store.create({
            storeName: 'Zaalima Premium Hub',
            ownerName: 'Tharun Krishna',
            email: 'vendor@zaalima.com',
            gstNumber: '32AAAAA0000A1Z1',
            storeAddress: '401, Cheloorkavu Temple Road, Irinjalakuda, Kerala - 680121',
            owner: vendorUser._id
        });

        vendorUser.vendorStore = store._id;
        await vendorUser.save();
        console.log('Seeded Vendor Owner & Store Profiles.');

        
        const customerUser = await User.create({
            fullName: 'Aleena Manoj',
            email: 'customer@zaalima.com',
            password: 'password123',
            phone: '9778585423',
            role: 'customer'
        });

        
        await Cart.create({ user: customerUser._id, items: [] });
        console.log('Seeded Customer & Shopping Cart Profiles.');

        
        const productsList = [
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
            }
        ];

        
        const mappedProducts = productsList.map(prod => ({
            ...prod,
            price: Math.round(prod.price * 100), 
            vendor: vendorUser._id
        }));

        await Product.insertMany(mappedProducts);
        console.log('Seeded Products catalog.');

        
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
                items: [
                    {
                        product: dbProducts[0]._id,
                        title: dbProducts[0].title,
                        quantity: 1,
                        price: dbProducts[0].price,
                        vendor: vendorUser._id
                    }
                ],
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
                items: [
                    {
                        product: dbProducts[1]._id,
                        title: dbProducts[1].title,
                        quantity: 2,
                        price: dbProducts[1].price,
                        vendor: vendorUser._id
                    }
                ],
                shippingAddress,
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                orderStatus: 'PROCESSING',
                pricingSummary: {
                    subtotal: dbProducts[1].price * 2,
                    discount: 0,
                    tax: Math.round(dbProducts[1].price * 2 * 0.05),
                    shipping: 0,
                    total: dbProducts[1].price * 2 + Math.round(dbProducts[1].price * 2 * 0.05)
                },
                createdAt: new Date(currentYear, 1, 14) 
            },
            {
                orderId: 'ZMK-1258-05',
                customer: customerUser._id,
                items: [
                    {
                        product: dbProducts[2]._id,
                        title: dbProducts[2].title,
                        quantity: 1,
                        price: dbProducts[2].price,
                        vendor: vendorUser._id
                    }
                ],
                shippingAddress,
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                orderStatus: 'DELIVERED',
                pricingSummary: {
                    subtotal: dbProducts[2].price,
                    discount: 0,
                    tax: Math.round(dbProducts[2].price * 0.05),
                    shipping: 0,
                    total: dbProducts[2].price + Math.round(dbProducts[2].price * 0.05)
                },
                createdAt: new Date(currentYear, 2, 12) 
            },
            {
                orderId: 'ZMK-0583-92',
                customer: customerUser._id,
                items: [
                    {
                        product: dbProducts[3]._id,
                        title: dbProducts[3].title,
                        quantity: 1,
                        price: dbProducts[3].price,
                        vendor: vendorUser._id
                    }
                ],
                shippingAddress,
                paymentMethod: 'cod',
                paymentStatus: 'PENDING',
                orderStatus: 'PLACED',
                pricingSummary: {
                    subtotal: dbProducts[3].price,
                    discount: 0,
                    tax: Math.round(dbProducts[3].price * 0.05),
                    shipping: 5000,
                    total: dbProducts[3].price + Math.round(dbProducts[3].price * 0.05) + 5000
                },
                createdAt: new Date(currentYear, 3, 10) 
            },
            {
                orderId: 'ZMK-7721-04',
                customer: customerUser._id,
                items: [
                    {
                        product: dbProducts[4]._id,
                        title: dbProducts[4].title,
                        quantity: 1,
                        price: dbProducts[4].price,
                        vendor: vendorUser._id
                    }
                ],
                shippingAddress,
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                orderStatus: 'DELIVERED',
                pricingSummary: {
                    subtotal: dbProducts[4].price,
                    discount: 0,
                    tax: Math.round(dbProducts[4].price * 0.05),
                    shipping: 5000,
                    total: dbProducts[4].price + Math.round(dbProducts[4].price * 0.05) + 5000
                },
                createdAt: new Date(currentYear, 4, 8) 
            }
        ];

        await Order.insertMany(mockOrders);
        console.log('Seeded Order ledger records for testing.');

        console.log('Database Seeding Completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error(`Seeding Failed: ${error.message}`);
        process.exit(1);
    }
};

seedData();
