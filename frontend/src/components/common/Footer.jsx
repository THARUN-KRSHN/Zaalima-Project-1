import React, { useState } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';

export default function Footer() {
    const [openSection, setOpenSection] = useState('marketplace');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    // Organized arrays matching your precise Zmarket multi-vendor & customer pipelines
    const sections = {
        marketplace: {
            title: { en: 'Shop Zmarket' },
            links: ['All Products', 'Featured Stores', 'New Arrivals', 'Trending Tech', 'Fashion Hub']
        },
        customer: {
            title: { en: 'Customer Portal' },
            links: ['My Dashboard', 'Track Order', 'Shopping Cart', 'Purchase History', 'Profile Settings']
        },
        vendor: {
            title: { en: 'Vendor Solutions' },
            links: ['Merchant Login', 'Open a Store', 'Analytics Dashboard', 'Inventory Tools', 'Seller Policy']
        },
        assistance: {
            title: { en: 'Platform Support' },
            links: ['Help Center', 'Razorpay & Secure Payments', 'Shipping Info', 'Returns Policy', 'Terms of Service']
        }
    };

    return (
        <footer className="w-full bg-[var(--bg-surface)] text-[var(--text-main)] font-mono border-t border-[var(--border-light)] select-none transition-colors duration-300">

            {/* DESKTOP ONLY: ZMARKET VALUE PROPS ROW */}
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

            {/* MOBILE ONLY: TOP SOCIALS BAR */}
            <div className="lg:hidden flex items-center gap-4 p-6 pb-2">
                <a href="#instagram" className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors" aria-label="Instagram">
                    <svg className="w-5 h-5 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </a>
                <a href="#facebook" className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors" aria-label="Facebook">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                </a>
            </div>

            {/* GIANT MARQUEE TYPOGRAPHY: REBRANDED TO ZMARKET */}
            <div className="w-full overflow-hidden border-b border-[var(--border-light)] py-4 lg:py-6 px-4 flex justify-center items-center">
                <h1 className="text-[17vw] font-bold tracking-[-0.04em] leading-none text-[var(--text-main)] font-sans lowercase select-none opacity-90">
                    zmarket
                </h1>
            </div>

            {/* DESKTOP MAIN LINK SECTIONS GRID */}
            <div className="hidden lg:grid grid-cols-5 border-b border-[var(--border-light)]">
                {/* Leftmost Newsletter Target Box */}
                <div className="col-span-1 p-8 border-r border-[var(--border-light)] flex flex-col justify-between min-h-[220px]">
                    <div>
                        <h3 className="text-[13px] font-bold uppercase tracking-wider mb-4 text-[var(--text-main)]">Join the Market</h3>
                        <div className="relative border-b border-[var(--text-muted)] pb-1 flex items-center">
                            <input
                                type="email"
                                placeholder="Subscribe to deal alerts..."
                                className="w-full bg-transparent text-[13px] font-sans text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none"
                            />
                            <button className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors" aria-label="Subscribe">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-tight block mt-3">Get real-time stock notifications</span>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <a href="#instagram" className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors" aria-label="Instagram">
                            <svg className="w-[18px] h-[18px] stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="#facebook" className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors" aria-label="Facebook">
                            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Looping across Zmarket flow segments */}
                {Object.entries(sections).map(([key, value]) => (
                    <div key={key} className="col-span-1 p-8 flex flex-col gap-4 text-left">
                        <h3 className="text-[12px] font-bold tracking-wider text-[var(--text-muted)] uppercase">{value.title.en}</h3>
                        <ul className="flex flex-col gap-2.5 text-[13px] font-sans font-normal text-[var(--text-main)]">
                            {value.links.map((link, i) => (
                                <li key={i}>
                                    <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[var(--primary)] hover:underline underline-offset-4 decoration-[var(--primary)] transition-all">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* MOBILE ONLY: INTERACTIVE ACCORDIONS DROPDOWNS */}
            <div className="lg:hidden w-full divide-y divide-dashed divide-[var(--border-light)] px-4 border-b border-[var(--border-light)]">
                {Object.entries(sections).map(([key, value]) => {
                    const isOpen = openSection === key;
                    return (
                        <div key={key} className="w-full py-1">
                            <button
                                type="button"
                                onClick={() => toggleSection(key)}
                                className="w-full py-4 flex items-center justify-between text-left font-sans text-[15px] font-normal text-[var(--text-main)]"
                            >
                                <span>{value.title.en}</span>
                                {isOpen ? (
                                    <Minus className="w-4 h-4 text-[var(--text-main)] stroke-[1.5]" />
                                ) : (
                                    <Plus className="w-4 h-4 text-[var(--text-main)] stroke-[1.5]" />
                                )}
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-56 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                                <ul className="flex flex-col gap-3 pl-1 font-sans text-[14px] text-[var(--text-muted)]">
                                    {value.links.map((link, i) => (
                                        <li key={i}>
                                            <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[var(--primary)] transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* BOTTOM LEGAL / COPYRIGHT FOOTER SECTION */}
            <div className="w-full px-4 lg:px-8 py-6 flex items-center justify-between text-[10px] tracking-widest text-[var(--text-muted)] uppercase font-mono">
                <div>© ZMARKET PLATFORM ECOSYSTEM 2026</div>
            </div>

        </footer>
    );
}