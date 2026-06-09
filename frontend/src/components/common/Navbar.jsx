import React, { useState } from 'react';
import { Sparkles, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full max-w-7xl mx-auto px-4 py-4 font-sans select-none">
            {/* Container with background color matching the reference tone */}
            <div className="relative z-50 flex flex-col gap-3">

                {/* Main Navbar Pill */}
                <div className="w-full h-20 bg-[#FAF8F5] border border-[#F0EDE8] rounded-full px-6 md:px-8 flex items-center justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-[#262320] flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105">
                            <Sparkles className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-xl text-[#262320] font-medium tracking-tight">
                            Resume<span className="italic font-normal font-serif">IQ</span>
                        </span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 text-[#6B6661] text-[15px] font-medium">
                        <a href="#features" className="hover:text-[#262320] transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-[#262320] transition-colors">How It Works</a>
                        <a href="#pricing" className="hover:text-[#262320] transition-colors">Pricing</a>
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex items-center gap-6">
                        <button className="text-[#262320] hover:scale-105 transition-transform" aria-label="Toggle dark mode">
                            <Moon className="w-5 h-5" />
                        </button>
                        <a href="#login" className="text-[#6B6661] text-[15px] font-medium hover:text-[#262320] transition-colors">
                            Log in
                        </a>
                        <a
                            href="#join"
                            className="bg-[#262320] text-[#FAF8F5] px-6 py-3 rounded-full text-[15px] font-medium shadow-[0_10px_20px_rgba(38,35,32,0.2)] hover:bg-[#383430] transition-all hover:translate-y-[-1px]"
                        >
                            Join Now
                        </a>
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#262320] p-1 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu Card */}
                {isOpen && (
                    <div className="md:hidden w-full bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2rem] p-6 flex flex-col items-center gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-top-4 duration-200">

                        {/* Dark Mode Row */}
                        <div className="w-full flex justify-start px-2">
                            <button className="flex items-center gap-3 text-[#262320] font-medium text-base py-2">
                                <Moon className="w-5 h-5" />
                                <span>Dark Mode</span>
                            </button>
                        </div>

                        {/* Nav Menu Links */}
                        <div className="flex flex-col items-center gap-5 text-base font-medium text-[#262320] w-full mt-2">
                            <a href="#login" onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                                Log in
                            </a>
                            <a href="#pricing" onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                                Pricing
                            </a>
                        </div>

                        {/* Primary Action Button */}
                        <a
                            href="#get-started"
                            onClick={() => setIsOpen(false)}
                            className="w-full bg-[#262320] text-[#FAF8F5] py-4 rounded-2xl text-center font-medium shadow-[0_12px_24px_rgba(38,35,32,0.25)] hover:bg-[#383430] transition-colors"
                        >
                            Get Started
                        </a>
                    </div>
                )}

            </div>
        </nav>
    );
}