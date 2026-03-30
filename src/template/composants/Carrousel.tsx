import React, { useEffect, useState } from 'react';
import {
    BUTTONCARROUSELLEARROWLEFT,
    BUTTONCARROUSELLEARROWRIGHT,
    GLOBALCARROUSELLE,
    SLIDECARROUSELLE
} from '../../styles/tw';

interface DownloadItem {
    label: string;
    href: string;
    download?: boolean;
}

interface MenuItem {
    title: string;
    description?: string;
    downloads?: DownloadItem[];
}

interface CarrouselProps {
    slides: React.ReactNode[];
    captions?: string[];
    autoScroll?: boolean;
    interval?: number;
    showMenu?: boolean;
    menuItems?: MenuItem[];
}

const Carrousel: React.FC<CarrouselProps> = ({
    slides,
    captions = [],
    autoScroll = true,
    interval = 3000,
    showMenu = false,
    menuItems = [],
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDesktopMenuCollapsed, setIsDesktopMenuCollapsed] = useState(false);

    const totalSlides = slides.length;
    const currentMenuItem = menuItems[currentIndex];

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!autoScroll || totalSlides <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(timer);
    }, [autoScroll, interval, totalSlides]);

    if (totalSlides === 0) {
        return (
            <div className="py-8 text-center text-gray-500">
                Aucun contenu à afficher.
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className={`flex flex-col gap-6 ${showMenu ? 'lg:flex-row lg:items-stretch' : ''}`}>
                <div
                    className={`relative transition-all duration-300 ${
                        showMenu
                            ? isDesktopMenuCollapsed
                                ? 'w-full lg:basis-[calc(100%-88px)] lg:max-w-[calc(100%-88px)]'
                                : 'w-full lg:basis-[68%] lg:max-w-[68%]'
                            : 'w-full'
                    }`}
                >
                    <div className={`${GLOBALCARROUSELLE} relative h-full min-h-[420px] lg:min-h-[620px]`}>
                        <div className={`${SLIDECARROUSELLE} h-full`}>
                            {slides[currentIndex]}
                        </div>

                        {captions.length > currentIndex && (
                            <div className="pointer-events-none absolute top-0 left-0 w-full bg-black/70 p-3 text-center text-lg font-semibold text-white backdrop-blur-sm">
                                {captions[currentIndex]}
                            </div>
                        )}

                        {totalSlides > 1 && (
                            <>
                                <button
                                    onClick={goToPrevious}
                                    className={BUTTONCARROUSELLEARROWLEFT}
                                    aria-label="Slide précédente"
                                    type="button"
                                >
                                    ◀
                                </button>

                                <button
                                    onClick={goToNext}
                                    className={BUTTONCARROUSELLEARROWRIGHT}
                                    aria-label="Slide suivante"
                                    type="button"
                                >
                                    ▶
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {showMenu && currentMenuItem && (
                    <div
                        className={`relative transition-all duration-300 ${
                            isDesktopMenuCollapsed
                                ? 'w-full lg:basis-[72px] lg:max-w-[72px] lg:min-w-[72px]'
                                : 'w-full lg:basis-[32%] lg:max-w-[32%]'
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setIsDesktopMenuCollapsed((prev) => !prev)}
                            aria-label={isDesktopMenuCollapsed ? 'Ouvrir le panneau' : 'Réduire le panneau'}
                            className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white shadow-md transition hover:bg-slate-100 lg:flex"
                        >
                            <span
                                className={`text-lg font-bold text-slate-700 transition-transform duration-300 ${
                                    isDesktopMenuCollapsed ? 'rotate-180' : 'rotate-0'
                                }`}
                            >
                                ‹
                            </span>
                        </button>

                        <aside className="h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                            <div className="relative flex h-full">
                                <div
                                    className={`flex h-full min-w-0 flex-1 flex-col p-5 transition-all duration-300 ${
                                        isDesktopMenuCollapsed
                                            ? 'opacity-0 pointer-events-none'
                                            : 'opacity-100'
                                    }`}
                                >
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                            Contenu associé
                                        </p>
                                        <h3 className="mt-2 text-2xl font-bold text-slate-900">
                                            {currentMenuItem.title}
                                        </h3>

                                        {currentMenuItem.description && (
                                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                                {currentMenuItem.description}
                                            </p>
                                        )}
                                    </div>

                                    {currentMenuItem.downloads && currentMenuItem.downloads.length > 0 && (
                                        <div className="mt-6 flex flex-col gap-3">
                                            <p className="text-sm font-semibold text-slate-800">
                                                Téléchargements
                                            </p>

                                            {currentMenuItem.downloads.map((item, index) => (
                                                <a
                                                    key={`${item.label}-${index}`}
                                                    href={item.href}
                                                    download={item.download}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                                >
                                                    {item.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {menuItems.length > 1 && (
                                        <div className="mt-6 flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
                                            <p className="text-sm font-semibold text-slate-800">
                                                Accès rapide
                                            </p>

                                            {menuItems.map((item, index) => (
                                                <button
                                                    key={`${item.title}-${index}`}
                                                    type="button"
                                                    onClick={() => goToSlide(index)}
                                                    className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                                                        index === currentIndex
                                                            ? 'bg-slate-900 text-white'
                                                            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                                                    }`}
                                                >
                                                    {item.title}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="hidden h-full w-[72px] shrink-0 items-center justify-center border-l border-slate-200 bg-slate-100 lg:flex">
                                    <p className="rotate-180 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 [writing-mode:vertical-rl]">
                                        Contenu
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carrousel;