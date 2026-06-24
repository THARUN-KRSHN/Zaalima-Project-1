import React from 'react';
import VendorRegisterForm from '../../components/auth/VendorRegisterForm';
import AuthLayout from '../../layouts/AuthLayout';

export default function VendorRegister() {
    return (
        <AuthLayout>
            <div className="w-full flex flex-col gap-2 text-left">
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-950 dark:text-white">
                        Merchant Enrollment
                    </h2>
                    <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                        Register your retail operational metrics to deploy structured business storefronts.
                    </p>
                </div>
                <div className="mt-4 w-full">
                    <VendorRegisterForm />
                </div>
            </div>
        </AuthLayout>
    );
}