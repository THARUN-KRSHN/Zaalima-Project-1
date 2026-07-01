import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import WishlistCard from '../../components/wishlist/WishlistCard';
import EmptyWishlist from '../../components/wishlist/EmptyWishlist';
import Breadcrumbs from '../../components/common/Breadcrumbs';

// 🌟 DATA SOURCE INTERFACE LOADER
import { CONFIG_WISHLIST_MODULE_DATA } from '../../data/wishlist';

export default function Wishlist({ isDarkMode, onToggleTheme }) {
    const navigate = useNavigate();
    const { labels, items: initialItems } = CONFIG_WISHLIST_MODULE_DATA;

    const [wishlistItems, setWishlistItems] = useState(initialItems);

    const handleRemoveItem = (id) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    const handleMoveToCart = (id) => {
        console.log(`Dispatched routing transaction. Migrating catalog node payload ID: ${id} to active order shopping cart layer.`);
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    return (
        <div className="w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col items-center select-none font-sans antialiased text-left selection:bg-[var(--primary)] selection:text-[var(--text-on-primary)]">
            <Navbar isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

            <main className="w-full max-w-[1280px] px-4 sm:px-8 lg:px-16 py-10 flex flex-col gap-6 flex-grow">
                <Breadcrumbs />

                {/* Upper Escape Path Wrapper Button */}
                <button
                    onClick={() => navigate('/products')}
                    className="w-fit text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-2 focus:outline-none transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{labels.continueShoppingText}</span>
                </button>

                {/* Header Branding Panel Column */}
                <div className="flex flex-col gap-1.5 max-w-2xl border-b border-[var(--border-light)] pb-5 w-full">
                    <h1 className="text-2xl sm:text-4xl font-black text-stone-950 dark:text-white tracking-tight">
                        {labels.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium leading-relaxed">
                        {labels.subtitle}
                    </p>
                </div>

                {/* Dynamic Content Grid Interface */}
                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-start animate-in fade-in duration-300">
                        {wishlistItems.map((item) => (
                            <WishlistCard
                                key={item.id}
                                item={item}
                                onRemove={() => handleRemoveItem(item.id)}
                                onMoveToCart={() => handleMoveToCart(item.id)}
                                labels={labels}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyWishlist onContinue={() => navigate('/products')} labels={labels} />
                )}
            </main>

            <Footer />
        </div>
    );
}