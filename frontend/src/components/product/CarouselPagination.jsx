import React from 'react';

/**
 * @param {number} totalPages - Total number of pages or items (e.g., 6 based on your image)
 * @param {number} currentPage - Zero-indexed indicator representing the active slide
 * @param {Function} onPageChange - Callback function to transition pages on click
 */
export default function CarouselPagination({ totalPages = 6, currentPage = 1, onPageChange }) {
    return (
        <div className="flex items-center justify-center gap-5 py-6 bg-[#1A1A1A] rounded-xl w-full max-w-md mx-auto select-none">
            {Array.from({ length: totalPages }).map((_, index) => {
                const isActive = index === currentPage;

                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onPageChange && onPageChange(index)}
                        className="relative flex items-center justify-center focus:outline-none group h-8 w-8"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {isActive ? (
                            /* ACTIVE STATE: Clean Solid Light-Grey Filled Circle */
                            <div className="w-3.5 h-3.5 bg-[#E2E8F0] rounded-full shadow-sm transform scale-110 transition-all duration-300 ease-out" />
                        ) : (
                            /* INACTIVE STATE: Concentric Outer Ring + Center Pin Dot */
                            <div className="relative w-6 h-6 rounded-full border-2 border-white/90 flex items-center justify-center transition-all duration-200 group-hover:border-white group-hover:scale-105">
                                {/* Micro center dot */}
                                <div className="w-1.5 h-1.5 bg-white/90 rounded-full group-hover:bg-white" />
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}