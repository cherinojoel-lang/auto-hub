import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Calculator, Key } from 'lucide-react';

interface StepProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
}

const Step: React.FC<StepProps> = ({ number, icon, title, description, isVisible, delay }) => {
  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      aria-label={`Schritt ${number}: ${title}`}
    >
      {/* Desktop: Vertical layout with number on top */}
      <div className="hidden md:flex flex-col items-center relative">
        {/* Number Circle */}
        <div className="w-12 h-12 rounded-full border-2 border-secondary bg-white flex items-center justify-center mb-5 relative z-10">
          <span className="text-xl font-bold text-secondary">{number}</span>
        </div>

        {/* Icon */}
        <div className="mb-4 text-foreground">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center leading-relaxed max-w-xs">
          {description}
        </p>
      </div>

      {/* Mobile: Horizontal layout with number on left */}
      <div className="md:hidden flex gap-4 relative">
        {/* Number Circle - Left aligned */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full border-2 border-secondary bg-white flex items-center justify-center relative z-10">
            <span className="text-xl font-bold text-secondary">{number}</span>
          </div>
        </div>

        {/* Content - Right side */}
        <div className="flex-1 pt-1">
          {/* Icon */}
          <div className="mb-2 text-foreground">
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // ⚡ Bolt: Prevent memory leaks by using entry.target instead of closed-over DOM element
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '01',
      icon: <Search size={40} />,
      title: 'Fahrzeug finden',
      description: 'Durchsuchen Sie unseren Bestand online oder teilen Sie uns Ihre Wünsche mit — wir finden das passende Fahrzeug für Sie.',
    },
    {
      number: '02',
      icon: <Calendar size={40} />,
      title: 'Probefahrt vereinbaren',
      description: 'Vereinbaren Sie einen unverbindlichen Termin für eine Probefahrt und persönliche Beratung vor Ort.',
    },
    {
      number: '03',
      icon: <Calculator size={40} />,
      title: 'Finanzierung klären',
      description: 'Wir finden gemeinsam die optimale Finanzierung, Leasing-Rate oder bereiten den Barkauf vor.',
    },
    {
      number: '04',
      icon: <Key size={40} />,
      title: 'Auto übernehmen',
      description: 'Wir erledigen Zulassung und Übergabe — Sie müssen nur noch einsteigen und losfahren.',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 bg-surface-muted"
      aria-label="So funktioniert's - Unser Prozess"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            So finden Sie Ihr Traumauto
          </h2>
          <p
            className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Vier einfache Schritte zu Ihrem neuen Fahrzeug — transparent, unkompliziert und persönlich.
          </p>
        </div>

        {/* Desktop: Steps with connecting line */}
        <div className="hidden md:block relative mb-12">
          {/* Connecting Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <Step
                key={step.number}
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isVisible={isVisible}
                delay={index * 150}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Steps with vertical connecting line */}
        <div className="md:hidden relative mb-12">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

          {/* Steps Stack */}
          <div className="space-y-8 relative z-10">
            {steps.map((step, index) => (
              <Step
                key={step.number}
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isVisible={isVisible}
                delay={index * 150}
              />
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {/* Primary Button */}
          <Link
            to="/fahrzeugbestand"
            className="px-8 py-3 bg-secondary text-white font-bold rounded-sm hover:bg-red-700 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 text-base min-h-[48px] whitespace-nowrap"
            aria-label="Fahrzeuge entdecken - Zu unserem Fahrzeugbestand"
          >
            Fahrzeuge entdecken
          </Link>

          {/* Secondary Button */}
          <Link
            to="/kontakt"
            className="px-8 py-3 bg-transparent border-2 border-secondary text-secondary font-bold rounded-sm hover:bg-secondary hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 text-base min-h-[48px] whitespace-nowrap"
            aria-label="Beratungstermin vereinbaren - Kontaktformular"
          >
            Beratungstermin vereinbaren
          </Link>
        </div>
      </div>
    </section>
  );
}
