import React, { useState } from 'react';
import { Instagram, Facebook, ArrowRight, Plus, Minus } from 'lucide-react';

export default function Footer() {
    // Mobile accordion state
    const [openSection, setOpenSection] = useState('formulas');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    // Structured Link Data
    const sections = {
        formulas: {
            title: { fr: 'Nos formules', en: 'Our formulas' },
            links: ['Calm My Mind', 'Digest delight', 'Slim my body']
        },
        science: {
            title: { fr: 'Science', en: 'Science' },
            links: ['Les études cliniques', 'Nos engagements', 'Nos ingrédients']
        },
        brand: {
            title: { fr: 'La marque', en: 'The brand' },
            links: ['Notre philosophie', 'Devenir testeur', 'Journal', 'FAQ']
        },
        assistance: {
            title: { fr: 'Assistance', en: 'Support' },
            links: ['Politique de confidentialité', 'Livraisons et retours', 'Nous contacter', 'CGV']
        }
    };

    return (
        <footer className="w-full bg-[#FAF9F6] text-[#111111] font-mono border-t border-gray-200 select-none">

            {/* ==========================================
          DESKTOP ONLY: TOP VALUE PROPS ROW
          ========================================== */}
            <div className="hidden lg:grid grid-cols-4 border-b border-gray-200 divide-x divide-gray-200 text-center text-[11px] tracking-wider uppercase py-8 px-4">
                <div>
                    <h4 className="font-bold mb-1">Livraison Express</h4>
                    <p className="text-gray-500 normal-case font-sans text-[12px]">Commande passée avant midi<br />chez vous le lendemain</p>
                </div>
                <div>
                    <h4 className="font-bold mb-1">Testé Cliniquement</h4>
                    <p className="text-gray-500 normal-case font-sans text-[12px]">Souches probiotiques<br />testées cliniquement</p>
                </div>
                <div>
                    <h4 className="font-bold mb-1">Formules Naturelles</h4>
                    <p className="text-gray-500 normal-case font-sans text-[12px]">Vegan, sans gluten,<br />sans lactose, sans OGM</p>
                </div>
                <div>
                    <h4 className="font-bold mb-1">Besoin de réfléchir ?</h4>
                    <p className="text-gray-500 normal-case font-sans text-[12px]">0 stress<br />30 jours pour changer d'avis</p>
                </div>
            </div>

            {/* ==========================================
          MOBILE ONLY: TOP SOCIALS BAR
          ========================================== */}
            <div className="lg:hidden flex items-center gap-4 p-6 pb-2">
                <a href="#instagram" className="text-[#111111] hover:opacity-70 transition-opacity" aria-label="Instagram">
                    <Instagram className="w-5 h-5 stroke-[1.5]" />
                </a>
                <a href="#facebook" className="text-[#111111] hover:opacity-70 transition-opacity" aria-label="Facebook">
                    <Facebook className="w-5 h-5 stroke-[1.5]" />
                </a>
            </div>

            {/* ==========================================
          GIANT MARQUEE HEADLINE LOGO SECTION
          ========================================== */}
            <div className="w-full overflow-hidden border-b border-gray-200 py-4 lg:py-6 px-4 flex justify-center items-center">
                <h1 className="text-[17vw] font-bold tracking-[-0.04em] leading-none text-[#1A1A1A] font-sans lowercase select-none">
                    kosbiotic
                </h1>
            </div>

            {/* ==========================================
          DESKTOP MAIN INTERIOR LINK GRID
          ========================================== */}
            <div className="hidden lg:grid grid-cols-5 border-b border-gray-200">
                {/* Left Newsletter Block */}
                <div className="col-span-1 p-8 border-r border-gray-200 flex flex-col justify-between min-h-[220px]">
                    <div>
                        <h3 className="text-[13px] font-bold uppercase tracking-wider mb-4">Newsletter</h3>
                        <div className="relative border-b border-gray-300 pb-1 flex items-center">
                            <input
                                type="email"
                                placeholder="monemail@mail.com"
                                className="w-full bg-transparent text-[13px] font-sans text-[#111111] placeholder-gray-400 focus:outline-none"
                            />
                            <button className="text-gray-500 hover:text-black transition-colors" aria-label="Subscribe">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <span className="text-[9px] text-gray-400 uppercase tracking-tight block mt-3">J'accepte les conditions</span>
                    </div>

                    {/* Bottom Left Social Row */}
                    <div className="flex items-center gap-4 pt-4">
                        <a href="#instagram" className="text-[#111111] hover:opacity-60 transition-opacity">
                            <Instagram className="w-[18px] h-[18px] stroke-[1.5]" />
                        </a>
                        <a href="#facebook" className="text-[#111111] hover:opacity-60 transition-opacity">
                            <Facebook className="w-[18px] h-[18px] stroke-[1.5]" />
                        </a>
                    </div>
                </div>

                {/* Dynamic Desktop Links Mapping */}
                {Object.entries(sections).map(([key, value]) => (
                    <div key={key} className="col-span-1 p-8 flex flex-col gap-4 text-left">
                        <h3 className="text-[12px] font-bold tracking-wider text-gray-500 uppercase">{value.title.fr}</h3>
                        <ul className="flex flex-col gap-2.5 text-[13px] font-sans font-normal text-[#111111]">
                            {value.links.map((link, i) => (
                                <li key={i}>
                                    <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="hover:underline underline-offset-4 decoration-gray-300">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* ==========================================
          MOBILE MAIN COLLAPSIBLE ACCORDIONS
          ========================================== */}
            <div className="lg:hidden w-full divide-y divide-dashed divide-gray-300 px-4 border-b border-gray-200">
                {Object.entries(sections).map(([key, value]) => {
                    const isOpen = openSection === key;
                    return (
                        <div key={key} className="w-full py-1">
                            <button
                                type="button"
                                onClick={() => toggleSection(key)}
                                className="w-full py-4 flex items-center justify-between text-left font-sans text-[15px] font-normal text-[#111111]"
                            >
                                <span>{value.title.en}</span>
                                {isOpen ? (
                                    <Minus className="w-4 h-4 text-[#111111] stroke-[1.5]" />
                                ) : (
                                    <Plus className="w-4 h-4 text-[#111111] stroke-[1.5]" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? 'max-h-48 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
                            >
                                <ul className="flex flex-col gap-3 pl-1 font-sans text-[14px] text-gray-500">
                                    {value.links.map((link, i) => (
                                        <li key={i}>
                                            <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="hover:text-black">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ==========================================
          BOTTOM LEGAL / COPYRIGHT BAR
          ========================================== */}
            <div className="w-full px-4 lg:px-8 py-6 flex items-center justify-between text-[10px] tracking-widest text-gray-400 uppercase font-mono">
                <div>COPYRIGHT KOSBIOTIC 2026</div>

                {/* Desktop-only chat floating indicator hook placement */}
                <div className="hidden lg:block">
                    {/* Placeholder anchor element mapping the bottom right widget spot */}
                </div>
            </div>

        </footer>
    );
}