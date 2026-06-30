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

        console.log('Database Seeding Completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error(`Seeding Failed: ${error.message}`);
        process.exit(1);
    }
};

seedData();
