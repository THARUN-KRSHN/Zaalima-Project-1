import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function NotFound() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const navigate = useNavigate();

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col transition-colors duration-300`}>
            <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />

            <main className="flex-grow flex items-center justify-center px-6 py-20">
                <div className="max-w-md w-full text-center flex flex-col items-center gap-5">
                    {/* Large 404 number */}
                    <div className="relative">
                        <span className="text-[120px] sm:text-[160px] font-black text-stone-100 dark:text-stone-900 leading-none select-none">404</span>
                        <span className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[160px] font-black bg-gradient-to-br from-[var(--primary)] to-violet-500 bg-clip-text text-transparent leading-none select-none opacity-20">404</span>
                    </div>

                    <h1 className="text-xl font-bold text-[var(--text-main)] tracking-tight -mt-6">Page not found</h1>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
                        Sorry, the page you're looking for doesn't exist or may have been moved.
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="h-10 px-5 border border-[var(--border-light)] text-[var(--text-main)] rounded-xl text-sm font-semibold hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer focus:outline-none"
                        >
                            Go back
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="h-10 px-5 bg-[var(--primary)] text-[var(--text-on-primary)] rounded-xl text-sm font-semibold hover:bg-[var(--primary-hover)] transition-colors cursor-pointer focus:outline-none shadow-sm"
                        >
                            Back to home
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
