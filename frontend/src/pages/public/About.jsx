import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Sparkles, Globe } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function About() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const navigate = useNavigate();

    const values = [
        { icon: Users, title: "Community First", desc: "We empower local sellers by giving them tools to compete globally, while keeping their roots local." },
        { icon: Heart, title: "Trust & Quality", desc: "Every vendor is verified and every product goes through quality checks before it reaches you." },
        { icon: Globe, title: "Accessible Everywhere", desc: "Shop from anywhere, on any device. Our platform is built to work seamlessly for everyone." },
    ];

    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col font-sans antialiased`}>
            <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />

            {/* Hero */}
            <header className="w-full max-w-[960px] mx-auto px-6 pt-16 pb-12 text-center flex flex-col items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white leading-tight">About Zmarket</h1>
                <p className="text-sm text-[var(--text-muted)] max-w-lg leading-relaxed">
                    We're building the simplest way for vendors to sell online and for customers to discover amazing products — all in one place.
                </p>
            </header>

            {/* Story */}
            <section className="w-full max-w-[960px] mx-auto px-6 py-12 text-left">
                <div className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-8 sm:p-10 flex flex-col gap-5 shadow-sm">
                    <h2 className="text-lg font-bold text-stone-950 dark:text-white tracking-tight">Our Story</h2>
                    <div className="flex flex-col gap-4 text-sm text-[var(--text-muted)] leading-relaxed">
                        <p>
                            Zmarket started with a simple idea: what if every small business could have the same selling power as the big brands? We noticed that talented artisans, local shops, and independent creators were struggling to reach customers online — not because their products weren't good enough, but because the tools available were too complicated or too expensive.
                        </p>
                        <p>
                            So we built Zmarket — a platform where anyone can open a store in minutes, list their products, and start selling to customers across the country. No technical knowledge needed. No hidden fees. Just a straightforward way to grow your business.
                        </p>
                        <p>
                            For our customers, we wanted shopping to feel personal and trustworthy. Every vendor on our platform is verified, and we work hard to make sure the experience — from browsing to delivery — is smooth and reliable.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="w-full max-w-[960px] mx-auto px-6 py-12">
                <h2 className="text-lg font-bold text-stone-950 dark:text-white tracking-tight mb-6 text-center">What We Believe In</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {values.map((v, i) => {
                        const Icon = v.icon;
                        return (
                            <div key={i} className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-6 flex flex-col gap-3 text-left shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-[var(--primary)]" />
                                </div>
                                <h3 className="text-sm font-bold text-stone-900 dark:text-white">{v.title}</h3>
                                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{v.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="w-full max-w-[960px] mx-auto px-6 py-16 text-center">
                <h2 className="text-xl font-bold text-stone-950 dark:text-white mb-3">Ready to get started?</h2>
                <p className="text-sm text-[var(--text-muted)] mb-6">Join thousands of vendors and customers already on Zmarket.</p>
                <div className="flex items-center justify-center gap-3">
                    <button onClick={() => navigate('?auth=register')} className="h-10 px-6 bg-[var(--primary)] text-[var(--text-on-primary)] rounded-xl text-sm font-semibold hover:bg-[var(--primary-hover)] transition-colors cursor-pointer focus:outline-none shadow-sm">
                        Create account
                    </button>
                    <button onClick={() => navigate('/products')} className="h-10 px-6 border border-[var(--border-light)] text-[var(--text-main)] rounded-xl text-sm font-semibold hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer focus:outline-none">
                        Browse products
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
