import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * @param {string} title - The header text for the filter category (e.g., "INTERNAL STORAGE")
 * @param {Array} options - Array of option objects: [{ id: '1', label: '50% or more' }]
 * @param {Array} selectedValues - Array of currently checked IDs
 * @param {Function} onChange - Callback triggered when a checkbox state changes
 * @param {boolean} defaultOpen - Determines if the section is expanded initially
 */
export default function CategoryFilter({
    title,
    options = [],
    selectedValues = [],
    onChange,
    defaultOpen = false
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleCheckboxChange = (optionId) => {
        if (!onChange) return;

        // Toggle logic passed up to parent component state
        if (selectedValues.includes(optionId)) {
            onChange(selectedValues.filter((id) => id !== optionId));
        } else {
            onChange([...selectedValues, optionId]);
        }
    };

    return (
        <div className="border-b border-[#f0f0f0] bg-white font-sans text-[#212121]">
            {/* Accordion Trigger Header Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 px-4 flex items-center justify-between font-semibold text-[13px] tracking-wide text-left select-none hover:bg-gray-50/50 transition-colors focus:outline-none"
            >
                <span className="uppercase">{title}</span>
                <ChevronDown
                    className={`w-4 h-4 text-[#878787] transition-transform duration-200 ease-out
            ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>

            {/* Expandable Content Container */}
            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out
          ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
            >
                <div className="px-4 pb-5 flex flex-col gap-3.5">
                    {options.length > 0 ? (
                        options.map((option) => {
                            const isChecked = selectedValues.includes(option.id);
                            return (
                                <label
                                    key={option.id}
                                    className="flex items-center gap-3 cursor-pointer select-none text-[14px] font-normal text-[#212121] group"
                                >
                                    {/* Styled Checkbox Wrapper */}
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleCheckboxChange(option.id)}
                                        className="w-[14px] h-[14px] rounded-sm border-gray-300 text-[#2874f0] accent-[#2874f0] cursor-pointer focus:ring-0 focus:ring-offset-0"
                                    />
                                    {/* Option Label Text */}
                                    <span className="group-hover:text-black transition-colors">
                                        {option.label}
                                    </span>
                                </label>
                            );
                        })
                    ) : (
                        <span className="text-[13px] text-[#878787] italic font-normal py-1">
                            No filters available
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}