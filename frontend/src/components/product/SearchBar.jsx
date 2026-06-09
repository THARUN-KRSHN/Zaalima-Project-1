import React, { useState, useRef, useEffect } from 'react';
import { Search, History, ArrowLeft } from 'lucide-react';

export default function SearchBar({ searchQuery = '', onSearchChange }) {
    const [isFocused, setIsFocused] = useState(false);
    const [isMobileActive, setIsMobileActive] = useState(false);
    const containerRef = useRef(null);

    const recentSearches = [
        { text: 'laptop stand', type: 'history' },
        { text: 'mouse track pad', type: 'history' }
    ];

    const trendingSearches = ['mobiles', 'shoes', 'Anarkali', 'laptops'];
    const discoverMore = ['mobiles', 'shoes', 'kurta', 'laptops', 'watches', 'headphones'];

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full font-sans">
            {/* --- DESKTOP SEARCH COMPONENT --- */}
            <div ref={containerRef} className="hidden md:block relative z-50">
                <div className={`flex items-center h-11 px-4 border rounded-md transition-all duration-200 ${isFocused ? 'border-[var(--primary)] bg-[var(--bg-surface)] ring-1 ring-[var(--primary)]/20' : 'border-transparent bg-[var(--bg-surface-hover)]'}`}>
                    <Search className="w-5 h-5 text-[var(--text-muted)] mr-3 shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        placeholder="Search for Products, Brands and More"
                        className="w-full h-full bg-transparent text-[14px] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none"
                    />
                </div>

                {/* Dropdown Overlay Lists */}
                {isFocused && (
                    <div className="absolute top-[48px] left-0 w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-md shadow-[var(--shadow-md)] overflow-hidden transition-colors duration-200">
                        <div className="py-1">
                            {recentSearches.map((item, index) => (
                                <div key={index} onClick={() => { onSearchChange(item.text); setIsFocused(false); }} className="flex items-center px-4 py-2.5 hover:bg-[var(--bg-surface-hover)] cursor-pointer text-[14px] text-[var(--text-main)] transition-colors">
                                    <History className="w-4 h-4 text-[var(--text-muted)] mr-4 shrink-0" />
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="px-4 pt-3 pb-1 border-t border-[var(--border-light)]">
                            <span className="text-[12px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Trending</span>
                        </div>

                        <div className="py-1 pb-2">
                            {trendingSearches.map((item, index) => (
                                <div key={index} onClick={() => { onSearchChange(item); setIsFocused(false); }} className="flex items-center px-4 py-2.5 hover:bg-[var(--bg-surface-hover)] cursor-pointer text-[14px] text-[var(--text-main)] transition-colors">
                                    <Search className="w-4 h-4 text-[var(--text-muted)] mr-4 shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* --- MOBILE SEARCH COMPONENT --- */}
            <div className="md:hidden">
                {!isMobileActive ? (
                    <div onClick={() => setIsMobileActive(true)} className="flex items-center h-10 px-3 bg-[var(--bg-surface)] border border-[var(--primary)] rounded-lg cursor-pointer">
                        <Search className="w-4 h-4 text-[var(--text-muted)] mr-2" />
                        <span className="text-[13px] text-[var(--text-muted)] truncate">{searchQuery || "Search for Products, Brands and More"}</span>
                    </div>
                ) : (
                    <div className="fixed inset-0 bg-[var(--bg-main)] z-50 flex flex-col animate-in fade-in duration-100 transition-colors duration-300">
                        <div className="flex items-center h-14 bg-[var(--bg-surface)] px-3 border-b border-[var(--border-light)] shrink-0">
                            <button onClick={() => setIsMobileActive(false)} className="p-1 mr-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] rounded-full transition-colors">
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                                placeholder="Search for Products, Brands and More"
                                className="w-full h-full bg-transparent text-[15px] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none"
                            />
                        </div>
                        <div className="bg-[var(--bg-surface)] p-4 flex flex-col gap-3">
                            <h3 className="text-[14px] text-[var(--text-main)] font-medium">Discover More</h3>
                            <div className="flex flex-wrap gap-2">
                                {discoverMore.map((tag, index) => (
                                    <button key={index} onClick={() => { onSearchChange(tag); setIsMobileActive(false); }} className="px-3 py-1.5 border border-[var(--border-light)] rounded text-[13px] text-[var(--primary)] bg-[var(--bg-surface)] font-normal hover:bg-[var(--primary-muted)] transition-colors">
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}