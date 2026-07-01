import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function TermsConditions() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing or using Zmarket, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the platform. We may update these terms from time to time, and continued use of the platform means you accept the changes."
        },
        {
            title: "2. User Accounts",
            content: "You must provide accurate information when creating an account. You are responsible for keeping your login credentials secure. If you suspect unauthorised access to your account, contact us immediately. We reserve the right to suspend or delete accounts that violate our policies."
        },
        {
            title: "3. Customer Responsibilities",
            content: "As a customer, you agree to provide valid delivery information, make payments through the methods offered on the platform, and use the platform only for lawful purposes. Misuse of coupons, fraudulent orders, or abusive behaviour may result in account suspension."
        },
        {
            title: "4. Vendor Responsibilities",
            content: "Vendors must ensure their product listings are accurate, including descriptions, pricing, and stock availability. Vendors are responsible for fulfilling orders on time and maintaining product quality. Misleading listings or failure to deliver may result in removal from the platform."
        },
        {
            title: "5. Orders & Payments",
            content: "All orders placed on Zmarket are subject to product availability and vendor confirmation. Prices are set by individual vendors and may change without notice. Payments are processed securely through our payment partners. Zmarket is not liable for payment failures caused by third-party services."
        },
        {
            title: "6. Cancellations & Refunds",
            content: "Customers may cancel orders before they are shipped. Refund timelines depend on the payment method used. Once an order is shipped, cancellations are not possible — but you may request a return if the vendor's return policy allows it. Refund disputes will be handled on a case-by-case basis."
        },
        {
            title: "7. Intellectual Property",
            content: "All content on Zmarket — including the logo, design, text, and features — is owned by Zmarket or its licensors. Vendors retain ownership of their product images and descriptions. You may not copy, distribute, or modify any part of the platform without written permission."
        },
        {
            title: "8. Limitation of Liability",
            content: "Zmarket acts as a marketplace connecting vendors and customers. We are not the seller of products and are not liable for product quality, delivery delays, or disputes between vendors and customers. We will do our best to help resolve issues, but final responsibility lies with the vendor."
        },
        {
            title: "9. Termination",
            content: "We may suspend or terminate your access to the platform if you violate these terms, engage in fraudulent activity, or act in a way that harms the platform or its users. You may also delete your account at any time from your Profile settings."
        },
        {
            title: "10. Contact",
            content: "For questions about these terms, contact us at legal@zmarket.com or through our Contact page."
        },
    ];

    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col font-sans antialiased`}>
            <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />

            <header className="w-full max-w-[760px] mx-auto px-6 pt-16 pb-8 text-center flex flex-col items-center gap-4">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-white">Terms & Conditions</h1>
                <p className="text-xs text-[var(--text-muted)]">Last updated: July 2026</p>
            </header>

            <section className="w-full max-w-[760px] mx-auto px-6 py-8">
                <div className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 flex flex-col gap-7 shadow-sm text-left">
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        Please read these terms carefully before using Zmarket. They outline the rules and guidelines for using our platform as a customer, vendor, or visitor.
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
