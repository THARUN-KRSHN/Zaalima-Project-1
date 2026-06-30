import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Store, FileText, XCircle } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

// 🌟 IMPORT NEW ATOMIC COMPONENTS + GLOBAL DATA
import { CONFIG_ORDER_MODULE_DATA } from '../../data/orders';
import OrderStatusBadge from '../../components/orders/OrderStatusBadge';
import Timeline from '../../components/orders/Timeline';
import InvoiceCard from '../../components/orders/InvoiceCard';

export default function OrderDetails({ isDarkMode, onToggleTheme }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const { labels, items } = CONFIG_ORDER_MODULE_DATA;

    // Find matching order object from shared array layer or fallback cleanly
    const currentOrder = items.find(item => item.id === id) || items[0];

    return (
        <div className="w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col items-center select-none font-sans antialiased text-left">
            <Navbar isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

            <main className="w-full max-w-[1280px] px-4 sm:px-8 lg:px-16 py-10 flex flex-col gap-6 flex-grow">
                <button onClick={() => navigate('/orders')} className="w-fit text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-2 focus:outline-none transition-colors cursor-pointer">
                    <ArrowLeft className="w-4 h-4" />
                    <span>{labels.backToLedgerLabel}</span>
                </button>

                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-5">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono font-bold uppercase text-[var(--primary)]">{labels.headerCategory}</span>
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-xl sm:text-2xl font-black text-stone-950 dark:text-white font-mono">{currentOrder.id}</h1>
                            {/* 🌟 REUSABLE BADGE */}
                            <OrderStatusBadge status={currentOrder.status} statusLabel={currentOrder.statusLabel} />
                        </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl text-[var(--text-muted)] shadow-sm w-fit">
                        {labels.metaRegisteredLabel}: {currentOrder.date} @ {currentOrder.time}
                    </span>
                </div>

                <div className="w-full flex flex-col sm:flex-row items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-light)] p-3 rounded-2xl shadow-sm">
                    <button className="w-full sm:w-auto h-10 px-5 bg-stone-900 text-white dark:bg-white dark:text-stone-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"><FileText className="w-4 h-4" /><span>{labels.invoiceBtnText}</span></button>
                    <button className="w-full sm:w-auto h-10 px-5 text-rose-500 border border-rose-500/20 font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"><XCircle className="w-4 h-4" /><span>{labels.cancelBtnText}</span></button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start mt-2">
                    <div className="lg:col-span-2 flex flex-col gap-6 w-full">
                        <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
                            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[var(--text-muted)] flex items-center gap-2 border-b border-[var(--border-light)]/40 pb-3">
                                <Store className="w-4 h-4 text-[var(--primary)]" /><span>{labels.tenantSplitText}</span>
                            </h3>
                            <div className="w-full flex flex-col divide-y divide-[var(--border-light)]/50">
                                {currentOrder.merchants.map((merchant) => (
                                    <div key={merchant.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[10px] font-mono uppercase font-bold text-[var(--primary)]">{merchant.storeName}</span>
                                            <h4 className="text-xs sm:text-sm font-extrabold text-stone-950 dark:text-white">{merchant.itemName}</h4>
                                            <span className="text-[10px] text-[var(--text-muted)] font-bold font-mono">{labels.qtyText} {merchant.qty}</span>
                                        </div>
                                        <span className="text-xs font-bold text-stone-950 dark:text-white font-mono shrink-0 mt-4">{merchant.calculatedPrice}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 🌟 REUSABLE TIMELINE */}
                        <Timeline logs={currentOrder.timeline} sectionHeaderLabel={labels.timelineHeader} />
                    </div>

                    <div className="flex flex-col gap-6 w-full">
                        <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-6 flex flex-col gap-3 shadow-sm">
                            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[var(--primary)]" /><span>{labels.logisticsHeader}</span>
                            </h3>
                            <p className="text-xs text-[var(--text-main)] leading-relaxed font-medium bg-[var(--bg-main)] p-4 border border-[var(--border-light)]/40 rounded-xl">{currentOrder.address}</p>
                        </div>

                        {/* 🌟 REUSABLE INVOICE SUMMARY */}
                        <InvoiceCard financials={currentOrder.financials} paymentMethod={currentOrder.paymentMethod} labels={labels} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}