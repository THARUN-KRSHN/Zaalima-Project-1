import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Menu, X, ArrowUpRight, ShoppingCart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

export default function Navbar({ isDarkMode, onToggleTheme }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="w-full px-4 pt-6 pb-2 select-none font-sans z-50 relative">
            <div className="flex flex-col gap-3 w-full items-center">

                {/* Main Menu Pill Layout Container */}
                <div className="w-full md:w-auto md:min-w-[760px] lg:min-w-[840px] h-16 bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-light)] rounded-full px-6 flex items-center justify-between shadow-[var(--shadow-sm)] transition-all duration-300">

                    {/* Branding Token Core Anchor */}
                    <div onClick={() => navigate('/')} className="flex items-center gap-2.5 cursor-pointer group shrink-0">
                        <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--text-on-primary)] transition-transform duration-300 group-hover:scale-105 shadow-sm">
                            <Sparkles className="w-4.5 h-4.5 fill-current" />
                        </div>
                        <span className="text-[17px] text-[var(--text-main)] font-semibold tracking-tight">
                            Z<span className="italic font-normal font-serif ml-0.5 text-[var(--primary)]">market</span>
                        </span>
                    </div>

                    {/* Desktop Core Pipeline Links */}
                    <div className="hidden md:flex items-center gap-7 text-[var(--text-muted)] text-[14px] font-medium pl-4">
                        <button onClick={() => navigate('/products')} className="hover:text-[var(--primary)] transition-colors duration-150 cursor-pointer focus:outline-none">Products</button>
                        
                        {isAuthenticated && user?.role === 'admin' && (
                            <button onClick={() => navigate('/admin/dashboard')} className="hover:text-[var(--primary)] transition-colors duration-150 cursor-pointer focus:outline-none font-medium">Admin Portal</button>
                        )}
                        
                        {isAuthenticated && user?.role === 'vendor' && (
                            <button onClick={() => navigate('/vendor/dashboard')} className="hover:text-[var(--primary)] transition-colors duration-150 cursor-pointer focus:outline-none font-medium">Vendor Portal</button>
                        )}

                        {(!isAuthenticated || user?.role === 'customer') && (
                            <>
                                <button onClick={() => navigate('/cart')} className="hover:text-[var(--primary)] transition-colors duration-150 cursor-pointer focus:outline-none">My Orders</button>
                                <button onClick={() => navigate('/vendor/dashboard')} className="hover:text-[var(--primary)] transition-colors duration-150 cursor-pointer focus:outline-none font-medium">Vendor Portal</button>
                            </>
                        )}
                    </div>

                    {/* Desktop System Actions Controls Handles */}
                    <div className="hidden md:flex items-center gap-5 shrink-0">
                        <button
                            onClick={onToggleTheme}
                            className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors p-1 focus:outline-none"
                            aria-label="Toggle layout theme"
                        >
                            {isDarkMode ? (
                                <Sun className="w-[18px] h-[18px] stroke-[1.75] text-amber-500 fill-amber-500 animate-in spin-in-12 duration-200" />
                            ) : (
                                <Moon className="w-[18px] h-[18px] stroke-[1.75]" />
                            )}
                        </button>

                        {/* 🌟 OVERLAY SWITCH: Triggers the absolute floating overlay instead of hard page redirects */}
                        {/* Auth status display toggle */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-[13px] font-semibold text-[var(--text-muted)]">
                                    Hi, <span className="text-[var(--text-main)] font-bold">{user?.name || user?.role}</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-rose-500 hover:text-rose-600 text-[13px] font-bold transition-colors focus:outline-none cursor-pointer flex items-center gap-1 bg-transparent border-none p-0"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    <span>Log out</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('?auth=login')}
                                className="text-[var(--text-muted)] text-[14px] font-medium hover:text-[var(--text-main)] transition-colors duration-150 focus:outline-none cursor-pointer"
                            >
                                Log in
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => navigate('/cart')}
                            className="bg-[var(--primary)] text-[var(--text-on-primary)] px-5 py-2.5 rounded-full text-[13px] font-medium shadow-[var(--shadow-sm)] hover:bg-[var(--primary-hover)] transition-all duration-150 active:scale-[0.98] flex items-center gap-2 cursor-pointer focus:outline-none"
                        >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Cart</span>
                        </button>
                    </div>

                    {/* Mobile Menu Action Toggle Trigger */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[var(--text-main)] p-1 focus:outline-none transition-transform active:scale-95"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-5 h-5 stroke-[2]" /> : <Menu className="w-5 h-5 stroke-[2]" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu Slider Overlay Drawer Sheet */}
                {isOpen && (
                    <div className="md:hidden w-full max-w-[calc(100vw-2rem)] bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-[2rem] p-5 flex flex-col items-center gap-5 shadow-[var(--shadow-md)] animate-in fade-in slide-in-from-top-3 duration-200 z-50">
                        <div className="w-full flex justify-start border-b border-[var(--border-light)] pb-2">
                            <button
                                onClick={() => { onToggleTheme(); setIsOpen(false); }}
                                className="flex items-center gap-3 text-[var(--text-main)] font-medium text-[15px] py-1 focus:outline-none"
                            >
                                {isDarkMode ? (
                                    <><Sun className="w-4.5 h-4.5 text-amber-500 fill-amber-500" /><span>Light Mode</span></>
                                ) : (
                                    <><Moon className="w-4.5 h-4.5 text-[var(--text-muted)]" /><span>Dark Mode</span></>
                                )}
                            </button>
                        </div>

                        <div className="flex flex-col items-center gap-4 text-[15px] font-medium text-[var(--text-main)] w-full">
                            <button onClick={() => { navigate('/products'); setIsOpen(false); }} className="hover:text-[var(--primary)] transition-colors cursor-pointer focus:outline-none">Products</button>
                            
                            {isAuthenticated && user?.role === 'admin' && (
                                <button onClick={() => { navigate('/admin/dashboard'); setIsOpen(false); }} className="hover:text-[var(--primary)] transition-colors cursor-pointer focus:outline-none font-medium">Admin Portal</button>
                            )}

                            {isAuthenticated && user?.role === 'vendor' && (
                                <button onClick={() => { navigate('/vendor/dashboard'); setIsOpen(false); }} className="hover:text-[var(--primary)] transition-colors cursor-pointer focus:outline-none font-medium">Vendor Portal</button>
                            )}

                            {(!isAuthenticated || user?.role === 'customer') && (
                                <>
                                    <button onClick={() => { navigate('/cart'); setIsOpen(false); }} className="hover:text-[var(--primary)] transition-colors cursor-pointer focus:outline-none">My Orders</button>
                                    <button onClick={() => { navigate('/vendor/dashboard'); setIsOpen(false); }} className="hover:text-[var(--primary)] transition-colors cursor-pointer focus:outline-none font-medium">Vendor Portal</button>
                                </>
                            )}
 
                            {isAuthenticated ? (
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="text-rose-500 hover:text-rose-600 border-t border-[var(--border-light)] w-full text-center pt-3 font-bold transition-colors focus:outline-none cursor-pointer flex items-center justify-center gap-1.5 bg-transparent border-none"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Log out</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => { navigate('?auth=login'); setIsOpen(false); }}
                                    className="hover:text-[var(--primary)] border-t border-[var(--border-light)] w-full text-center pt-3 font-medium transition-colors focus:outline-none cursor-pointer"
                                >
                                    Log in
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => { navigate('/cart'); setIsOpen(false); }}
                            className="w-full bg-[var(--primary)] text-[var(--text-on-primary)] py-3.5 rounded-xl text-center font-medium text-[14px] shadow-[var(--shadow-sm)] hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span>View Shopping Cart</span>
                            <ArrowUpRight className="w-4 h-4 opacity-60" />
                        </button>
                    </div>
                )}

            </div>
        </nav>
    );
}