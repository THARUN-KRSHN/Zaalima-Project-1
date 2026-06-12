import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

// --- PLATFORM INTERIOR SHARED LAYOUTS ---
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

// --- DAY 04 COMPONENT ATOMS ---
import CartItem from '../../components/cart/CartItem';
import CouponSection from '../../components/cart/CouponSection';
import CartSummary from '../../components/cart/CartSummary';
import EmptyCart from '../../components/cart/EmptyCart';

export default function Cart() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 1. Centralized Cart Repository State Array
    const [cartItems, setCartItems] = useState([
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
            quantity: 1,
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&auto=format&fit=crop&q=80"
        }
    ]);

    // 2. Coupon Applied Discount State Balance Tracker
    const [couponDiscount, setCouponDiscount] = useState(0);

    // 3. Functional Handler: Increment / Decrement Row Quantities safely
    const handleUpdateQuantity = (itemId, currentNewQty) => {
        setCartItems(prevItems =>
            prevItems.map(item => item.id === itemId ? { ...item, quantity: currentNewQty } : item)
        );
    };

    // 4. Functional Handler: Delete a listing cleanly from the UI flow array
    const handleRemoveItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    // 5. Functional Handler: Process promo values (Example target: ZMARKET50)
    const handleApplyCoupon = (submittedCode) => {
        if (submittedCode.toUpperCase() === 'ZMARKET50') {
            // Grants a direct flat rate discount clip parameter of ₹150
            setCouponDiscount(150);
        } else {
            alert("Invalid Promo Code! Try using 'ZMARKET50' to get a flat discount.");
        }
    };

    // 6. Reactive In-Memory Line item computations
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const estimatedTax = Math.round(subtotal * 0.05); // Standard 5% platform service tax metric

    // Shipping rules: Free delivery applies if total exceeds ₹1500 or cart holds nothing
    const shippingCharges = subtotal > 1500 || subtotal === 0 ? 0 : 50;

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between transition-colors duration-300`}>

            {/* --- CORE TOP NAVBAR SHELL CONTAINER --- */}
            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
            </header>

            {/* --- CENTRAL COMMERCE LAYOUT CANVAS --- */}
            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-8 flex-grow flex flex-col">
                {cartItems.length === 0 ? (
                    /* EMPTY CART STATE CASE: Triggered instantly if row inventory maps out to 0 */
                    <div className="flex-grow flex items-center justify-center">
                        <EmptyCart onContinueShopping={() => window.location.href = '/'} />
                    </div>
                ) : (
                    /* ACTIVE DATA RECONCILIATION STATE: Desktop 12-column grid system */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full text-left">

                        {/* LEFT ELEMENT GROUP: Line Item Tracks (Takes up 8 columns on large viewports) */}
                        <div className="w-full lg:col-span-8 flex flex-col">
                            <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-light)] pb-3">
                                <ShoppingBag className="w-5 h-5 text-[var(--primary)]" />
                                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a191e] dark:text-[#f4f5f7] tracking-tight">
                                    Shopping Bag ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                                </h2>
                            </div>

                            {/* Sequential map processing loop parsing operational rows */}
                            <div className="flex flex-col w-full">
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={handleUpdateQuantity}
                                        onRemove={handleRemoveItem}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* RIGHT ELEMENT GROUP: Ledger Pricing Bars (Takes up 4 columns on large viewports) */}
                        <div className="w-full lg:col-span-4 flex flex-col gap-4 lg:mt-14 sticky top-28">

                            {/* Promo Input Node */}
                            <CouponSection onApplyCoupon={handleApplyCoupon} />

                            {/* Total Pricing Sheet Output */}
                            <CartSummary
                                subtotal={subtotal}
                                tax={estimatedTax}
                                shipping={shippingCharges}
                                discount={couponDiscount}
                            />

                        </div>

                    </div>
                )}
            </main>

            {/* --- BASE INTERIOR PLATFORM ATTACHMENT HUB --- */}
            <Footer />
        </div>
    );
}