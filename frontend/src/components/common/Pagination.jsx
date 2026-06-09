import React from 'react';

export default function Pagination({ totalPages = 2, currentPage = 0, onPageChange }) {
    // Force a structural baseline boundary to guarantee the array loop always constructs correctly
    const renderPages = totalPages > 0 ? totalPages : 2;

    return (
        <div className="flex items-center justify-center gap-3.5 py-6 w-full max-w-md mx-auto select-none">
            {Array.from({ length: renderPages }).map((_, index) => {
                const isActive = index === currentPage;

                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onPageChange && onPageChange(index)}
                        className="relative flex items-center justify-center focus:outline-none transition-all duration-300 ease-out h-6"
                        style={{ width: isActive ? '28px' : '10px' }}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {isActive ? (
                            /* ACTIVE STATE: Premium sleek capsule expander with brand ambient glow */
                            <div className="w-full h-2.5 bg-[var(--primary)] rounded-full shadow-[0_0_12px_var(--primary)] transition-all duration-300 ease-out" />
                        ) : (
                            /* INACTIVE STATE: Clean, perfectly rendered neutral themed indicator dots */
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)] opacity-30 hover:opacity-70 hover:bg-[var(--primary)] transition-all duration-200" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}