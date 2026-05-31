// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Award, Users, Zap, Calendar, Gauge, Fuel, ShieldCheck, Car } from 'lucide-react';
import { vehiclesData, type Vehicle } from '@/data/vehiclesData.generated';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { updateMetaTags, getStructuredDataOrganization } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, generateBusinessSchema, SITE_CONFIG } from '@/lib/seo-config';

import VehicleInventorySection from '@/components/VehicleInventorySection';
import ContactSection from '@/components/ContactSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import { AnimatedElement } from '@/components/ui/animated-element';



// --- Main Page Component ---

export default function HomePage() {
  const [vehicles, setVehicle] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  


  useEffect(() => {
    // Update SEO for homepage
    updateMetaTags({
      title: PAGE_METADATA.home.title,
      description: PAGE_METADATA.home.description,
      keywords: 'Gebrauchtwagen Iserlohn, Gebrauchtwagen Letmathe, Autohaus Iserlohn, Gebrauchtwagen kaufen, Audi Gebrauchtwagen, BMW Gebrauchtwagen, Mercedes Gebrauchtwagen, VW Gebrauchtwagen, Porsche Gebrauchtwagen, Automobile Quick, Fahrzeugbestand, Iserlohn-Letmathe',
      ogTitle: 'Automobile Quick | Gebrauchtwagen in Iserlohn-Letmathe',
      ogDescription: PAGE_METADATA.home.description,
      ogImage: 'https://static.wixstatic.com/media/32e7c0_d28732f69d9643a7ada1b1be4890a422~mv2.png',
      canonicalUrl: `${SITE_CONFIG.url}/`,
      structuredData: getStructuredDataOrganization(),
    });
    
    loadVehicle();
  }, []);

  const loadVehicle = async () => {
    try {
      setIsLoading(true);
      // Use only currently available vehicles for visible inventory sections.
      const visibleVehicles = vehiclesData.filter(v => v.status === 'available');
      setVehicle(visibleVehicles);
    } catch (error) {
      console.error('Error loading vehicles:', error);
      // Silently handle error for now, as proper user-facing error state requires UI changes
    } finally {
      setIsLoading(false);
    }
  };


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
            src="https://static.wixstatic.com/media/32e7c0_72b43166ec7744bdb672b1eef573e535~mv2.png?originWidth=1600&originHeight=896" 
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
            {/* Headline with animation */}
            <AnimatedElement duration={1000} direction="up" delay={0}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[56px] font-heading font-bold text-white mb-5 sm:mb-6 tracking-normal leading-[1.12]">
                Gebrauchtwagen in Iserlohn-Letmathe
              </h1>
            </AnimatedElement>

            {/* Subheadline with animation */}
            <AnimatedElement duration={1000} direction="up" delay={200}>
              <p className="text-base sm:text-lg md:text-xl text-white/95 font-paragraph font-normal mb-8 sm:mb-10 leading-relaxed max-w-[680px]">
                Seit 1982 bietet Automobile Quick gepflegte Gebrauchtwagen, echte Fahrzeugbilder und persönliche Beratung direkt vor Ort.
              </p>
            </AnimatedElement>

            {/* CTA Buttons with animation */}
            <AnimatedElement duration={1000} direction="up" delay={400}>
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
            <AnimatedElement duration={1000} direction="up" delay={600}>
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
      <section className="bg-white border-b border-gray-200 py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 text-center">
            <AnimatedElement duration={1000} delay={0}>
              <div className="flex flex-col items-center">
                <MapPin size={32} className="text-secondary mb-3" />
                <p className="text-base font-bold text-primary mb-1">Lokal vor Ort</p>
                <p className="text-xs text-gray-600">Iserlohn-Letmathe</p>
              </div>
            </AnimatedElement>
            <AnimatedElement duration={1000} delay={100}>
              <div className="flex flex-col items-center">
                <ShieldCheck size={32} className="text-secondary mb-3" />
                <p className="text-base font-bold text-primary mb-1">Geprüfte</p>
                <p className="text-xs text-gray-600">Fahrzeuge</p>
              </div>
            </AnimatedElement>
            <AnimatedElement duration={1000} delay={200}>
              <div className="flex flex-col items-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">42</p>
                <p className="text-base font-bold text-primary mb-1">Jahre</p>
                <p className="text-xs text-gray-600">Erfahrung</p>
              </div>
            </AnimatedElement>
            <AnimatedElement duration={1000} delay={300}>
              <div className="flex flex-col items-center">
                <Users size={32} className="text-secondary mb-3" />
                <p className="text-base font-bold text-primary mb-1">Persönliche</p>
                <p className="text-xs text-gray-600">Beratung</p>
              </div>
            </AnimatedElement>
            <AnimatedElement duration={1000} delay={400}>
              <div className="flex flex-col items-center">
                <Award size={32} className="text-secondary mb-3" />
                <p className="text-base font-bold text-primary mb-1">Geprüfte</p>
                <p className="text-xs text-gray-600">Fahrzeuge</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* FEATURED VEHICLES SECTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-white" id="main-content">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement duration={1000}>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary mb-4 sm:mb-6">
                Aktuelle Fahrzeuge
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6">Entdecken Sie unsere neuesten Fahrzeuge mit bester Qualität und fairen Preisen</p>
              <div className="w-20 sm:w-32 h-1.5 bg-secondary mx-auto rounded-full"></div>
            </div>
          </AnimatedElement>

          <div className="relative min-h-[500px]">
            {/* Always render the grid container for refs to attach safely */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-opacity duration-500 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              {isLoading ? (
                // Loading Skeletons
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="bg-white rounded-md border border-border-line overflow-hidden animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-1/2 mt-4"></div>
                    </div>
                  </div>
                ))
              ) : vehicles.length > 0 ? (
                // Actual Data - Show first 6 vehicles
                vehicles.slice(0, 6).map((vehicle, index) => (
                  <AnimatedElement duration={1000} key={vehicle.id} delay={index * 100} direction="up">
                    <Link
                      to={`/fahrzeugdetail/${vehicle.id}`}
                      className="group flex flex-col h-full bg-white rounded-md transition-colors duration-200 overflow-hidden border border-border-line hover:border-secondary/70"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        {vehicle.mainImage ? (
                          <Image
                            src={vehicle.mainImage}
                            alt={vehicle.alt || vehicle.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            width={400}
                            height={300}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                            <span className="text-sm font-medium">Bild folgt</span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-white/95 text-primary px-3 py-1.5 text-xs font-bold rounded-md border border-border-line">
                          Verfügbar
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-6 flex-grow">
                          <h3 className="text-lg sm:text-xl font-bold text-primary leading-tight mb-2 group-hover:text-secondary transition-colors">
                            {vehicle.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                            {vehicle.description || 'Gebrauchtwagen | Automatik | Top Zustand'}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-secondary" />
                              <span>{vehicle.firstRegistration ? `EZ ${vehicle.firstRegistration}` : 'Neu'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Gauge size={14} className="text-secondary" />
                              <span>{vehicle.mileage ? vehicle.mileage : '0 km'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap size={14} className="text-secondary" />
                              <span>{vehicle.power ? vehicle.power : '-'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Fuel size={14} className="text-secondary" />
                              <span>{vehicle.fuel || 'Automatik'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="pt-6 border-t border-gray-100 mt-auto">
                          <p className="text-xs text-gray-500 mb-2">Barpreis</p>
                          <div className="flex items-end justify-between">
                            <div>
                              <span className="text-2xl sm:text-3xl font-bold text-primary">
                                {vehicle.price}
                              </span>
                              <p className="text-[10px] text-gray-400 mt-1">inkl. 19% MwSt.</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                              <ChevronRight size={20} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedElement>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-500">
                  Keine Fahrzeuge gefunden.
                </div>
              )}
            </div>
            
            {/* Loading Overlay (Optional, if you prefer spinner over skeletons) */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                <LoadingSpinner className="w-12 h-12 text-primary" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            <AnimatedElement duration={1000} direction="left">
              <div className="bg-white p-8 sm:p-10 rounded-md border border-border-line border-l-4 border-l-secondary h-full">
                <Award size={44} className="mb-6 text-secondary" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4 text-primary">Geprüfte Fahrzeuge</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Alle Fahrzeuge werden sorgfältig geprüft und inspiziert, um höchste Qualitätsstandards zu gewährleisten.</p>
              </div>
            </AnimatedElement>
            <AnimatedElement duration={1000} direction="up" delay={100}>
              <div className="bg-white p-8 sm:p-10 rounded-md border border-border-line border-l-4 border-l-secondary h-full">
                <Users size={44} className="mb-6 text-secondary" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4 text-primary">Persönliche Beratung</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Unser erfahrenes Team berät Sie kompetent und fair – ganz nach Ihren individuellen Wünschen und Anforderungen.</p>
              </div>
            </AnimatedElement>
            <AnimatedElement duration={1000} direction="right" delay={200}>
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
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement duration={1000}>
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
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement duration={1000}>
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
