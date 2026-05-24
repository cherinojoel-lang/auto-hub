import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Filter, X, Phone, MessageSquare } from 'lucide-react';
import { vehiclesData, type Vehicle } from '@/data/vehiclesData.generated';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags, getStructuredDataBreadcrumb } from '@/lib/seo';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};


export default function VehiclePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicle] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);

  const [manufacturer, setManufacturer] = useState(searchParams.get('manufacturer') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '');
  const [driveType, setDriveType] = useState(searchParams.get('driveType') || '');
  const [maxMileage, setMaxMileage] = useState(searchParams.get('maxMileage') || '');
  const [yearFrom, setYearFrom] = useState(searchParams.get('yearFrom') || '');

  useEffect(() => {
    // Update SEO for vehicles page
    updateMetaTags({
      title: 'Aktuelle Gebrauchtwagen in Iserlohn-Letmathe | Automobile Quick Fahrzeugbestand',
      description: 'Entdecken Sie den aktuellen Fahrzeugbestand von Automobile Quick. Alle Fahrzeuge mit Preis, Finanzierung, Erstzulassung, Kilometerstand, Leistung und Kraftstoff.',
      keywords: 'Fahrzeugbestand, Gebrauchtwagen kaufen, Gebrauchtwagen Iserlohn, Gebrauchtwagen Letmathe, Audi Gebrauchtwagen, BMW Gebrauchtwagen, Mercedes Gebrauchtwagen, VW Gebrauchtwagen, Porsche Gebrauchtwagen, Automobile Quick Fahrzeuge',
      ogTitle: 'Fahrzeugbestand - Automobile Quick',
      ogDescription: 'Entdecken Sie den aktuellen Fahrzeugbestand von Automobile Quick. Alle Fahrzeuge mit Preis, Finanzierung, Erstzulassung, Kilometerstand, Leistung und Kraftstoff.',
      canonicalUrl: 'https://automobilequick.de/fahrzeugbestand',
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: 'https://automobilequick.de/' },
        { name: 'Fahrzeugbestand', url: 'https://automobilequick.de/fahrzeugbestand' },
      ]),
    });
    
    loadVehicle();
  }, [skip]);


  const loadVehicle = async () => {
    setIsLoading(true);
    try {
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 300));
      let filtered = [...vehiclesData].filter(v => v.status === 'available');

      if (manufacturer) {
        filtered = filtered.filter(v => v.title?.toLowerCase().includes(manufacturer.toLowerCase()));
      }
      if (priceMax) {
        filtered = filtered.filter(v => v.price && parseInt(v.price.replace(/[^0-9]/g, '')) <= parseInt(priceMax));
      }
      if (driveType) {
        filtered = filtered.filter(v => v.fuel?.toLowerCase().includes(driveType.toLowerCase()));
      }
      if (maxMileage) {
        filtered = filtered.filter(v => v.mileage && parseInt(v.mileage.replace(/[^0-9]/g, '')) <= parseInt(maxMileage));
      }
      if (yearFrom) {
        filtered = filtered.filter(v => v.firstRegistration && v.firstRegistration.includes(yearFrom));
      }

      setVehicle(filtered);
      setHasNext(false); // All static items loaded
    } catch (error) {
      console.error('Error loading static vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const applyFilters = () => {
    const params = new URLSearchParams();
    if (manufacturer) params.set('manufacturer', manufacturer);
    if (priceMax) params.set('priceMax', priceMax);
    if (driveType) params.set('driveType', driveType);
    if (yearFrom) params.set('yearFrom', yearFrom);
    if (maxMileage) params.set('maxMileage', maxMileage);
    setSearchParams(params);
    setSkip(0);
    loadVehicle();
    setShowFilters(false);
  };

  const clearFilters = () => {
    setManufacturer('');
    setPriceMax('');
    setDriveType('');
    setYearFrom('');
    setMaxMileage('');
    setSearchParams(new URLSearchParams());
    setSkip(0);
    loadVehicle();
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Preis auf Anfrage';
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const loadMore = () => {
    setSkip(prev => prev + 15);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0">
      <a href="#main-content" className="skip-to-main">
        Zum Hauptinhalt springen
      </a>
      <Header />

      {/* Hero Section - Compact for Demo */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 sm:mb-4 tracking-tight">
                Fahrzeugbestand Automobile Quick
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-light">
                Entdecken Sie unsere aktuellen Gebrauchtwagen in Iserlohn-Letmathe. Geprüfte Qualität seit 1982.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Filters Section - Non-sticky, compact for world-class demo */}
      <section className="py-6 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-sm font-heading font-bold text-foreground uppercase tracking-[0.2em] opacity-60">
              Fahrzeugbestand filtern
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 text-primary font-bold text-xs hover:text-primary/80 transition-colors bg-white px-4 py-2 rounded border border-gray-200 shadow-sm"
            >
              <Filter size={16} />
              {showFilters ? 'Schließen' : 'Filter anpassen'}
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block transition-all duration-500`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">
                  Marke
                </label>
                <select
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-gray-200 bg-white text-foreground text-xs focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer shadow-sm hover:border-gray-300"
                >
                  <option value="">Alle Marken</option>
                  <option value="BMW">BMW</option>
                  <option value="Opel">Opel</option>
                  <option value="Citroën">Citroën</option>
                  <option value="Kia">Kia</option>
                  <option value="Ford">Ford</option>
                  <option value="Fiat">Fiat</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">
                  Preis bis
                </label>
                <select
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-gray-200 bg-white text-foreground text-xs focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer shadow-sm hover:border-gray-300"
                >
                  <option value="">Alle Preise</option>
                  <option value="15000">bis 15.000 €</option>
                  <option value="25000">bis 25.000 €</option>
                  <option value="40000">bis 40.000 €</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">
                  Kraftstoff
                </label>
                <select
                  value={driveType}
                  onChange={(e) => setDriveType(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-gray-200 bg-white text-foreground text-xs focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer shadow-sm hover:border-gray-300"
                >
                  <option value="">Alle Kraftstoffe</option>
                  <option value="Benzin">Benzin</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Elektro">Elektro</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">
                  Kilometer
                </label>
                <select
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-gray-200 bg-white text-foreground text-xs focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer shadow-sm hover:border-gray-300"
                >
                  <option value="">Alle km</option>
                  <option value="50000">bis 50.000</option>
                  <option value="100000">bis 100.000</option>
                  <option value="150000">bis 150.000</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">
                  EZ ab
                </label>
                <select
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-gray-200 bg-white text-foreground text-xs focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer shadow-sm hover:border-gray-300"
                >
                  <option value="">Alle Jahre</option>
                  <option value="2022">ab 2022</option>
                  <option value="2020">ab 2020</option>
                  <option value="2018">ab 2018</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={applyFilters}
                className="bg-primary text-white px-8 py-2.5 rounded-sm font-bold text-xs hover:bg-primary/90 transition-all shadow-md active:scale-95"
              >
                Ergebnisse anzeigen
              </button>
              <button
                onClick={clearFilters}
                className="bg-white text-gray-500 px-8 py-2.5 rounded-sm border border-gray-200 font-bold text-xs hover:bg-gray-50 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <X size={14} />
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-12 sm:py-16 bg-white flex-1" id="main-content">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner className="w-12 h-12 text-primary" />
              </div>
            ) : vehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                  {vehicles.map((vehicle, index) => (
                    <AnimatedElement key={vehicle.id} delay={index * 50}>
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
                        {/* Image Section */}
                        <div className="aspect-[16/10] overflow-hidden bg-gray-50 relative">
                          {vehicle.mainImage ? (
                            <Image
                              src={vehicle.mainImage}
                              alt={vehicle.alt || vehicle.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                              width={600}
                              height={375}
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                              <span className="text-xs font-bold uppercase tracking-widest">Bild folgt</span>
                            </div>
                          )}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <div className="bg-success/95 text-white px-3 py-1.5 text-[10px] font-bold rounded-sm shadow-sm backdrop-blur-md uppercase tracking-wider">
                              Verfügbar
                            </div>
                            {vehicle.isNew && (
                              <div className="bg-secondary text-white px-3 py-1.5 text-[10px] font-bold rounded-sm shadow-sm backdrop-blur-md uppercase tracking-wider animate-pulse">
                                NEU EINGETROFFEN
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 sm:p-7 flex flex-col flex-1">
                          <h3 className="text-xl font-heading font-bold mb-4 text-primary line-clamp-1 group-hover:text-secondary transition-colors">
                            {vehicle.title}
                          </h3>

                          <div className="mb-6">
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-extrabold text-primary tracking-tight">
                                {vehicle.price}
                              </span>
                              <span className="text-[10px] text-gray-400 font-bold uppercase">Endpreis</span>
                            </div>
                            {vehicle.financing && (
                              <p className="text-xs text-secondary font-bold mt-1.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                {vehicle.financing}
                              </p>
                            )}
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 pt-6 border-t border-gray-100">
                            <div className="flex flex-col">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Erstzulassung</span>
                              <span className="text-sm text-gray-700 font-bold">{vehicle.firstRegistration}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Kilometer</span>
                              <span className="text-sm text-gray-700 font-bold">{vehicle.mileage}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Leistung</span>
                              <span className="text-sm text-gray-700 font-bold">{vehicle.power}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Kraftstoff</span>
                              <span className="text-sm text-gray-700 font-bold">{vehicle.fuel}</span>
                            </div>
                          </div>

                          {/* Buttons */}
                          <div className="flex gap-3 mt-auto">
                            <Link
                              to={`/fahrzeugdetail/${vehicle.id}`}
                              className="flex-[1.5] bg-primary text-white px-4 py-3.5 rounded-sm font-bold text-xs text-center hover:bg-primary/90 transition-all shadow-md active:scale-95"
                            >
                              Details ansehen
                            </Link>
                            <Link
                              to="/kontakt"
                              className="flex-1 bg-white text-primary border-2 border-primary/10 px-4 py-3.5 rounded-sm font-bold text-xs text-center hover:bg-gray-50 transition-all active:scale-95"
                            >
                              Anfragen
                            </Link>
                          </div>
                        </div>
                      </div>
                    </AnimatedElement>
                  ))}
                </div>

                {hasNext && (
                  <div className="text-center mt-12 sm:mt-16">
                    <button
                      onClick={loadMore}
                      className="bg-primary text-white px-10 sm:px-14 py-4 rounded-sm font-bold text-base sm:text-lg hover:bg-primary/90 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md"
                    >
                      Mehr Fahrzeuge laden
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg sm:text-xl text-gray-600">
                  Keine Fahrzeuge gefunden. Bitte passen Sie Ihre Filter an.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="flex gap-3 p-4 max-w-7xl mx-auto">
          <a
            href="tel:+492374912912"
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-sm font-bold text-sm hover:bg-primary/90 transition-all duration-300 shadow-md"
          >
            <Phone size={18} />
            Anrufen
          </a>
          <Link
            to="/kontakt"
            className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white px-4 py-3 rounded-sm font-bold text-sm hover:bg-secondary/90 transition-all duration-300 shadow-md"
          >
            <MessageSquare size={18} />
            Besichtigung
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
