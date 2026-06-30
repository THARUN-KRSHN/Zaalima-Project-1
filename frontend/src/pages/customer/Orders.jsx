import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import OrderCard from '../../components/orders/OrderCard';

// 🌟 IMPORT CENTRALIZED MOCK DATABASE LAYER
import { CONFIG_ORDER_MODULE_DATA } from '../../data/orders';

export default function Orders({ isDarkMode, onToggleTheme }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const { labels, statusFilters, items } = CONFIG_ORDER_MODULE_DATA;

    const processedOrders = items.filter((order) => {
        const matchesStatus = activeFilter === 'all' || order.status === activeFilter;
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.productItems.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col items-center select-none font-sans antialiased text-left">
            <Navbar isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

            <main className="w-full max-w-[1280px] px-4 sm:px-8 lg:px-16 py-10 flex flex-col gap-8 flex-grow">
                <button onClick={() => navigate('/products')} className="w-fit text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-2 focus:outline-none transition-colors cursor-pointer">
                    <ArrowLeft className="w-4 h-4" />
                    <span>{labels.backActionLabel}</span>
                </button>

                <div className="flex flex-col gap-1.5 max-w-2xl">
                    <h1 className="text-2xl sm:text-4xl font-black text-stone-950 dark:text-white">{labels.title}</h1>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">{labels.subtitle}</p>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border-b border-[var(--border-light)] pb-6 mt-2">
                    <div className="relative flex-grow max-w-xl h-11">
                        <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-3.5 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={labels.searchPlaceholder}
                            className="w-full h-full pl-11 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
                        />
                    </div>
                    <div className="text-[10px] font-mono uppercase font-bold text-[var(--text-muted)] flex items-center gap-1.5 justify-end shrink-0">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>{labels.recordsCountLabel} {processedOrders.length}</span>
                    </div>
                </div>

                <div className="w-full flex items-center overflow-x-auto gap-2 pb-1 border-b border-[var(--border-light)]/60 scrollbar-none">
                    {statusFilters.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveFilter(tab.key)}
                            className={`h-9 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all focus:outline-none cursor-pointer ${activeFilter === tab.key ? 'bg-[var(--primary)] text-[var(--text-on-primary)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="w-full flex flex-col gap-4">
                    {processedOrders.length > 0 ? (
                        processedOrders.map((order) => (
                            /* 🌟 REUSABLE ATOMIC CARD INJECTED */
                            <OrderCard
                                key={order.id}
                                order={order}
                                onClick={() => navigate(`/orders/${order.id}`)}
                                labels={labels}
                            />
                        ))
                    ) : (
                        <div className="w-full py-16 text-center border border-dashed border-[var(--border-light)] rounded-2xl font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-surface)]/20">
                            {labels.emptyFeedMsg}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}