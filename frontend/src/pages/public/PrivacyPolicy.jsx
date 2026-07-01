import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function PrivacyPolicy() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const sections = [
        {
            title: "1. Information We Collect",
            content: "When you use Zmarket, we may collect personal information you provide directly — such as your name, email address, phone number, delivery address, and payment details. We also collect usage data like pages visited, search queries, and device information to improve your experience."
        },
        {
            title: "2. How We Use Your Information",
            content: "We use your information to process orders, manage your account, send order updates, improve our platform, and provide customer support. We may also use anonymised data for analytics and to personalise product recommendations."
        },
        {
            title: "3. Information Sharing",
            content: "We do not sell your personal data. We share information only with: vendors (to fulfil your orders), payment processors (to process transactions), and service providers who help us run the platform. We may also share data if required by law."
        },
        {
            title: "4. Data Security",
            content: "We use industry-standard encryption and security measures to protect your data. All payments are processed through secure, PCI-compliant gateways. However, no system is 100% secure, and we encourage you to use strong passwords and keep your login details private."
        },
        {
            title: "5. Cookies",
            content: "We use cookies and similar technologies to remember your preferences, keep you logged in, and understand how you use our platform. You can manage cookie preferences in your browser settings."
        },
        {
            title: "6. Your Rights",
            content: "You can access, update, or delete your personal information from your Profile settings at any time. You can also contact us to request a copy of your data or ask us to stop processing it. We'll respond within 30 days."
        },
        {
            title: "7. Changes to This Policy",
            content: "We may update this policy from time to time. If we make significant changes, we'll notify you via email or through the platform. The latest version will always be available on this page."
        },
        {
            title: "8. Contact Us",
            content: "If you have questions about this privacy policy or how we handle your data, email us at privacy@zmarket.com or reach out through our Contact page."
        },
    ];

    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col font-sans antialiased`}>
            <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />

            <header className="w-full max-w-[760px] mx-auto px-6 pt-16 pb-8 text-center flex flex-col items-center gap-4">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-white">Privacy Policy</h1>
                <p className="text-xs text-[var(--text-muted)]">Last updated: July 2026</p>
            </header>

            <section className="w-full max-w-[760px] mx-auto px-6 py-8">
                <div className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 flex flex-col gap-7 shadow-sm text-left">
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        At Zmarket, your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have.
                    </p>
                    {sections.map((s, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <h2 className="text-sm font-bold text-stone-900 dark:text-white">{s.title}</h2>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.content}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
