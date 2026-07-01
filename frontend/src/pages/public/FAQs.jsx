import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const faqData = [
    {
        category: "Shopping & Orders",
        items: [
            { q: "How do I place an order?", a: "Browse products, add items to your cart, proceed to checkout, choose your delivery address and payment method, then confirm your order. You'll get a confirmation on screen and via email." },
            { q: "Can I cancel an order after placing it?", a: "Yes, you can cancel an order before it's shipped. Go to My Orders, open the order, and tap 'Cancel Order'. Once shipped, cancellation isn't possible but you can request a return." },
            { q: "How do I track my order?", a: "Go to My Orders and open the order you want to track. You'll see the current status and estimated delivery date updated in real-time." },
            { q: "What payment methods do you accept?", a: "We accept UPI, credit/debit cards, net banking, wallets, and cash on delivery (COD) depending on the vendor and your location." },
        ]
    },
    {
        category: "Account & Profile",
        items: [
            { q: "How do I create an account?", a: "Click 'Register' on the top menu, choose Customer or Vendor, fill in your details, and you're all set. It takes less than a minute." },
            { q: "I forgot my password. What do I do?", a: "Click 'Forgot Password' on the login screen, enter your email, and we'll send you a link to reset it." },
            { q: "How do I update my profile or address?", a: "Go to your Profile from the menu. You can edit your name, phone, and manage saved addresses from there." },
        ]
    },
    {
        category: "Vendors & Selling",
        items: [
            { q: "How do I become a vendor?", a: "Register as a Vendor, fill in your store details (name, logo, GST if applicable), and submit for review. Our team will verify and approve your store, usually within 24–48 hours." },
            { q: "Is there a fee to sell on Zmarket?", a: "There's a small platform commission on each sale. There are no upfront listing fees. You can see the exact commission rate in your vendor settings." },
            { q: "How do I manage my products and inventory?", a: "Once approved, your Vendor Dashboard gives you full control — add/edit/delete products, manage stock levels, process orders, and view analytics." },
        ]
    },
];

export default function FAQs() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [openItem, setOpenItem] = useState(null);

    const toggle = (key) => setOpenItem(prev => prev === key ? null : key);

    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col font-sans antialiased`}>
            <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />

            <header className="w-full max-w-[960px] mx-auto px-6 pt-16 pb-8 text-center flex flex-col items-center gap-4">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white">Frequently Asked Questions</h1>
                <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
                    Quick answers to the most common questions about shopping, selling, and using Zmarket.
                </p>
            </header>

            <section className="w-full max-w-[760px] mx-auto px-6 py-10 flex flex-col gap-10">
                {faqData.map((section, si) => (
                    <div key={si} className="flex flex-col gap-3">
                        <h2 className="text-sm font-bold text-stone-900 dark:text-white tracking-tight">{section.category}</h2>
                        <div className="flex flex-col gap-2">
                            {section.items.map((item, qi) => {
                                const key = `${si}-${qi}`;
                                const isOpen = openItem === key;
                                return (
                                    <div key={key} className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl overflow-hidden shadow-sm transition-all">
                                        <button
                                            onClick={() => toggle(key)}
                                            className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                                        >
                                            <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 pr-4">{item.q}</span>
                                            <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isOpen && (
                                            <div className="px-5 pb-4 text-sm text-[var(--text-muted)] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                                                {item.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </section>

            <Footer />
        </div>
    );
}
