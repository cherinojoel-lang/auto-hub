import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Calendar, Camera, Filter, Fuel, Gauge, ShieldCheck, X, Zap } from 'lucide-react';
import { vehiclesData, type Vehicle } from '@/data/vehiclesData.generated';
import { Image } from '@/components/ui/image';
import { WhatsAppCta } from '@/components/ui/whatsapp-cta';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { updateMetaTags, getStructuredDataBreadcrumb } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo-config';
import {
  filterVehicles,
  FilterCriteriaSchema,
  deriveManufacturerOptions,
  deriveFuelOptions,
} from '@/lib/domain/vehicleFilter';
import { getVehicleImageCount, getFeatureChips } from '@/lib/domain/vehicleFeatures';

const MANUFACTURER_OPTIONS = deriveManufacturerOptions(vehiclesData);
const FUEL_OPTIONS = deriveFuelOptions(vehiclesData);

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; delay?: number; priority?: boolean }> = ({
  children, 
  className = '',
  delay = 0,
  priority = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(priority || false);

  useEffect(() => {
    if (priority) return;
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
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


  const [manufacturer, setManufacturer] = useState(searchParams.get('manufacturer') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '');
  const [driveType, setDriveType] = useState(searchParams.get('driveType') || '');
  const [maxMileage, setMaxMileage] = useState(searchParams.get('maxMileage') || '');
  const [yearFrom, setYearFrom] = useState(searchParams.get('yearFrom') || '');

  useEffect(() => {
    // Update SEO for vehicles page
    updateMetaTags({
      title: PAGE_METADATA.vehicles.title,
      description: PAGE_METADATA.vehicles.description,
      keywords: 'Fahrzeugbestand, Gebrauchtwagen kaufen, Gebrauchtwagen Iserlohn, Gebrauchtwagen Letmathe, Audi Gebrauchtwagen, BMW Gebrauchtwagen, Mercedes Gebrauchtwagen, VW Gebrauchtwagen, Porsche Gebrauchtwagen, Automobile Quick Fahrzeuge',
      ogTitle: 'Fahrzeugbestand - Automobile Quick',
      ogDescription: PAGE_METADATA.vehicles.description,
      canonicalUrl: `${SITE_CONFIG.url}${PAGE_METADATA.vehicles.path}`,
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Fahrzeugbestand', url: `${SITE_CONFIG.url}${PAGE_METADATA.vehicles.path}` },
      ]),
    });
    
    loadVehicle();
  }, [skip]);


  const loadVehicle = async () => {
    setIsLoading(true);
    try {
      const criteria = FilterCriteriaSchema.parse({
        manufacturer,
        priceMax,
        fuel: driveType,
        maxMileage,
        yearFrom,
      });
      setVehicle(filterVehicles(vehiclesData, criteria));
      setHasNext(false);
    } catch (error) {
      console.error('Error filtering vehicles:', error);
      setVehicle([]);
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



  const loadMore = () => {
    setSkip(prev => prev + 15);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-32 md:pb-0">
      <SeoHead 
        title={PAGE_METADATA.vehicles.title}
        description={PAGE_METADATA.vehicles.description}
        url={`${SITE_CONFIG.url}${PAGE_METADATA.vehicles.path}`}
      />
      <a href="#main-content" className="skip-to-main">
        Zum Hauptinhalt springen
      </a>

      {/* Hero Section */}
      <section className="bg-primary text-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto w-full max-w-[22rem] px-4 sm:max-w-[1400px]">
          <AnimatedElement>
            <div className="w-full max-w-3xl mx-auto text-center min-w-0">
              <h1 className="mx-auto max-w-[17rem] sm:max-w-none text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 leading-tight break-words">
                Aktuelle Gebrauchtwagen in Iserlohn-Letmathe
              </h1>
              <p className="mx-auto max-w-[17rem] sm:max-w-3xl text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed">
                Entdecken Sie den aktuellen Fahrzeugbestand von Automobile Quick. Alle Fahrzeuge mit Preis, Finanzierung, Erstzulassung, Kilometerstand, Leistung und Kraftstoff.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 sm:py-8 bg-white border border-border-line rounded-md mx-4 sm:mx-auto max-w-[1400px] mt-8 mb-4 relative">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-heading font-bold text-foreground flex-shrink-0">
              Filter
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex min-w-0 max-w-[70%] items-center justify-end gap-2 text-primary font-bold text-sm sm:text-base hover:text-primary/80 transition-colors"
            >
              <Filter size={22} />
              <span className="truncate">{showFilters ? 'Schließen' : 'Filter'}</span>
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">
                  Marke
                </label>
                <select
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="w-full min-h-12 px-4 py-3 rounded-md border border-border-line bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-medium"
                >
                  <option value="">Alle Marken</option>
                  {MANUFACTURER_OPTIONS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">
                  Preis
                </label>
                <select
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full min-h-12 px-4 py-3 rounded-md border border-border-line bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-medium"
                >
                  <option value="">Alle Preise</option>
                  <option value="15000">bis 15.000 €</option>
                  <option value="25000">bis 25.000 €</option>
                  <option value="40000">bis 40.000 €</option>
                  <option value="60000">bis 60.000 €</option>
                  <option value="100000">bis 100.000 €</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">
                  Kraftstoff
                </label>
                <select
                  value={driveType}
                  onChange={(e) => setDriveType(e.target.value)}
                  className="w-full min-h-12 px-4 py-3 rounded-md border border-border-line bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-medium"
                >
                  <option value="">Alle Kraftstoffe</option>
                  {FUEL_OPTIONS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">
                  Kilometerstand
                </label>
                <select
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(e.target.value)}
                  className="w-full min-h-12 px-4 py-3 rounded-md border border-border-line bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-medium"
                >
                  <option value="">Alle km</option>
                  <option value="20000">bis 20.000</option>
                  <option value="50000">bis 50.000</option>
                  <option value="100000">bis 100.000</option>
                  <option value="150000">bis 150.000</option>
                  <option value="200000">bis 200.000</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">
                  Erstzulassung
                </label>
                <select
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  className="w-full min-h-12 px-4 py-3 rounded-md border border-border-line bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-medium"
                >
                  <option value="">Alle Jahre</option>
                  <option value="2024">ab 2024</option>
                  <option value="2023">ab 2023</option>
                  <option value="2022">ab 2022</option>
                  <option value="2021">ab 2021</option>
                  <option value="2020">ab 2020</option>
                  <option value="2019">ab 2019</option>
                  <option value="2018">ab 2018</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={applyFilters}
                className="bg-primary text-white px-6 sm:px-8 py-3 rounded-md font-bold text-sm sm:text-base hover:bg-primary/90 transition-colors duration-200 min-h-12"
              >
                Filter anwenden
              </button>
              <button
                onClick={clearFilters}
                className="bg-alt-bg text-foreground px-6 sm:px-8 py-3 rounded-md font-bold text-sm sm:text-base hover:bg-border-line transition-colors duration-200 flex items-center justify-center gap-2 min-h-12"
              >
                <X size={18} />
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-8 sm:py-12 md:py-16 bg-background flex-1" id="main-content">
        <div className="container mx-auto px-4 max-w-[1400px]">
          {/* Ergebnis-Header */}
          {!isLoading && (
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <p className="text-sm text-text-secondary">
                <span className="font-bold text-foreground">{vehicles.length}</span>{' '}
                {vehicles.length === 1 ? 'Fahrzeug' : 'Fahrzeuge'}
                {[manufacturer, priceMax, driveType, maxMileage, yearFrom].filter(Boolean).length > 0
                  ? ' gefunden'
                  : ' verfügbar'}
              </p>
              {[manufacturer, priceMax, driveType, maxMileage, yearFrom].filter(Boolean).length > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-secondary border border-secondary rounded-md hover:bg-secondary/5 transition-colors"
                >
                  <X size={14} />
                  Filter zurücksetzen ({[manufacturer, priceMax, driveType, maxMileage, yearFrom].filter(Boolean).length})
                </button>
              )}
            </div>
          )}
          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner className="w-12 h-12 text-primary" />
              </div>
            ) : vehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {vehicles.map((vehicle, index) => {
                    const imageCount = getVehicleImageCount(vehicle);
                    const featureChips = getFeatureChips(vehicle);
                    return (
                    <AnimatedElement key={vehicle.id} delay={index * 50} priority={index < 4}>
                      <div className="group flex flex-col h-full bg-surface-elevated shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200 overflow-hidden border border-border-line">
                        {/* Image Container */}
                        <Link to={`/fahrzeugdetail/${vehicle.id}`} className="relative aspect-[4/3] overflow-hidden bg-alt-bg block">
                          <Image
                            src={vehicle.mainImage}
                            alt={vehicle.alt || vehicle.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            width={400}
                            height={300}
                            loading={index < 4 ? 'eager' : 'lazy'}
                            fetchPriority={index < 4 ? 'high' : 'auto'}
                            decoding="async"
                          />
                          <div className="absolute top-3 left-3 bg-white/95 text-primary px-3 py-1.5 text-xs font-bold rounded-md border border-border-line">
                            {vehicle.isNew ? 'Neu eingetroffen' : 'Verfügbar'}
                          </div>
                          {imageCount > 1 && (
                            <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-primary/95 text-white px-3 py-1.5 text-xs font-bold rounded-md">
                              <Camera size={13} />
                              <span>{imageCount} Fotos</span>
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-white/95 text-primary px-3 py-1.5 text-xs font-bold rounded-md border border-border-line">
                            <ShieldCheck size={13} className="text-secondary" />
                            <span>Geprüft</span>
                          </div>
                        </Link>

                        {/* Content Area */}
                        <div className="p-5 sm:p-6 flex flex-col flex-grow">
                          <Link to={`/fahrzeugdetail/${vehicle.id}`} className="mb-2">
                            <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                              {vehicle.title}
                            </h3>
                          </Link>

                          <p className="text-xs text-text-secondary mb-4 line-clamp-2 min-h-[2rem]">
                            {vehicle.description || `${vehicle.make} ${vehicle.model} aus gepflegtem Bestand in Iserlohn-Letmathe`}
                          </p>

                          {/* Specs Grid */}
                          <div className="grid grid-cols-2 gap-3 text-xs text-text-secondary mb-4">
                            <div className="flex min-w-0 items-center gap-2">
                              <Calendar size={14} className="text-secondary flex-shrink-0" />
                              <span className="truncate">EZ {vehicle.firstRegistration || 'Neu'}</span>
                            </div>
                            <div className="flex min-w-0 items-center gap-2">
                              <Gauge size={14} className="text-secondary flex-shrink-0" />
                              <span className="truncate">{vehicle.mileage || '0 km'}</span>
                            </div>
                            <div className="flex min-w-0 items-center gap-2">
                              <Zap size={14} className="text-secondary flex-shrink-0" />
                              <span className="truncate">{vehicle.power || '-'}</span>
                            </div>
                            <div className="flex min-w-0 items-center gap-2">
                              <Fuel size={14} className="text-secondary flex-shrink-0" />
                              <span className="truncate">{vehicle.fuel || '-'}</span>
                            </div>
                          </div>

                          {featureChips.length > 0 && (
                            <div className="mb-4 flex min-h-[28px] flex-wrap gap-2">
                              {featureChips.map((chip) => (
                                <span
                                  key={chip}
                                  className="rounded-md border border-border-line bg-white px-2.5 py-1 text-[11px] font-bold text-primary"
                                >
                                  {chip}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="border-t border-border-line my-4"></div>

                          <p className="text-xs text-text-secondary mb-1">Barpreis</p>
                          <p className="text-2xl font-bold text-secondary mb-1">{vehicle.price}</p>
                          <p className="text-xs text-text-secondary mb-4">{vehicle.financing}</p>

                          {/* CTA */}
                          <div className="mt-auto flex flex-col gap-2">
                            <Link
                              to={`/fahrzeugdetail/${vehicle.id}`}
                              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-md font-bold text-sm hover:bg-primary/90 transition-colors min-h-[48px]"
                            >
                              Fahrzeug ansehen
                              <ArrowRight size={16} />
                            </Link>
                            <WhatsAppCta
                              vehicleTitle={vehicle.title}
                              compact
                              variant="subtle"
                              className="w-full justify-center min-h-[44px]"
                            />
                          </div>
                        </div>
                      </div>
                    </AnimatedElement>
                    );
                  })}
                </div>

                {hasNext && (
                  <div className="text-center mt-12 sm:mt-16">
                    <button
                      onClick={loadMore}
                      className="bg-primary text-white px-10 sm:px-14 py-4 rounded-md font-bold text-base sm:text-lg hover:bg-primary/90 transition-colors duration-200 min-h-[52px]"
                    >
                      Mehr Fahrzeuge laden
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl font-bold text-foreground mb-3">Keine Fahrzeuge gefunden</p>
                <p className="text-text-secondary mb-8">Versuche andere Filterkriterien.</p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-3.5 bg-secondary text-white font-bold rounded-md hover:opacity-90 transition-colors min-h-[48px]"
                >
                  Alle Filter zurücksetzen
                </button>
              </div>
            )}
          </div>
        </div>
      </section>


      
    </div>
  );
}
