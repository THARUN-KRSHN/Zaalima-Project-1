import React from 'react';

export default function AddressForm({ formData, onFormChange }) {

    // Internal generic abstraction handler updating values upstream 
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (onFormChange) {
            onFormChange(name, value);
        }
    };

    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-5 transition-colors duration-300 w-full">
            <h3 className="text-base font-bold text-[#1a191e] dark:text-[#f4f5f7] tracking-tight border-b border-[var(--border-light)] pb-2.5">
                Shipping Address Details
            </h3>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {/* Full Name field */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)]">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ''}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                        required
                    />
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)]">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                        required
                    />
                </div>

                {/* Email Address Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)]">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        placeholder="demo@zmarket.com"
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                        required
                    />
                </div>

                {/* Address Line 1 Field */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)]">Address Line 1</label>
                    <input
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1 || ''}
                        onChange={handleChange}
                        placeholder="House No., Street Address, Building Name"
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                        required
                    />
                </div>

                {/* Address Line 2 Field */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)]">Address Line 2 (Optional)</label>
                    <input
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2 || ''}
                        onChange={handleChange}
                        placeholder="Apartment, Suite, Unit, Landmark"
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                    />
                </div>

                {/* City Location Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)]">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        placeholder="Irinjalakuda"
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                        required
                    />
                </div>

                {/* State Region Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)]">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state || ''}
                        onChange={handleChange}
                        placeholder="Kerala"
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                        required
                    />
                </div>

                {/* Postal Pincode Code Field */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)]">Postal Pincode</label>
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode || ''}
                        onChange={handleChange}
                        placeholder="680121"
                        maxLength={6}
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                        required
                    />
                </div>
            </form>
        </div>
    );
}