import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function Contact() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setForm({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        { icon: Mail, label: "Email", value: "support@zmarket.com" },
        { icon: Phone, label: "Phone", value: "+91 98765 43210" },
        { icon: MapPin, label: "Address", value: "Kochi, Kerala, India" },
    ];

    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col font-sans antialiased`}>
            <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />

            <header className="w-full max-w-[960px] mx-auto px-6 pt-16 pb-8 text-center flex flex-col items-center gap-4">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white">Get in Touch</h1>
                <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
                    Have a question, feedback, or need help? We'd love to hear from you.
                </p>
            </header>

            <section className="w-full max-w-[960px] mx-auto px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Contact info cards */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {contactInfo.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                                        <Icon className="w-5 h-5 text-[var(--primary)]" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 text-left">
                                        <span className="text-xs font-semibold text-[var(--text-muted)]">{item.label}</span>
                                        <span className="text-sm font-semibold text-stone-900 dark:text-white">{item.value}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-3 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-sm text-left">
                        <h2 className="text-base font-bold text-stone-900 dark:text-white">Send us a message</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-stone-600 dark:text-stone-400">Your name</label>
                                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe"
                                    className="h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl text-sm focus:outline-none focus:border-[var(--primary)] text-stone-900 dark:text-white placeholder:text-stone-400" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-stone-600 dark:text-stone-400">Email address</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com"
                                    className="h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl text-sm focus:outline-none focus:border-[var(--primary)] text-stone-900 dark:text-white placeholder:text-stone-400" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-stone-600 dark:text-stone-400">Subject</label>
                            <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="What's this about?"
                                className="h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl text-sm focus:outline-none focus:border-[var(--primary)] text-stone-900 dark:text-white placeholder:text-stone-400" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-stone-600 dark:text-stone-400">Message</label>
                            <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Tell us more..."
                                className="px-3 py-2.5 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl text-sm focus:outline-none focus:border-[var(--primary)] resize-none text-stone-900 dark:text-white placeholder:text-stone-400" />
                        </div>

                        <div className="flex items-center justify-between gap-4 pt-2">
                            {submitted && (
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-150">
                                    <CheckCircle className="w-4 h-4" /> Message sent!
                                </span>
                            )}
                            <div className="flex-grow" />
                            <button type="submit" className="h-10 px-5 bg-[var(--primary)] text-[var(--text-on-primary)] rounded-xl text-sm font-semibold hover:bg-[var(--primary-hover)] transition-colors cursor-pointer focus:outline-none shadow-sm flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                <span>Send message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
}
