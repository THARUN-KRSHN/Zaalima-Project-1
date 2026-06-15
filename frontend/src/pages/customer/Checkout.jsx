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

export default function Checkout() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    // Controlled State for Address Form Input Fields
    const [addressData, setAddressData] = useState({
        fullName: '', phone: '', email: '',
        addressLine1: '', addressLine2: '',
        city: '', state: '', pincode: ''
    });

    // Controlled State for the Selected Payment Option 
    const [paymentMethod, setPaymentMethod] = useState('razorpay');

    // Dummy Basket Row data mirroring your exact layout metrics
    const dummyCheckoutCart = [
        { id: 1, title: "Anarkali Kurta Set", price: 898, quantity: 1 },
        { id: 2, title: "Vyb Diva Wristwatch", price: 2046, quantity: 2 }
    ];

    // Controlled field alteration callback dispatcher
    const handleFormUpdate = (fieldName, fieldValue) => {
        setAddressData(prev => ({ ...prev, [fieldName]: fieldValue }));
    };

    // Consolidated verification checkout submit handler pipeline
    const handlePlaceOrder = () => {
        const { fullName, phone, addressLine1, city, pincode } = addressData;

        if (!fullName || !phone || !addressLine1 || !city || !pincode) {
            alert("Please fill in all required shipping address fields before processing payment.");
            return;
        }

        console.log("Processing Order Data Package:", { addressData, paymentMethod, dummyCheckoutCart });
        // Simulates dynamic routing redirection straight to catalog stream
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

                {/* 🌟 RESTRUCTURED DESKTOP-FIRST GRID ENGINE
                    Mobile: Single unified column list layout stack.
                    Desktop (lg:): Custom multi-row grid system tracking your blueprint exactly. */}
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start w-full text-left">

                    {/* ROW 1 LEFT: Address Form Input Card Block (Takes 7 columns) */}
                    <div className="w-full lg:col-span-7 ordering-1">
                        <AddressForm formData={addressData} onFormChange={handleFormUpdate} />
                    </div>

                    {/* ROW 1 RIGHT: Financial Overview Summary (Takes 5 columns) */}
                    {/* Removed sticky styles here to allow Payment & Place Order sections to follow naturally */}
                    <div className="w-full lg:col-span-5 ordering-2 lg:sticky lg:top-28">
                        <OrderSummary
                            cartData={dummyCheckoutCart}
                            tax={140}
                            shipping={0}
                            onCheckoutSubmit={handlePlaceOrder}
                        />
                    </div>

                    {/* ROW 2: Payment Selector Cards (Stretches across all columns on desktop) */}
                    <div className="w-full lg:col-span-7 ordering-3 mt-2 lg:mt-0">
                        <PaymentMethods selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />
                    </div>

                    {/* ROW 3: Final Call To Action Checkout Dispatch Button Anchor */}
                    <div className="w-full lg:col-span-7 ordering-4 flex justify-center pt-2 mb-8">
                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            className="w-full sm:w-[80%] md:w-[60%] lg:w-full h-12 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 focus:outline-none"
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