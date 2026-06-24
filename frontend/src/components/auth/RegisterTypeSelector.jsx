import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Store, ArrowRight } from 'lucide-react';

export default function RegisterTypeSelector() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Customer Option Card */}
            <button
                type="button"
                onClick={() => navigate('?auth=register_customer')}
                className="w-full p-5 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-light)] dark:hover:border-stone-700 rounded-2xl flex items-center justify-between text-left transition-all focus:outline-none cursor-pointer group shadow-sm hover:shadow-md"
            >
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-[var(--primary)] flex items-center justify-center border border-purple-500/10">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-extrabold text-stone-900 dark:text-white">Customer Account</h4>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Explore stores, save carts, and track order fulfillment paths.</p>
                    </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-transform group-hover:translate-x-1" />
            </button>

            {/* Vendor Option Card */}
            <button
                type="button"
                onClick={() => navigate('?auth=register_vendor')}
                className="w-full p-5 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-light)] dark:hover:border-stone-700 rounded-2xl flex items-center justify-between text-left transition-all focus:outline-none cursor-pointer group shadow-sm hover:shadow-md"
            >
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/10">
                        <Store className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-extrabold text-stone-900 dark:text-white">Merchant / Seller</h4>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Launch storefronts, manage matrices, and scale operations data.</p>
                    </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-amber-500 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="w-full text-center text-xs text-[var(--text-muted)] mt-4 font-medium">
                Already have an account?{' '}
                <button type="button" onClick={() => navigate('?auth=login')} className="text-[var(--primary)] font-bold hover:underline bg-transparent border-none p-0 focus:outline-none cursor-pointer">Sign In</button>
            </div>
        </div>
    );
}