import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

// --- CORE FRAME SYSTEM LAYOUTS ---
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

// --- CHECKOUT ATOMS ---
import CheckoutStepper from '../../components/checkout/CheckoutStepper';
import AddressForm from '../../components/checkout/AddressForm';
import PaymentMethods from '../../components/checkout/PaymentMethods';
import OrderSummary from '../../components/checkout/OrderSummary';

// --- CENTRALIZED MOCK DATA IMPORT ---
import { checkoutSummary, checkoutCartItems, defaultShippingAddress } from '../../data/checkoutData';

export default function Checkout() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    // Hydrating the state using data nodes from src/data/checkoutData.js
    const [addressData, setAddressData] = useState({
        fullName: '', phone: '', email: '',
        addressLine1: '', addressLine2: '',
        city: '', state: '', pincode: ''
    });

    // Local State to track real-time inline validation warnings
    const [errors, setErrors] = useState({});

    // Local State tracking selected payment option node
    const [paymentMethod, setPaymentMethod] = useState('razorpay');

    // Controlled field input alteration callback handler
    const handleFormUpdate = (fieldName, fieldValue) => {
        setAddressData(prev => ({ ...prev, [fieldName]: fieldValue }));
        // Clear out the active error indicator dynamically as soon as the user edits the input
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    // Consolidated validation checkout submit handler pipeline
    const handlePlaceOrder = () => {
        const newErrors = {};

        // Frontend validation tracking rules matching your checklist criteria
        if (!addressData.fullName?.trim()) newErrors.fullName = "Name is required";
        if (!addressData.phone?.trim()) newErrors.phone = "Phone is required";
        if (!addressData.addressLine1?.trim()) newErrors.addressLine1 = "Address is required";
        if (!addressData.pincode?.trim()) newErrors.pincode = "Pincode is required";

        // Stop order submission if validation errors are captured
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            window.scrollTo({ top: 200, behavior: 'smooth' }); // Smooth auto-scroll feedback focus
            return;
        }

        console.log("Validation Passed! Packaging Payload Data:", { addressData, paymentMethod, checkoutCartItems });
        // Redirect directly to home/listings grid or a success page container
        navigate('/products');
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between transition-colors duration-300`}>

            {/* MAIN HEADER NAVIGATION TRACK */}
            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
            </header>

            {/* CENTRAL WORKSPACE CANVAS */}
            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-6 flex-grow flex flex-col gap-6">

                {/* Visual Step progress tracker component header */}
                <CheckoutStepper currentStep={2} />

                {/* 🌟 LAYOUT GRID CONFIGURATION MATCHING BLUEPRINT:
                    Mobile: Collapses sequentially into a neat single scroll column list layout stack.
                    Desktop (lg:): Custom multi-row grid system tracking items side-by-side perfectly. */}
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start w-full text-left">

                    {/* ROW 1 LEFT: Address Form Input Card Block (Takes 7 columns on desktop) */}
                    <div className="w-full lg:col-span-7 ordering-1">
                        <AddressForm
                            formData={addressData}
                            onFormChange={handleFormUpdate}
                            errors={errors}
                        />
                    </div>

                    {/* ROW 1 RIGHT: Financial Overview Summary (Takes 5 columns on desktop) */}
                    <div className="w-full lg:col-span-5 ordering-2 lg:sticky lg:top-28">
                        <OrderSummary
                            cartData={checkoutCartItems}
                            tax={checkoutSummary.tax}
                            shipping={checkoutSummary.shipping}
                            onCheckoutSubmit={handlePlaceOrder}
                        />
                    </div>

                    {/* ROW 2: Payment Selector Cards (Sits directly underneath Address Form on desktop) */}
                    <div className="w-full lg:col-span-7 ordering-3 mt-2 lg:mt-0">
                        <PaymentMethods selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />
                    </div>

                    {/* ROW 3: Final Call To Action Checkout Dispatch Button Anchor */}
                    <div className="w-full lg:col-span-7 ordering-4 flex justify-center pt-2 mb-8">
                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            className="w-full h-12 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 focus:outline-none"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Confirm and Place Order</span>
                            <ArrowRight className="w-4 h-4 ml-0.5" />
                        </button>
                    </div>

                </div>

            </main>

            {/* BASE PLATFORM ATTACHMENT FOOTER */}
            <Footer />
        </div>
    );
}