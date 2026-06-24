import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, allowedRoles }) {
    const location = useLocation();

    // Retrieve credentials state profile out of global Redux layout slices
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-[var(--bg-main)] flex items-center justify-center font-mono text-xs text-[var(--text-muted)] animate-pulse">
                Verifying system security credentials tokens...
            </div>
        );
    }

    // 🌟 CASE A: Unauthenticated -> Redirect to home/login and save context path
    if (!isAuthenticated) {
        return <Navigate to="/?auth=login" state={{ from: location }} replace />;
    }

    // 🌟 CASE B: Role-Based Access Control (RBAC) Protection Block
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return (
            <div className="min-h-screen w-full bg-[var(--bg-main)] flex flex-col items-center justify-center p-6 text-center font-sans">
                <div className="max-w-md p-8 bg-[var(--bg-surface)] border border-rose-500/20 rounded-2xl shadow-xl flex flex-col gap-3">
                    <h1 className="text-lg font-extrabold text-rose-500 tracking-tight">Access Denied</h1>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        Your account role privilege token (<span className="font-mono font-bold text-stone-900 dark:text-white uppercase">{user?.role}</span>) is unauthorized to access this directory path.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="mt-2 h-10 bg-[var(--primary)] text-[var(--text-on-primary)] rounded-xl font-bold text-xs shadow-md"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return children;
}