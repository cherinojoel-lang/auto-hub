import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Filter, X } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
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

export default function VehiclesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const [manufacturer, setManufacturer] = useState(searchParams.get('manufacturer') || '');
  const [driveType, setDriveType] = useState(searchParams.get('driveType') || '');
  const [yearFrom, setYearFrom] = useState(searchParams.get('yearFrom') || '');
  const [maxMileage, setMaxMileage] = useState(searchParams.get('maxMileage') || '');

  useEffect(() => {
    // Update SEO for vehicles page
    updateMetaTags({
      title: 'Aktuelle Gebrauchtwagen in Iserlohn-Letmathe | Automobile Quick Fahrzeugbestand',
      description: 'Große Auswahl an hochwertigen Gebrauchtwagen bei Automobile Quick. Audi, BMW, Mercedes, VW, Porsche - faire Preise, persönliche Beratung, schnelle Lieferung. Jetzt Fahrzeug finden!',
      keywords: 'Fahrzeugbestand, Gebrauchtwagen kaufen, Gebrauchtwagen Iserlohn, Gebrauchtwagen Letmathe, Audi Gebrauchtwagen, BMW Gebrauchtwagen, Mercedes Gebrauchtwagen, VW Gebrauchtwagen, Porsche Gebrauchtwagen, Automobile Quick Fahrzeuge',
      ogTitle: 'Fahrzeugbestand - Automobile Quick',
      ogDescription: 'Große Auswahl an hochwertigen Gebrauchtwagen mit fairen Preisen und persönlicher Beratung.',
      canonicalUrl: 'https://automobilequick.de/vehicles',
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: 'https://automobilequick.de/' },
        { name: 'Fahrzeugbestand', url: 'https://automobilequick.de/vehicles' },
      ]),
    });
    
    loadVehicles();
  }, [skip]);

  const loadVehicles = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Vehicles>('vehicles', [], { limit: 12, skip });
      setVehicles(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (manufacturer) params.set('manufacturer', manufacturer);
    if (driveType) params.set('driveType', driveType);
    if (yearFrom) params.set('yearFrom', yearFrom);
    if (maxMileage) params.set('maxMileage', maxMileage);
    setSearchParams(params);
    setSkip(0);
    loadVehicles();
    setShowFilters(false);
  };

  const clearFilters = () => {
    setManufacturer('');
    setDriveType('');
    setYearFrom('');
    setMaxMileage('');
    setSearchParams(new URLSearchParams());
    setSkip(0);
    loadVehicles();
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
    setSkip(prev => prev + 12);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6">
                Fahrzeugbestand
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                Große Auswahl an hochwertigen Gebrauchtwagen mit fairen Preisen und persönlicher Beratung
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 sm:py-10 bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
              Filter
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 text-primary font-bold text-sm sm:text-base hover:text-primary/80 transition-colors"
            >
              <Filter size={22} />
              {showFilters ? 'Schließen' : 'Filter anzeigen'}
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                  Hersteller
                </label>
                <select
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-medium"
                >
                  <option value="">Alle Hersteller</option>
                  <option value="Audi">Audi</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="VW">VW</option>
                  <option value="Porsche">Porsche</option>
                  <option value="Skoda">Skoda</option>
                  <option value="Seat">Seat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                  Antriebsart
                </label>
                <select
                  value={driveType}
                  onChange={(e) => setDriveType(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-medium"
                >
                  <option value="">Alle Antriebsarten</option>
                  <option value="Benzin">Benzin</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Elektro">Elektro</option>
                  <option value="Hybrid Benzin">Hybrid Benzin</option>
                  <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                  EZ ab
                </label>
                <select
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-medium"
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

              <div>
                <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                  km bis
                </label>
                <select
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm border-2 border-gray-200 bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-medium"
                >
                  <option value="">Alle km</option>
                  <option value="20000">bis 20.000</option>
                  <option value="50000">bis 50.000</option>
                  <option value="100000">bis 100.000</option>
                  <option value="150000">bis 150.000</option>
                  <option value="200000">bis 200.000</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={applyFilters}
                className="bg-primary text-white px-6 sm:px-8 py-3 rounded-sm font-bold text-sm sm:text-base hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Filter anwenden
              </button>
              <button
                onClick={clearFilters}
                className="bg-gray-100 text-foreground px-6 sm:px-8 py-3 rounded-sm font-bold text-sm sm:text-base hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <X size={18} />
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-white flex-1">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner className="w-12 h-12 text-primary" />
              </div>
            ) : vehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {vehicles.map((vehicle, index) => (
                    <AnimatedElement key={vehicle._id} delay={index * 50}>
                      <Link
                        to={`/vehicles/${vehicle._id}`}
                        className="group block bg-white rounded-sm shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                          {vehicle.mainImage ? (
                            <Image
                              src={vehicle.mainImage}
                              alt={`${vehicle.manufacturer} ${vehicle.model}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              width={400}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-4xl sm:text-5xl font-bold text-gray-400">
                                {vehicle.manufacturer?.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="absolute top-4 left-4 bg-success text-white px-3 py-1.5 text-xs font-bold rounded-sm shadow-md">
                            Sofort lieferbar
                          </div>
                        </div>
                        <div className="p-6 sm:p-8">
                          <h3 className="text-lg sm:text-xl font-heading font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                            {vehicle.manufacturer} {vehicle.model}
                          </h3>
                          <div className="space-y-2 mb-6 text-sm text-gray-600">
                            {vehicle.firstRegistrationYear && (
                              <p className="font-medium">EZ: {vehicle.firstRegistrationYear}</p>
                            )}
                            {vehicle.mileage && (
                              <p className="font-medium">{vehicle.mileage.toLocaleString('de-DE')} km</p>
                            )}
                            {vehicle.power && (
                              <p className="font-medium">{vehicle.power} kW ({Math.round(vehicle.power * 1.36)} PS)</p>
                            )}
                            {vehicle.driveType && <p className="font-medium">{vehicle.driveType}</p>}
                          </div>
                          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                            <span className="text-2xl sm:text-3xl font-bold text-primary">
                              {formatPrice(vehicle.price)}
                            </span>
                            <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform" size={24} />
                          </div>
                        </div>
                      </Link>
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

      <Footer />
    </div>
  );
}
