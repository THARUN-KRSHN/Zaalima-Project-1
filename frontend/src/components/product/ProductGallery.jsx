import React, { useState } from 'react';

export default function ProductGallery({ images = [] }) {
    const galleryImages = images.length > 0 ? images : [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80"
    ];

    const [activeImg, setActiveImg] = useState(galleryImages[0]);

    return (
        /* Responsive flex direction: Horizontal strip on mobile, side-by-side vertical track on desktop */
        <div className="flex flex-col-reverse lg:flex-row gap-4 w-full select-none items-start">

            {/* THUMBNAIL TRACK: Side vertical list on desktop, bottom horizontal row on mobile and tablet */}
            <div className="flex lg:flex-col gap-3 w-full lg:w-20 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 scrollbar-none shrink-0">
                {galleryImages.map((img, idx) => {
                    const isActive = img === activeImg;
                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveImg(img)}
                            className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 bg-[var(--bg-surface-hover)] shrink-0 transition-all focus:outline-none
                                ${isActive
                                    ? 'border-[var(--primary)] scale-95 shadow-sm'
                                    : 'border-[var(--border-light)] opacity-60 hover:opacity-100'
                                }`}
                        >
                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    );
                })}
            </div>

            {/* MASTER CANVAS VIEW: Sized to fit both image and thumbnails fully in the initial viewport */}
            <div className="w-full h-[280px] sm:h-[360px] lg:h-[500px] rounded-2xl overflow-hidden bg-[var(--bg-surface-hover)] border border-[var(--border-light)] shadow-sm transition-colors duration-300">
                <img
                    src={activeImg}
                    alt="Main Product Preview"
                    className="w-full h-full object-contain bg-[var(--bg-surface-hover)] transition-all duration-300"
                />
            </div>

        </div>
    );
}