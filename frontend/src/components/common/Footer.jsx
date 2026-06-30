import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Plus, Minus } from 'lucide-react';

export default function Footer() {
    const navigate = useNavigate();
    const [openSection, setOpenSection] = useState('marketplace');
    const { isAuthenticated } = useSelector((state) => state.auth);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const sections = {
        marketplace: {
            title: 'Shop Zmarket',
            links: [
                { label: 'All Products', path: '/products' },
                { label: 'Featured Stores', path: '/products' },
                { label: 'New Arrivals', path: '/products' },
                { label: 'Trending Tech', path: '/products' },
                { label: 'Fashion Hub', path: '/products' }
            ]
        },
        customer: {
            title: 'Customer Portal',
            links: [
                { label: 'My Dashboard', path: isAuthenticated ? '/orders' : '?auth=login' },
                { label: 'Track Order', path: isAuthenticated ? '/orders' : '?auth=login' },
                { label: 'Shopping Cart', path: '/cart' },
                { label: 'Purchase History', path: isAuthenticated ? '/orders' : '?auth=login' },
                { label: 'Profile Settings', path: '/checkout' }
            ]
        },
        vendor: {
            title: 'Vendor Solutions',
            links: [
                { label: 'Merchant Login', path: '?auth=login' },
                { label: 'Open a Store', path: '?auth=register' },
                { label: 'Analytics Dashboard', path: '/vendor/analytics' },
                { label: 'Inventory Tools', path: '/vendor/products' },
                { label: 'Seller Policy', path: '/vendor/dashboard' }
            ]
        },
        assistance: {
            title: 'Platform Support',
            links: [
                { label: 'Help Center', path: '/' },
                { label: 'Razorpay Systems', path: '/checkout' },
                { label: 'Shipping Info', path: '/checkout' },
                { label: 'Returns Policy', path: '/' },
                { label: 'Terms of Service', path: '/' }
            ]
        }
    };

    return (
        <footer className="w-full bg-[var(--bg-surface)] text-[var(--text-main)] font-mono border-t border-[var(--border-light)] select-none transition-colors duration-300">

            {/* Value Propositions Header Strip */}
            <div className="hidden lg:grid grid-cols-4 border-b border-[var(--border-light)] divide-x divide-[var(--border-light)] text-center text-[11px] tracking-wider uppercase py-8 px-4">
                <div>
                    <h4 className="font-bold mb-1 text-[var(--text-main)]">Secure Checkout</h4>
                    <p className="text-[var(--text-muted)] normal-case font-sans text-[12px]">Integrated with Razorpay<br />Cards, Netbanking & COD supported</p>
                </div>
                <div>
                    <h4 className="font-bold mb-1 text-[var(--text-main)]">Verified Vendors</h4>
                    <p className="text-[var(--text-muted)] normal-case font-sans text-[12px]">Shop with absolute trust<br />Direct from certified merchant hubs</p>
                </div>
                <div>
                    <h4 className="font-bold mb-1 text-[var(--text-main)]">Fast Fulfillment</h4>
                    <p className="text-[var(--text-muted)] normal-case font-sans text-[12px]">Real-time parcel tracking<br />From inventory shelves straight to your door</p>
                </div>
                <div>
                    <h4 className="font-bold mb-1 text-[var(--text-main)]">Platform Shield</h4>
                    <p className="text-[var(--text-muted)] normal-case font-sans text-[12px]">0 stress business infrastructure<br />Dedicated customer and vendor mediation</p>
                </div>
            </div>

            {/* Typography Branding Element Banner */}
            <div className="w-full overflow-hidden border-b border-[var(--border-light)] py-4 lg:py-6 px-4 flex justify-center items-center">
                <h1 onClick={() => navigate('/')} className="text-[17vw] font-bold tracking-[-0.04em] leading-none text-[var(--text-main)] font-sans lowercase select-none opacity-90 cursor-pointer hover:text-[var(--primary)] transition-colors">
                    zmarket
                </h1>
            </div>

            {/* Desktop Link Grid Infrastructure */}
            <div className="hidden lg:grid grid-cols-5 border-b border-[var(--border-light)]">
                <div className="col-span-1 p-8 border-r border-[var(--border-light)] flex flex-col justify-between min-h-[220px]">
                    <div>
                        <h3 className="text-[13px] font-bold uppercase tracking-wider mb-4 text-[var(--text-main)]">Join the Market</h3>
                        <div className="relative border-b border-[var(--text-muted)] pb-1 flex items-center">
                            <input type="email" placeholder="Subscribe to deal alerts..." className="w-full bg-transparent text-[13px] font-sans text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none" />
                            <button className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"><ArrowRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>

                {Object.entries(sections).map(([key, value]) => (
                    <div key={key} className="col-span-1 p-8 flex flex-col gap-4 text-left">
                        <h3 className="text-[12px] font-bold tracking-wider text-[var(--text-muted)] uppercase">{value.title}</h3>
                        <ul className="flex flex-col gap-2.5 text-[13px] font-sans font-normal text-[var(--text-main)]">
                            {value.links.map((link, i) => (
                                /* 🌟 FIX A: Swapped trailing broken tag back to cleanly close as li here */
                                <li key={i}>
                                    <button onClick={() => navigate(link.path)} className="hover:text-[var(--primary)] hover:underline text-left bg-transparent border-none p-0 cursor-pointer focus:outline-none transition-all">
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Mobile Accordions Links Interface Panel */}
            <div className="lg:hidden w-full divide-y divide-dashed divide-[var(--border-light)] px-4 border-b border-[var(--border-light)]">
                {Object.entries(sections).map(([key, value]) => {
                    const isOpen = openSection === key;
                    return (
                        <div key={key} className="w-full py-1">
                            <button type="button" onClick={() => toggleSection(key)} className="w-full py-4 flex items-center justify-between text-left font-sans text-[15px] text-[var(--text-main)]">
                                <span>{value.title}</span>
                                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                                <ul className="flex flex-col gap-3 pl-1 font-sans text-[14px]">
                                    {value.links.map((link, i) => (
                                        /* 🌟 FIX B: Swapped trailing broken tag back to cleanly close as li here too */
                                        <li key={i}>
                                            <button onClick={() => { navigate(link.path); setOpenSection(null); }} className="text-[var(--text-muted)] hover:text-[var(--primary)] text-left bg-transparent border-none p-0 cursor-pointer focus:outline-none">
                                                {link.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-full px-4 lg:px-8 py-6 text-[10px] tracking-widest text-[var(--text-muted)] uppercase text-left">
                © ZMARKET PLATFORM ECOSYSTEM 2026
            </div>
        </footer>
    );
}