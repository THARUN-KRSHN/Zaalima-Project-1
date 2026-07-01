import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WifiOff } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function NetworkError() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const navigate = useNavigate();

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col transition-colors duration-300`}>
            <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />

            <main className="flex-grow flex items-center justify-center px-6 py-20">
                <div className="max-w-md w-full text-center flex flex-col items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                        <WifiOff className="w-8 h-8 text-amber-500" />
                    </div>

                    <h1 className="text-xl font-bold text-[var(--text-main)] tracking-tight">Connection lost</h1>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
                        We couldn't reach the server. Check your internet connection and try again.
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        <button
                            onClick={() => window.location.reload()}
                            className="h-10 px-5 bg-[var(--primary)] text-[var(--text-on-primary)] rounded-xl text-sm font-semibold hover:bg-[var(--primary-hover)] transition-colors cursor-pointer focus:outline-none shadow-sm"
                        >
                            Try again
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="h-10 px-5 border border-[var(--border-light)] text-[var(--text-main)] rounded-xl text-sm font-semibold hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer focus:outline-none"
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
