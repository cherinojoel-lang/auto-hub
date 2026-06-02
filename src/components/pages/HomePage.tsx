// WI-HPI
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Award, Users, Calendar, ShieldCheck, Car } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { updateMetaTags, getStructuredDataOrganization } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, generateBusinessSchema, SITE_CONFIG } from '@/lib/seo-config';

import VehicleInventorySection from '@/components/VehicleInventorySection';
import ContactSection from '@/components/ContactSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ReviewsSchema from '@/components/schemas/ReviewsSchema';
import { aggregateRating } from '@/data/reviewsData';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

// --- Animation Components ---


export default function HomePage() {
  useEffect(() => {
    // Update SEO for homepage
    updateMetaTags({
      title: PAGE_METADATA.home.title,
      description: PAGE_METADATA.home.description,
      keywords: 'Gebrauchtwagen Iserlohn, Gebrauchtwagen Letmathe, Autohaus Iserlohn, Gebrauchtwagen kaufen, Audi Gebrauchtwagen, BMW Gebrauchtwagen, Mercedes Gebrauchtwagen, VW Gebrauchtwagen, Porsche Gebrauchtwagen, Automobile Quick, Fahrzeugbestand, Iserlohn-Letmathe',
      ogTitle: 'Automobile Quick | Gebrauchtwagen in Iserlohn-Letmathe',
      ogDescription: PAGE_METADATA.home.description,
      ogImage: `${SITE_CONFIG.url}/images/logo-og.png`,
      canonicalUrl: `${SITE_CONFIG.url}/`,
      structuredData: getStructuredDataOrganization(),
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-paragraph text-foreground overflow-x-hidden">
      <SeoHead 
        title={PAGE_METADATA.home.title}
        description={PAGE_METADATA.home.description}
        url={`${SITE_CONFIG.url}/`}
        schema={generateBusinessSchema()}
      />
      <a href="#main-content" className="skip-to-main">
        Zum Hauptinhalt springen
      </a>
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[calc(100svh-64px)] lg:min-h-[calc(100svh-72px)] flex items-center justify-center overflow-hidden" role="banner" aria-label="Automobile Quick - Gebrauchtwagen in Iserlohn-Letmathe">
        {/* Background Image with Dark Overlay Gradient */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-bg.png" 
            alt="Automobile Quick Autohaus - Gebrauchtwagen in Iserlohn-Letmathe seit 1982" 
            className="w-full h-full object-cover object-center"
            width={1600}
            height={900}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-primary/75"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-left py-10 sm:py-14 lg:py-20 w-full">
          <div className="max-w-[760px]">
            {/* Eyebrow */}
            <AnimatedElement direction="up" delay={0} priority={true}>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-secondary mb-4">
                Automobile Quick · Iserlohn-Letmathe · seit 1982
              </p>
            </AnimatedElement>

            {/* Headline */}
            <AnimatedElement direction="up" delay={100} priority={true}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[64px] font-heading font-bold text-white mb-5 sm:mb-6 leading-[1.05]">
                Gebrauchtwagen,<br />
                <span className="text-secondary">denen Sie vertrauen.</span>
              </h1>
            </AnimatedElement>

            {/* Subheadline mit echtem Trust-Anker */}
            <AnimatedElement direction="up" delay={200} priority={true}>
              <p className="text-base sm:text-lg md:text-xl text-white/95 font-paragraph font-normal mb-8 sm:mb-10 leading-relaxed max-w-[680px]">
                Persönlich. Ehrlich. Über {aggregateRating.reviewCount} verifizierte Kundenbewertungen
                mit einer Gesamtnote von{' '}
                <span className="font-bold text-white">
                  {aggregateRating.ratingValue.toFixed(2).replace('.', ',')} / 5
                </span>{' '}
                Sternen auf mobile.de und AutoScout24.
              </p>
            </AnimatedElement>

            {/* CTA Buttons with animation */}
            <AnimatedElement direction="up" delay={400} priority={true}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 flex-wrap">
                {/* Primary CTA: Jetzt Fahrzeuge entdecken */}
                <Link
                  to="/fahrzeugbestand"
                  className="px-6 sm:px-8 py-3.5 bg-secondary text-white font-bold rounded-md hover:bg-cta-hover transition-colors duration-200 inline-flex items-center justify-center gap-2 text-base min-h-[52px] whitespace-nowrap"
                >
                  Jetzt Fahrzeuge entdecken
                  <ChevronRight size={20} />
                </Link>

                {/* Secondary CTA: Probefahrt vereinbaren */}
                <Link
                  to="/kontakt"
                  className="px-6 sm:px-8 py-3.5 bg-white/5 border border-white/80 text-white font-bold rounded-md hover:bg-white hover:text-primary transition-colors duration-200 inline-flex items-center justify-center gap-2 text-base min-h-[52px] whitespace-nowrap"
                  aria-label="Kontakt aufnehmen - Kontaktformular"
                >
                  Kontakt aufnehmen
                  <ChevronRight size={20} />
                </Link>

                {/* Phone CTA */}
                <a
                  href="tel:+492374912912"
                  className="px-5 sm:px-6 py-3.5 bg-transparent border border-white/45 text-white font-bold rounded-md hover:border-white hover:bg-white/10 transition-colors duration-200 inline-flex items-center justify-center gap-2 text-base min-h-[52px] whitespace-nowrap"
                >
                  <Phone size={18} />
                  +49 (0) 2374 / 912912
                </a>
              </div>
            </AnimatedElement>

            {/* Social Proof Strip */}
            <AnimatedElement direction="up" delay={600} priority={true}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/20">
                {/* Google trust */}
                <a
                  href="https://maps.app.goo.gl/zuvHCS86UcA9VTdv6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:opacity-90 transition-opacity"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl sm:text-3xl font-bold text-white">4,9</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">Google-Unternehmensprofil</p>
                  </div>
                </a>

                {/* Experience */}
                <div className="flex items-center gap-3">
                  <Calendar size={28} className="text-secondary flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-lg sm:text-xl font-bold text-white">Seit 1982</p>
                    <p className="text-xs sm:text-sm text-white/80">Erfahrung vor Ort</p>
                  </div>
                </div>

                {/* Advice */}
                <div className="flex items-center gap-3">
                  <ShieldCheck size={28} className="text-secondary flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-lg sm:text-xl font-bold text-white">Vor Ort</p>
                    <p className="text-xs sm:text-sm text-white/80">Persönliche Beratung</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Car size={28} className="text-secondary flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-lg sm:text-xl font-bold text-white">Echt</p>
                    <p className="text-xs sm:text-sm text-white/80">Fahrzeugbilder</p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* ... keep existing code (SEARCH SECTION removed for lead-focused homepage) ... */}

      {/* VEHICLE INVENTORY SECTION */}
      <VehicleInventorySection />

      {/* HOW IT WORKS SECTION */}
      <HowItWorksSection />

      {/* TRUST BAR */}
      <section className="bg-primary text-white border-b border-white/10 py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 text-center">
            <AnimatedElement delay={0}>
              <div className="flex flex-col items-center">
                <MapPin size={32} className="text-secondary mb-3" />
                <p className="text-base font-bold text-white mb-1">Lokal vor Ort</p>
                <p className="text-xs text-white/70">Iserlohn-Letmathe</p>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <div className="flex flex-col items-center">
                <ShieldCheck size={32} className="text-secondary mb-3" />
                <p className="text-base font-bold text-white mb-1">Geprüfte</p>
                <p className="text-xs text-white/70">Fahrzeuge</p>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <div className="flex flex-col items-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">Seit 1982</p>
                <p className="text-base font-bold text-white mb-1">Jahre</p>
                <p className="text-xs text-white/70">Erfahrung</p>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={300}>
              <div className="flex flex-col items-center">
                <Users size={32} className="text-secondary mb-3" />
                <p className="text-base font-bold text-white mb-1">Persönliche</p>
                <p className="text-xs text-white/70">Beratung</p>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={400}>
              <div className="flex flex-col items-center">
                <Award size={32} className="text-secondary mb-3" />
                <p className="text-base font-bold text-white mb-1">Geprüfte</p>
                <p className="text-xs text-white/70">Fahrzeuge</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — echte 204 Bewertungen */}
      <ReviewsSchema />
      <TestimonialsSection />

      {/* ABOUT SECTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-surface">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            <AnimatedElement direction="left">
              <div className="bg-white p-8 sm:p-10 rounded-md border border-border-line border-l-4 border-l-secondary h-full">
                <Award size={44} className="mb-6 text-secondary" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4 text-primary">Geprüfte Fahrzeuge</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Alle Fahrzeuge werden sorgfältig geprüft und inspiziert, um höchste Qualitätsstandards zu gewährleisten.</p>
              </div>
            </AnimatedElement>
            <AnimatedElement direction="up" delay={100}>
              <div className="bg-white p-8 sm:p-10 rounded-md border border-border-line border-l-4 border-l-secondary h-full">
                <Users size={44} className="mb-6 text-secondary" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4 text-primary">Persönliche Beratung</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Unser erfahrenes Team berät Sie kompetent und fair – ganz nach Ihren individuellen Wünschen und Anforderungen.</p>
              </div>
            </AnimatedElement>
            <AnimatedElement direction="right" delay={200}>
              <div className="bg-white p-8 sm:p-10 rounded-md border border-border-line border-l-4 border-l-secondary h-full">
                <Award size={44} className="mb-6 text-secondary" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4 text-primary">Seit 1982</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Ein verlässlicher Partner für hochwertige Gebrauchtwagen in Iserlohn-Letmathe und der Region.</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* TRADE-IN TEASER */}
      <section className="py-12 sm:py-16 md:py-20 bg-surface">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement>
            <div className="bg-primary rounded-md p-10 sm:p-14 md:p-16 text-center text-white border-b-4 border-secondary">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 sm:mb-8">
                Sie möchten Ihr Auto verkaufen?
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                Automobile Quick prüft Ihr Fahrzeug persönlich vor Ort. Kontaktieren Sie uns für eine unverbindliche Anfrage.
              </p>
              <Link
                to="/autoankauf"
                className="inline-flex items-center gap-3 px-10 py-4 bg-secondary text-white font-bold rounded-md hover:bg-cta-hover transition-colors duration-200 text-lg min-h-[52px]"
              >
                Autoankauf anfragen
                <ChevronRight size={24} />
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* FINANCING TEASER */}
      <section className="py-12 sm:py-16 md:py-20 bg-surface">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement>
            <div className="bg-white rounded-md p-10 sm:p-14 md:p-16 text-center border border-border-line border-b-4 border-b-secondary">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary mb-6 sm:mb-8">
                Flexible Finanzierungslösungen
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                Wir bieten attraktive Finanzierungsmöglichkeiten für Ihren Traumwagen. Lassen Sie sich von unserem Team beraten.
              </p>
              <Link
                to="/finanzierung"
                className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white font-bold rounded-md hover:bg-primary/90 transition-colors duration-200 text-lg min-h-[52px]"
              >
                Finanzierung anfragen
                <ChevronRight size={24} />
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* CONTACT SECTION - NEW REDESIGNED CONTACT SECTION */}
      <ContactSection />

      {/* ... keep existing code (old CONTACT & LOCATION SECTION removed) ... */}

     </div>
  );
}
