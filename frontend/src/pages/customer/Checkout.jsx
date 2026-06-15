import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CheckoutStepper from '../../components/checkout/CheckoutStepper';
import AddressForm from '../../components/checkout/AddressForm';
import PaymentMethods from '../../components/checkout/PaymentMethods';
import OrderSummary from '../../components/checkout/OrderSummary';

export default function Checkout() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    const [addressData, setAddressData] = useState({
        fullName: '', phone: '', email: '',
        addressLine1: '', addressLine2: '',
        city: '', state: '', pincode: ''
    });

    // 🌟 New state to track error messages for each field
    const [errors, setErrors] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('razorpay');

    const dummyCheckoutCart = [
        { id: 1, title: "Anarkali Kurta Set", price: 898, quantity: 1 },
        { id: 2, title: "Vyb Diva Wristwatch", price: 2046, quantity: 2 }
    ];

    const handleFormUpdate = (fieldName, fieldValue) => {
        setAddressData(prev => ({ ...prev, [fieldName]: fieldValue }));
        // Clear the error message in real-time as the user types
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    // 🌟 Frontend Validation Logic
    const handlePlaceOrder = () => {
        const newErrors = {};

        if (!addressData.fullName?.trim()) newErrors.fullName = "Full Name is required";
        if (!addressData.phone?.trim()) newErrors.phone = "Phone Number is required";
        if (!addressData.addressLine1?.trim()) newErrors.addressLine1 = "Shipping Address is required";
        if (!addressData.pincode?.trim()) newErrors.pincode = "Postal Pincode is required";

        // If there are errors, stop the order and save them to state
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            // Optional: Smoothly scroll up to the form so they see the errors
            window.scrollTo({ top: 200, behavior: 'smooth' });
            return;
        }

        console.log("Validation Passed! Submitting:", { addressData, paymentMethod, dummyCheckoutCart });
        navigate('/products');
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between transition-colors duration-300`}>
            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
            </header>

            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-6 flex-grow flex flex-col gap-6">
                <CheckoutStepper currentStep={2} />

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start w-full text-left">
                    {/* Pass the errors object down to the form */}
                    <div className="w-full lg:col-span-7">
                        <AddressForm formData={addressData} onFormChange={handleFormUpdate} errors={errors} />
                    </div>

                    <div className="w-full lg:col-span-5 lg:sticky lg:top-28">
                        <OrderSummary
                            cartData={dummyCheckoutCart}
                            tax={140}
                            shipping={0}
                            onCheckoutSubmit={handlePlaceOrder}
                        />
                    </div>

                    <div className="w-full lg:col-span-7 mt-2 lg:mt-0">
                        <PaymentMethods selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />
                    </div>

                    <div className="w-full lg:col-span-7 flex justify-center pt-2 mb-8">
                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            className="w-full h-12 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none"
                        >
                            <span>Confirm and Place Order</span>
                            <ArrowRight className="w-4 h-4 ml-0.5" />
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}