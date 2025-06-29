import React, { useState, useEffect } from 'react';

interface CarrouselProps {
    slides: React.ReactNode[];
    captions?: string[];
    autoScroll?: boolean;
    interval?: number;
}

const Carrousel: React.FC<CarrouselProps> = ({
    slides,
    captions = [],
    autoScroll = true,
    interval = 3000,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalSlides = slides.length;

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

    useEffect(() => {
        if (!autoScroll || totalSlides <= 1) return;

        const timer = setInterval(goToNext, interval);
        return () => clearInterval(timer);
    }, [currentIndex, autoScroll, interval, totalSlides]);

    if (totalSlides === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                Aucun contenu à afficher.
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto shadow-xl select-none">
            <div className="w-full h-96 overflow-hidden flex items-center justify-center bg-white">
                {slides[currentIndex]}
            </div>

            {captions.length > currentIndex && (
                <div className="absolute top-0 left-0 w-full bg-black bg-opacity-70 text-white p-3 text-center text-lg font-semibold backdrop-blur-sm pointer-events-none">
                    {captions[currentIndex]}
                </div>
            )}

            {/* Flèche gauche */}
            <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 text-black hover:bg-opacity-100 transition"
                aria-label="Slide précédente"
            >
                ◀
            </button>

            {/* Flèche droite */}
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 text-black hover:bg-opacity-100 transition"
                aria-label="Slide suivante"
            >
                ▶
            </button>
        </div>
    );
};

export default Carrousel;
