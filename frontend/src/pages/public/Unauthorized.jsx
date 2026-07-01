import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function Unauthorized() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const navigate = useNavigate();

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col transition-colors duration-300`}>
            <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />

            <main className="flex-grow flex items-center justify-center px-6 py-20">
                <div className="max-w-md w-full text-center flex flex-col items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center">
                        <ShieldX className="w-8 h-8 text-rose-500" />
                    </div>

                    <h1 className="text-xl font-bold text-[var(--text-main)] tracking-tight">Access denied</h1>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
                        You don't have permission to view this page. Please log in with the right account or go back.
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
