import React from 'react';
import { Menu, Bell, Sun, Moon, UserCircle2, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ title = "Dashboard", isDarkMode, onToggleTheme, onOpenSidebar }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <header className="w-full h-16 border-b border-[var(--border-light)] bg-[var(--bg-surface)]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
            {/* Left Column Stack */}
            <div className="flex items-center gap-3">
                {/* Mobile Hamburger toggle link button */}
                <button
                    onClick={onOpenSidebar}
                    className="p-1.5 rounded-lg border border-[var(--border-light)] bg-[var(--bg-main)] text-[var(--text-main)] md:hidden focus:outline-none active:scale-95 transition-transform"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-[#1a191e] dark:text-[#f4f5f7]">
                    {title}
                </h1>
            </div>

            {/* Right Control Actions Cluster Row */}
            <div className="flex items-center gap-2 sm:gap-3.5">
                {/* Light/Dark State System switcher capsule */}
                <button
                    onClick={onToggleTheme}
                    className="p-2 rounded-full hover:bg-[var(--bg-surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors focus:outline-none"
                >
                    {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
                </button>

                {/* Notifications Link Badge Component */}
                <button className="p-2 rounded-full hover:bg-[var(--bg-surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors focus:outline-none relative">
                    <Bell className="w-4.5 h-4.5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[var(--bg-surface)]" />
                </button>

                {/* Vertical Divider element lines */}
                <div className="h-5 w-[1px] bg-[var(--border-light)] mx-0.5 sm:mx-1" />

                {/* User Profile Info and Log Out shortcut trigger */}
                <div className="flex items-center gap-2 pl-1 group">
                    <UserCircle2 className="w-6.5 h-6.5 text-[var(--text-muted)]" />
                    <span className="hidden sm:inline text-xs font-bold text-[var(--text-main)]">
                        {user?.name || user?.email || 'Guest User'}
                    </span>
                </div>

                {/* Explicit Logout Trigger */}
                <button
                    onClick={handleLogout}
                    title="Log Out"
                    className="p-1.5 rounded-lg border border-[var(--border-light)] hover:bg-rose-500/10 text-rose-500 hover:text-rose-600 transition-colors focus:outline-none cursor-pointer active:scale-95 flex items-center justify-center bg-transparent shrink-0"
                >
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
        </header>
    );
}