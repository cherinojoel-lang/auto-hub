import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, Shield, Calendar, Check } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  text: string;
  source: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Detlef Wennemann',
    text: 'Ich habe 14 Jahre kein Auto gekauft und auf vieles gefasst. Hier lief alles super, da macht der Autokauf Spaß. Ich bin selbst aus Xanten (120km) angereist um hier ein tolles Auto zu kaufen bei dem alles passt.',
    source: 'mobile.de',
    verified: true,
  },
  {
    id: '2',
    name: 'Nicole Christiansen',
    text: 'Herr Pappas, ist ein super freundlicher, kompetenter Verkäufer. Auch jetzt beim Kauf des zweiten Autos wurden wir super beraten und es wurde alles unkompliziert abgeschlossen. Jedes weitere Auto würde ich wieder bei Herrn Pappas kaufen.',
    source: 'mobile.de',
    verified: true,
  },
  {
    id: '3',
    name: 'Tsormpatzidis Nikolaos',
    text: 'Von Anfang bis Ende, alles einfach top! Telefonat, Beratung und super Erklärung. Und vor allem Ehrlichkeit.',
    source: 'mobile.de',
    verified: true,
  },
  {
    id: '4',
    name: 'Karadogan',
    text: 'Vom ersten Gespräch bis zur Abholung alles super und schnell gelaufen. Der Händler ist sehr engagiert und kümmert sich zuverlässig um jedes Anliegen. Das Fahrzeug wurde in einem Top Zustand übergeben.',
    source: 'mobile.de',
    verified: true,
  },
  {
    id: '5',
    name: 'Marc',
    text: 'Von 1 Tag an ein super tolles Gefühl bekommen. Das Fahrzeug wurde wie abgesprochen in einem super Zustand Übergeben. Immer wieder gerne bei dem Händler',
    source: 'mobile.de',
    verified: true,
  },
];

const StarRating: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size} className="fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

export default function SocialProofSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Determine visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle touch swipe
  const touchStartRef = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section className="w-full bg-slate-800 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 sm:mb-6">
            Das sagen unsere Kunden
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mb-6 sm:mb-8">
            157 Bewertungen — 5,0 von 5,0 Sterne — 100% Weiterempfehlung
          </p>
          
          {/* mobile.de Badge */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-slate-400">Bewertet auf</p>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">mobile.de</span>
              <StarRating size={20} />
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="relative mb-12 sm:mb-16"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Kundenbewertungen Karussell"
        >
          {/* Review Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="mx-2 sm:mx-3 md:mx-4 h-full">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 h-full flex flex-col backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                      {/* Stars */}
                      <div className="mb-4 sm:mb-6">
                        <StarRating size={16} />
                      </div>

                      {/* Quote Text */}
                      <p className="text-base sm:text-lg text-slate-200 italic font-paragraph leading-relaxed mb-6 sm:mb-8 flex-grow min-h-[120px]">
                        "{review.text}"
                      </p>

                      {/* Name and Badge */}
                      <div className="border-t border-white/10 pt-4 sm:pt-6">
                        <p className="text-sm sm:text-base font-bold text-white mb-2">
                          — {review.name}
                        </p>
                        {review.verified && (
                          <div className="flex items-center gap-2">
                            <Check size={14} className="text-green-400 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-green-400 font-medium">
                              Verifizierter Kauf
                            </span>
                          </div>
                        )}
                        <p className="text-xs text-slate-500 mt-2">{review.source}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 sm:-translate-x-8 md:-translate-x-12 w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center z-10"
            aria-label="Vorherige Bewertung"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 sm:translate-x-8 md:translate-x-12 w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center z-10"
            aria-label="Nächste Bewertung"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-12 sm:mb-16">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlay(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Gehe zu Bewertung ${index + 1}`}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 sm:pt-12 border-t border-white/10">
          {/* mobile.de */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-white font-bold text-lg">mobile.de</span>
              <StarRating size={16} />
            </div>
            <p className="text-xs sm:text-sm text-slate-400">5,0 Sterne</p>
          </div>

          {/* Seit 1982 */}
          <div className="flex flex-col items-center text-center">
            <Calendar size={24} className="text-white/60 mb-3" />
            <p className="text-white font-bold text-lg mb-1">Seit 1982</p>
            <p className="text-xs sm:text-sm text-slate-400">42 Jahre Erfahrung</p>
          </div>

          {/* 100% Weiterempfehlung */}
          <div className="flex flex-col items-center text-center">
            <Heart size={24} className="text-white/60 mb-3" />
            <p className="text-white font-bold text-lg mb-1">100%</p>
            <p className="text-xs sm:text-sm text-slate-400">Weiterempfehlung</p>
          </div>

          {/* Geprüfte Fahrzeuge */}
          <div className="flex flex-col items-center text-center">
            <Shield size={24} className="text-white/60 mb-3" />
            <p className="text-white font-bold text-lg mb-1">Geprüft</p>
            <p className="text-xs sm:text-sm text-slate-400">Alle Fahrzeuge</p>
          </div>
        </div>
      </div>
    </section>
  );
}
