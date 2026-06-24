import React from 'react';
import CustomerRegisterForm from '../../components/auth/CustomerRegisterForm';
import AuthLayout from '../../layouts/AuthLayout';

export default function CustomerRegister() {
    return (
        <AuthLayout>
            <div className="w-full flex flex-col gap-2 text-left">
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-950 dark:text-white">
                        Customer Registration
                    </h2>
                    <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                        Create your marketplace profile credentials below to start browsing.
                    </p>
                </div>
                <div className="mt-5 w-full">
                    <CustomerRegisterForm />
                </div>
            </div>
        </AuthLayout>
    );
}