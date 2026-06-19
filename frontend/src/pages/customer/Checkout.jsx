import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- CORE SYSTEM SHARED LAYOUTS ---
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';

// --- CHECKOUT COMPONENTS ---
import CheckoutStepper from '../../components/checkout/CheckoutStepper';
import AddressForm from '../../components/checkout/AddressForm';
import PaymentMethods from '../../components/checkout/PaymentMethods';
import OrderSummary from '../../components/checkout/OrderSummary';

// --- MOCK DATA ENGINE ---
import { checkoutSummary, checkoutCartItems } from '../../data/checkoutData';

export default function Checkout() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    const [addressData, setAddressData] = useState({
        fullName: 'Tharunkrishna CU',
        phone: '9778585423',
        email: 'tharun@zmarket.com',
        addressLine1: '401, Cheloorkavu, moonupeedika road',
        addressLine2: 'Cheloorkavu Temple Road',
        city: 'Irinjalakuda',
        state: 'Kerala',
        pincode: '680121'
    });

    const [isSavedAddressView, setIsSavedAddressView] = useState(true);
    const [errors, setErrors] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('razorpay');

    const handleFormUpdate = (fieldName, fieldValue) => {
        setAddressData(prev => ({ ...prev, [fieldName]: fieldValue }));
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    const validateAddressFields = () => {
        const newErrors = {};
        if (!addressData.fullName?.trim()) newErrors.fullName = "Name is required";
        if (!addressData.phone?.trim()) newErrors.phone = "Phone is required";
        if (!addressData.addressLine1?.trim()) newErrors.addressLine1 = "Address is required";
        if (!addressData.pincode?.trim()) newErrors.pincode = "Pincode is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        return true;
    };

    const handlePlaceOrderSubmit = () => {
        if (!isSavedAddressView) {
            if (!validateAddressFields()) {
                window.scrollTo({ top: 150, behavior: 'smooth' });
                return;
            }
            setIsSavedAddressView(true);
        }
        console.log("Order finalized successfully:", { addressData, paymentMethod });
        navigate('/order-success');
    };

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between transition-colors duration-300`}>

            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
            </header>

            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-6 flex-grow flex flex-col gap-4 justify-center">
                {loading ? (
                    <Loader variant="spinner" />
                ) : (
                    <div className="w-full animate-in fade-in duration-300">
                        <CheckoutStepper currentStep={2} />

                        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start w-full text-left mt-4">
                            {/* LEFT COLUMN: Shipping and Payments */}
                            <div className="w-full lg:col-span-7 flex flex-col gap-6">
                                {isSavedAddressView ? (
                                    <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm flex flex-col gap-4 transition-all">
                                        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Deliver to:</span>
                                            <button
                                                type="button"
                                                onClick={() => setIsSavedAddressView(false)}
                                                className="px-4 py-1.5 border border-blue-500 hover:bg-blue-50 text-blue-600 dark:hover:bg-blue-950/30 dark:text-blue-400 rounded-lg text-xs font-bold transition-all focus:outline-none cursor-pointer"
                                            >
                                                Change
                                            </button>
                                        </div>
                                        <div className="flex flex-col gap-1.5 text-stone-800 dark:text-stone-200 text-sm">
                                            <p className="font-bold text-base text-stone-900 dark:text-white">{addressData.fullName}</p>
                                            <p className="leading-relaxed opacity-90">
                                                {addressData.addressLine1}, {addressData.addressLine2 ? `${addressData.addressLine2}, ` : ''}{addressData.city} - {addressData.pincode}
                                            </p>
                                            <p className="text-xs text-[var(--text-muted)] font-medium mt-1">
                                                Contact Phone: <span className="font-mono text-stone-800 dark:text-stone-300 font-semibold">{addressData.phone}</span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-1 shadow-sm">
                                        <AddressForm
                                            formData={addressData}
                                            onFormChange={handleFormUpdate}
                                            errors={errors}
                                        />
                                        <div className="px-5 sm:px-6 pb-5 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (validateAddressFields()) {
                                                        setIsSavedAddressView(true);
                                                    }
                                                }}
                                                className="px-5 h-9 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-xl font-bold text-xs tracking-wide transition-all shadow-sm focus:outline-none cursor-pointer"
                                            >
                                                Save & Use This Address
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <PaymentMethods
                                    selectedMethod={paymentMethod}
                                    onMethodChange={setPaymentMethod}
                                />
                            </div>

                            {/* RIGHT COLUMN: Summary Tracker Card */}
                            <div className="w-full lg:col-span-5 lg:sticky lg:top-28">
                                <OrderSummary
                                    cartData={checkoutCartItems}
                                    tax={checkoutSummary.tax}
                                    shipping={checkoutSummary.shipping}
                                    onCheckoutSubmit={handlePlaceOrderSubmit}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}