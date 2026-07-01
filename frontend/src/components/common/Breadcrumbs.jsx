import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't render breadcrumbs on the homepage
    if (pathnames.length === 0) return null;

    // Mapping of paths to user-friendly page titles
    const routeLabels = {
        products: 'Products',
        orders: 'My Orders',
        profile: 'Profile',
        addresses: 'Saved Addresses',
        wishlist: 'Wishlist',
        cart: 'Shopping Cart',
        checkout: 'Checkout'
    };

    const getLabel = (path) => {
        if (routeLabels[path]) return routeLabels[path];
        // If it looks like an ID, return "Details" or clean string
        if (path.startsWith('ZMK-') || path.startsWith('prod-') || path.startsWith('adr-')) {
            return path;
        }
        // Capitalize fallback
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <nav className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 font-medium select-none mb-6 mt-1 w-full bg-[var(--bg-surface)] border border-[var(--border-light)]/75 px-4 py-2.5 rounded-xl shadow-[var(--shadow-sm)]">
            <Link to="/" className="flex items-center gap-1 hover:text-[var(--primary)] text-stone-400 dark:text-stone-500 hover:dark:text-[var(--primary)] transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
            </Link>
            
            {pathnames.map((name, index) => {
                // If it's "/profile/addresses", we want to route correctly
                let routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                // Fallback adjust for nested paths:
                if (pathnames[index - 1] === 'profile' && name === 'addresses') {
                    routeTo = '/profile/addresses';
                }
                const isLast = index === pathnames.length - 1;
                const label = getLabel(name);

                return (
                    <React.Fragment key={`${name}-${index}`}>
                        <ChevronRight className="w-3 h-3 text-stone-300 dark:text-stone-700 shrink-0" />
                        {isLast ? (
                            <span className="text-stone-850 dark:text-stone-250 font-semibold truncate max-w-[200px]">
                                {label}
                            </span>
                        ) : (
                            <Link to={routeTo} className="hover:text-[var(--primary)] transition-colors truncate max-w-[200px]">
                                {label}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
