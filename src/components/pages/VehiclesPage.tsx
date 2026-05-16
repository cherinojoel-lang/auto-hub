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
      title: 'Fahrzeugbestand - Gebrauchtwagen kaufen bei Automobile Quick in Iserlohn-Letmathe',
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
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent via-accent to-primary/20 text-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Fahrzeugbestand - Gebrauchtwagen kaufen
              </h1>
              <p className="text-lg md:text-xl text-background/90">
                Große Auswahl an hochwertigen Gebrauchtwagen mit fairen Preisen und persönlicher Beratung
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-bold text-foreground">
              Filter
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 text-primary font-medium"
            >
              <Filter size={20} />
              {showFilters ? 'Schließen' : 'Filter anzeigen'}
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Hersteller
                </label>
                <select
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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
                <label className="block text-sm font-medium text-foreground mb-2">
                  Antriebsart
                </label>
                <select
                  value={driveType}
                  onChange={(e) => setDriveType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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
                <label className="block text-sm font-medium text-foreground mb-2">
                  EZ ab
                </label>
                <select
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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
                <label className="block text-sm font-medium text-foreground mb-2">
                  km bis
                </label>
                <select
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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

            <div className="flex gap-3">
              <button
                onClick={applyFilters}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200"
              >
                Filter anwenden
              </button>
              <button
                onClick={clearFilters}
                className="bg-secondary/10 text-foreground px-6 py-2 rounded-lg font-medium hover:bg-secondary/20 transition-all duration-200 flex items-center gap-2"
              >
                <X size={18} />
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-12 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : vehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.map((vehicle, index) => (
                    <AnimatedElement key={vehicle._id} delay={index * 50}>
                      <Link
                        to={`/vehicles/${vehicle._id}`}
                        className="group block bg-background rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50 hover:scale-[1.02]"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-secondary/5">
                          {vehicle.mainImage ? (
                            <Image
                              src={vehicle.mainImage}
                              alt={`${vehicle.manufacturer} ${vehicle.model}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              width={400}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                              <span className="text-4xl font-bold text-secondary/30">
                                {vehicle.manufacturer?.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-heading font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                            {vehicle.manufacturer} {vehicle.model}
                          </h3>
                          <div className="space-y-2 mb-4 text-sm text-foreground/70">
                            {vehicle.firstRegistrationYear && (
                              <p>EZ: {vehicle.firstRegistrationYear}</p>
                            )}
                            {vehicle.mileage && (
                              <p>{vehicle.mileage.toLocaleString('de-DE')} km</p>
                            )}
                            {vehicle.power && (
                              <p>{vehicle.power} kW ({Math.round(vehicle.power * 1.36)} PS)</p>
                            )}
                            {vehicle.driveType && <p>{vehicle.driveType}</p>}
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(vehicle.price)}
                            </span>
                            <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </AnimatedElement>
                  ))}
                </div>

                {hasNext && (
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMore}
                      className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 hover:shadow-lg transition-all duration-200"
                    >
                      Mehr Fahrzeuge laden
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-foreground/70">
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
