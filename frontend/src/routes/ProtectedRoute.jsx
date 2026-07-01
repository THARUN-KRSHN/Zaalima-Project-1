import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, allowedRoles }) {
    const location = useLocation();
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-[var(--bg-main)] flex items-center justify-center text-sm text-[var(--text-muted)] animate-pulse">
                Checking your session...
            </div>
        );
    }

    // Not logged in → redirect to login, preserve where they were trying to go
    if (!isAuthenticated) {
        return <Navigate to="/?auth=login" state={{ from: location }} replace />;
    }

    // Logged in but wrong role → show full unauthorized page
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}