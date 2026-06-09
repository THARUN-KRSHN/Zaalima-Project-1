import React, { useState, useRef, useEffect } from 'react';
import { Search, History, ArrowLeft } from 'lucide-react';

export default function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileActive, setIsMobileActive] = useState(false);

    const containerRef = useRef(null);

    // Sample data matching your images
    const recentSearches = [
        { text: 'laptop stand', type: 'history' },
        { text: 'mouse track pad', type: 'history', category: 'in Laptop Accessories' },
        { text: 'keyboard mouse track', type: 'history' },
        { text: 'keyboards', type: 'history' }
    ];

    const trendingSearches = ['mobiles', 'shoes', 't shirts', 'laptops', 'watches', 'tv'];
    const discoverMore = ['mobiles', 'shoes', 't shirts', 'laptops', 'watches', 'tv', 'sarees', 'headphones', 'bluetooth', 'fridge', 'bedsheet', 'water bottle'];

    // Handle clicking outside to close the dropdown overlay
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
        <div className="w-full max-w-4xl mx-auto p-4 font-sans">

            {/* --- DESKTOP SEARCH COMPONENT --- */}
            <div ref={containerRef} className="hidden md:block relative z-50">
                <div
                    className={`flex items-center h-11 px-4 bg-[#F0F5FF] border rounded-md transition-all duration-150
            ${isFocused ? 'border-[#2874f0] bg-white ring-1 ring-[#2874f0]/20' : 'border-transparent'}`}
                >
                    <Search className="w-5 h-5 text-[#717478] mr-3 shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        placeholder="Search for Products, Brands and More"
                        className="w-full h-full bg-transparent text-[14px] text-[#212121] placeholder-[#878787] focus:outline-none"
                    />
                </div>

                {/* Desktop Dropdown Overlay */}
                {isFocused && (
                    <div className="absolute top-[45px] left-0 w-full bg-white border border-t-0 border-gray-200 rounded-b-md shadow-lg overflow-hidden">

                        {/* Recent Searches */}
                        <div className="py-1">
                            {recentSearches.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-[14px] text-[#212121]"
                                >
                                    <History className="w-4 h-4 text-[#878787] mr-4 shrink-0" />
                                    <div className="flex flex-col">
                                        <span>{item.text}</span>
                                        {item.category && (
                                            <span className="text-[12px] text-[#2874f0] font-medium">{item.category}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Trending Header */}
                        <div className="px-4 pt-3 pb-1 border-t border-gray-100">
                            <span className="text-[12px] font-medium text-[#878787] uppercase tracking-wider">Trending</span>
                        </div>

                        {/* Trending List */}
                        <div className="py-1 pb-2">
                            {trendingSearches.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-[14px] text-[#212121]"
                                >
                                    <Search className="w-4 h-4 text-[#878787] mr-4 shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* --- MOBILE SEARCH INITIATOR BAR --- */}
            <div className="md:hidden">
                {!isMobileActive ? (
                    <div
                        onClick={() => setIsMobileActive(true)}
                        className="flex items-center h-10 px-3 bg-white border border-[#2874f0] rounded-lg cursor-pointer"
                    >
                        <Search className="w-4 h-4 text-[#717478] mr-2" />
                        <span className="text-[13px] text-[#878787] truncate">Search for Products, Brands and More</span>
                    </div>
                ) : (

                    /* --- MOBILE FULL-SCREEN SEARCH VIEW --- */
                    <div className="fixed inset-0 bg-[#F1F3F6] z-50 flex flex-col animate-in fade-in duration-100">
                        {/* Top Bar */}
                        <div className="flex items-center h-14 bg-white px-3 border-b border-gray-200 shrink-0">
                            <button
                                onClick={() => setIsMobileActive(false)}
                                className="p-1 mr-2 text-[#717478] hover:bg-gray-100 rounded-full"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for Products, Brands and More"
                                className="w-full h-full bg-transparent text-[15px] text-[#212121] placeholder-[#c2c2c2] focus:outline-none"
                            />
                        </div>

                        {/* Discover More Content Area */}
                        <div className="bg-white p-4 flex flex-col gap-3">
                            <h3 className="text-[14px] text-[#212121] font-medium">Discover More</h3>

                            {/* Tag Cloud */}
                            <div className="flex flex-wrap gap-2">
                                {discoverMore.map((tag, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSearchQuery(tag)}
                                        className="px-3 py-1.5 border border-gray-200 rounded text-[13px] text-[#2874f0] bg-white font-normal hover:bg-blue-50 active:bg-blue-100 transition-colors"
                                    >
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