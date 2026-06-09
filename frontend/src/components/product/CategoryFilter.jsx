import React from 'react';

/**
 * @param {string} activeCategory - The currently selected category string state from parent
 * @param {Function} onCategoryChange - Callback to update selected catalog track down in parent state
 */
export default function CategoryFilter({ activeCategory = 'All', onCategoryChange }) {

    // Explicitly mapping your required Zmarket marketplace categories
    const categories = [
        { id: 'all', label: 'All' },
        { id: 'electronics', label: 'Electronics' },
        { id: 'fashion', label: 'Fashion' },
        { id: 'books', label: 'Books' }
    ];

    return (
        <div className="rounded-lg border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm font-sans overflow-hidden transition-colors duration-200">
            {/* Sidebar Section Header Label */}
            <div className="p-4 border-b border-[var(--border-light)] bg-[var(--bg-surface)] transition-colors">
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Departments
                </h3>
            </div>

            {/* Vertical Interaction Track Stack */}
            <div className="p-2 flex flex-col gap-1">
                {categories.map((category) => {
                    const isActive = activeCategory.toLowerCase() === category.label.toLowerCase();

                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => onCategoryChange && onCategoryChange(category.label)}
                            className={`w-full px-4 py-3 rounded-md text-[14px] font-medium text-left transition-all duration-150 focus:outline-none flex items-center justify-between group
                                ${isActive
                                    ? 'bg-[var(--primary-muted)] text-[var(--primary)] font-semibold'
                                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)]'
                                }`
                            }
                        >
                            <span>{category.label}</span>

                            {/* Visual indicator micro-node that responds cleanly on tab focus or hover parameters */}
                            <span className={`text-[11px] transition-transform duration-200 
                                ${isActive
                                    ? 'translate-x-0 opacity-100 text-[var(--primary)]'
                                    : 'translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-60 text-[var(--text-muted)]'
                                }`}
                            >
                                ➔
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}