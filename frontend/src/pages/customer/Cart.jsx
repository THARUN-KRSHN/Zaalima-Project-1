import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';

// --- PLATFORM INTERIOR SHARED LAYOUTS ---
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';

// --- DAY 04 COMPONENT ATOMS ---
import CartItem from '../../components/cart/CartItem';
import CouponSection from '../../components/cart/CouponSection';
import CartSummary from '../../components/cart/CartSummary';
import EmptyCart from '../../components/cart/EmptyCart';

// --- CENTRALIZED MOCK DATA ---
import { cartItems as initialCartItems } from '../../data/cartData';

export default function Cart() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [cartItems, setCartItems] = useState(initialCartItems);

    const [couponDiscount, setCouponDiscount] = useState(0);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

    const triggerToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, isVisible: false }));
        }, 3000);
    };

    const handleUpdateQuantity = (itemId, currentNewQty) => {
        setCartItems(prevItems =>
            prevItems.map(item => item.id === itemId ? { ...item, quantity: currentNewQty } : item)
        );
    };

    const handleRemoveItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        triggerToast("Item removed from shopping bag", "info");
    };

    const handleApplyCoupon = (submittedCode) => {
        if (submittedCode.toUpperCase() === 'ZMARKET50') {
            setCouponDiscount(150);
            triggerToast("Coupon 'ZMARKET50' applied! You saved ₹150.", "success");
        } else {
            triggerToast("Invalid promo code! Please check and try again.", "error");
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const estimatedTax = Math.round(subtotal * 0.05);
    const shippingCharges = subtotal > 1500 || subtotal === 0 ? 0 : 50;

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between transition-colors duration-300 relative`}>

            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
            </header>

            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-8 flex-grow flex flex-col justify-center">
                {loading ? (
                    <Loader variant="spinner" />
                ) : cartItems.length === 0 ? (
                    <div className="flex-grow flex items-center justify-center">
                        <EmptyCart onContinueShopping={() => window.location.href = '/'} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full text-left animate-in fade-in duration-300">
                        {/* LEFT: Line Item List */}
                        <div className="w-full lg:col-span-8 flex flex-col">
                            <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-light)] pb-3">
                                <ShoppingBag className="w-5 h-5 text-[var(--primary)]" />
                                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a191e] dark:text-[#f4f5f7] tracking-tight">
                                    Shopping Bag ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                                </h2>
                            </div>

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

                        {/* RIGHT: Totals Sidebar Ledger */}
                        <div className="w-full lg:col-span-4 flex flex-col gap-4 lg:mt-14 sticky top-28">
                            <CouponSection onApplyCoupon={handleApplyCoupon} />
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

            {/* FLOATING SYSTEM TOAST HUB */}
            <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md p-4 rounded-xl border shadow-xl flex items-center justify-between gap-3 transition-all duration-300 transform backdrop-blur-md
                ${toast.isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'}
                ${toast.type === 'success' ? 'bg-emerald-500/95 border-emerald-600 text-white' : ''}
                ${toast.type === 'error' ? 'bg-rose-500/95 border-rose-600 text-white' : ''}
                ${toast.type === 'info' ? 'bg-[#1a191e]/95 border-stone-800 text-white dark:bg-[#f4f5f7]/95 dark:text-stone-900' : ''}
            `}>
                <div className="flex items-center gap-2.5 text-left">
                    <CheckCircle className={`w-5 h-5 shrink-0 ${toast.type === 'info' ? 'text-[var(--primary)]' : 'text-white'}`} />
                    <p className="text-xs sm:text-sm font-bold tracking-tight leading-snug">
                        {toast.message}
                    </p>
                </div>
                <button
                    onClick={() => setToast(prev => ({ ...prev, isVisible: false }))}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <Footer />
        </div>
    );
}