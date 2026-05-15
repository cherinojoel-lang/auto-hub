// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Star, MapPin, Phone, Mail, Clock, Info, Check } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags, getStructuredDataOrganization } from '@/lib/seo';

// --- Animation Components ---

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'none' }> = ({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up'
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 scale-100';
    switch (direction) {
      case 'up': return 'translate-y-12 scale-95';
      case 'left': return '-translate-x-12';
      case 'right': return 'translate-x-12';
      case 'none': return 'scale-95';
      default: return 'translate-y-12';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search State
  const [manufacturer, setManufacturer] = useState('');
  const [driveType, setDriveType] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxKm, setMaxKm] = useState('');

  useEffect(() => {
    // Update SEO for homepage
    updateMetaTags({
      title: 'Automobile Quick - Gebrauchtwagen in Iserlohn-Letmathe | Autohaus seit 1982',
      description: 'Hochwertige Gebrauchtwagen mit persönlicher Beratung. Automobile Quick - Ihr Autohaus seit 1982 in Iserlohn-Letmathe. Große Auswahl an Audi, BMW, Mercedes, VW und mehr.',
      keywords: 'Gebrauchtwagen, Autohaus, Iserlohn, Letmathe, Automobile Quick, Fahrzeuge, Audi, BMW, Mercedes, VW, Porsche',
      ogTitle: 'Automobile Quick - Gebrauchtwagen in Iserlohn-Letmathe',
      ogDescription: 'Hochwertige Gebrauchtwagen mit persönlicher Beratung. Automobile Quick - Ihr Autohaus seit 1982.',
      ogImage: 'https://static.wixstatic.com/media/32e7c0_d28732f69d9643a7ada1b1be4890a422~mv2.png',
      canonicalUrl: 'https://automobilequick.de/',
      structuredData: getStructuredDataOrganization(),
    });
    
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setIsLoading(true);
      // Fetching more to ensure we have enough for the grid
      const result = await BaseCrudService.getAll<Vehicles>('vehicles', [], { limit: 8 });
      setVehicles(result.items || []);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (manufacturer) params.set('manufacturer', manufacturer);
    if (driveType) params.set('driveType', driveType);
    if (minYear) params.set('minYear', minYear);
    if (maxKm) params.set('maxKm', maxKm);
    navigate(`/vehicles?${params.toString()}`);
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

  return (
    <div className="min-h-screen flex flex-col bg-background font-paragraph text-foreground overflow-x-hidden">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] min-h-[600px] w-full bg-accent flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/32e7c0_d28732f69d9643a7ada1b1be4890a422~mv2.png?originWidth=1152&originHeight=576" 
            alt="Reinhardt Automobile Hero - Gebrauchtwagen Autohaus" 
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-accent/80 via-accent/40 to-background"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center mt-20">
          <AnimatedElement direction="up">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-lg">
              Ihr Autohaus in Iserlohn-Letmathe
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-8">
              Gepflegte Gebrauchtwagen, persönliche Beratung und schnelle Kontaktaufnahme bei Automobile Quick – seit 1982.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="relative z-20 -mt-24 mb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatedElement delay={200}>
            <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-3xl font-serif font-bold text-center mb-8 text-accent">
                Jetzt Fahrzeug finden
              </h2>
              
              <form onSubmit={handleSearch} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Manufacturer */}
                  <div className="flex flex-col">
                    <select
                      value={manufacturer}
                      onChange={(e) => setManufacturer(e.target.value)}
                      className="w-full px-4 py-3 rounded-none border-b-2 border-gray-200 bg-transparent text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Hersteller</option>
                      <option value="Audi">Audi</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="VW">VW</option>
                      <option value="Porsche">Porsche</option>
                    </select>
                  </div>

                  {/* Drive Type */}
                  <div className="flex flex-col">
                    <select
                      value={driveType}
                      onChange={(e) => setDriveType(e.target.value)}
                      className="w-full px-4 py-3 rounded-none border-b-2 border-gray-200 bg-transparent text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Antriebsart</option>
                      <option value="Benzin">Benzin</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Elektro">Elektro</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  {/* Min Year */}
                  <div className="flex flex-col">
                    <select
                      value={minYear}
                      onChange={(e) => setMinYear(e.target.value)}
                      className="w-full px-4 py-3 rounded-none border-b-2 border-gray-200 bg-transparent text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">EZ ab</option>
                      <option value="2024">ab 2024</option>
                      <option value="2023">ab 2023</option>
                      <option value="2022">ab 2022</option>
                      <option value="2021">ab 2021</option>
                      <option value="2020">ab 2020</option>
                    </select>
                  </div>

                  {/* Max KM */}
                  <div className="flex flex-col">
                    <select
                      value={maxKm}
                      onChange={(e) => setMaxKm(e.target.value)}
                      className="w-full px-4 py-3 rounded-none border-b-2 border-gray-200 bg-transparent text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">km bis</option>
                      <option value="10000">bis 10.000</option>
                      <option value="30000">bis 30.000</option>
                      <option value="50000">bis 50.000</option>
                      <option value="100000">bis 100.000</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="bg-accent text-white px-12 py-3 rounded-sm font-medium hover:bg-accent/90 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Search size={18} />
                    <span>1040 Treffer</span>
                  </button>
                </div>
              </form>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* FEATURED VEHICLES SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-accent mb-4">
                Aktuelle Neuzugänge
              </h2>
              <p className="text-gray-600 mb-4">Entdecken Sie unsere neuesten Fahrzeuge mit bester Qualität und fairen Preisen</p>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
          </AnimatedElement>

          <div className="relative min-h-[400px]">
            {/* Always render the grid container for refs to attach safely */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-500 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              {isLoading ? (
                // Loading Skeletons
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200"></div>
                    <div className="p-4 space-y-4">
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
                // Actual Data
                vehicles.map((vehicle, index) => (
                  <AnimatedElement key={vehicle._id} delay={index * 100} direction="up">
                    <Link
                      to={`/vehicles/${vehicle._id}`}
                      className="group flex flex-col h-full bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        {vehicle.mainImage ? (
                          <Image
                            src={vehicle.mainImage}
                            alt={`${vehicle.manufacturer} ${vehicle.model}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Image src="https://static.wixstatic.com/media/32e7c0_4f4de78aefaa4e51a7d376395358a592~mv2.png?originWidth=1152&originHeight=896" alt="Placeholder" className="w-full h-full object-cover opacity-50" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-accent rounded-sm shadow-sm">
                          Sofort lieferbar
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="mb-4 flex-grow">
                          <h3 className="text-lg font-bold text-accent leading-tight mb-1 group-hover:text-primary transition-colors">
                            {vehicle.manufacturer} {vehicle.model}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                            {vehicle.description || 'Gebrauchtwagen | Automatik | Top Zustand'}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="text-primary" />
                              <span>{vehicle.firstRegistrationYear ? `EZ ${vehicle.firstRegistrationYear}` : 'Neu'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Info size={12} className="text-primary" />
                              <span>{vehicle.mileage ? `${vehicle.mileage.toLocaleString('de-DE')} km` : '0 km'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check size={12} className="text-primary" />
                              <span>{vehicle.power ? `${vehicle.power} kW` : '-'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check size={12} className="text-primary" />
                              <span>{vehicle.driveType || 'Automatik'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="pt-4 border-t border-gray-100 mt-auto">
                          <p className="text-xs text-gray-500 mb-1">Barpreis</p>
                          <div className="flex items-end justify-between">
                            <div>
                              <span className="text-2xl font-bold text-accent">
                                {formatPrice(vehicle.price)}
                              </span>
                              <p className="text-[10px] text-gray-400">inkl. 19% MwSt.</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                              <ChevronRight size={16} />
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
                <LoadingSpinner className="w-10 h-10 text-primary" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement direction="left">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-accent leading-tight">
                  Automobile Quick<br/>
                  <span className="text-primary">in Iserlohn-Letmathe</span>
                </h2>
                
                <div className="w-16 h-1 bg-primary"></div>
                
                <p className="text-gray-600 leading-relaxed">
                  Unser tägliches Ziel ist es, unseren Kunden möglichst viel Auto für einen fairen Preis anzubieten. Dieses Ziel realisieren wir durch Vertragsungebundenheit und somit einer enormen Fixkostenersparnis gegenüber gebundenen Vertragshändlern.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Neben unserem Preiskonzept streben wir mit jedem Kunden eine langfristige Zusammenarbeit an und sind daran interessiert, Sie vollumfänglich fair und in Ihrem eigenem Interesse gut zu beraten.
                </p>
                
                <div className="bg-gray-50 p-6 border-l-4 border-primary mt-8">
                  <p className="font-bold text-accent mb-2">Wir sind für Sie da!</p>
                  <p className="text-sm text-gray-600">
                    In jedem Fall: Wir freuen uns sehr, Sie persönlich kennen zu lernen und in unserem Geschäft begrüßen zu dürfen!
                  </p>
                </div>
                
                <div className="pt-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-sm font-medium hover:bg-accent/90 transition-all duration-300"
                  >
                    Mehr erfahren
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement direction="right" delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 transform translate-x-4 translate-y-4 rounded-sm -z-10"></div>
                <Image 
                  src="https://static.wixstatic.com/media/32e7c0_3c4bf9d1a6c14bd7af4d5249764da8e8~mv2.png?originWidth=1152&originHeight=768" 
                  alt="Reinhardt Automobile Showroom" 
                  className="w-full h-auto object-cover rounded-sm shadow-lg"
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* BESTSELLER BRANDS */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <AnimatedElement>
            <h2 className="text-2xl font-serif font-bold text-accent mb-10">Unsere Bestseller</h2>
            <div className="flex justify-center items-center gap-16 md:gap-32 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholder for Brand Logos - using text as fallback if images aren't available */}
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-primary transition-colors">
                  <span className="text-2xl font-bold text-gray-400 group-hover:text-primary">Audi</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-primary transition-colors">
                  <span className="text-2xl font-bold text-gray-400 group-hover:text-primary">VW</span>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* IMAGE GALLERY GRID */}
      <section className="py-2 bg-white">
        <div className="w-full max-w-[1600px] mx-auto">
          <AnimatedElement>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
              <div className="aspect-square overflow-hidden">
                <Image src="https://static.wixstatic.com/media/32e7c0_4e1c66a189b84a67b5d8c7c7f70e95ca~mv2.png?originWidth=768&originHeight=768" alt="Gallery 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image src="https://static.wixstatic.com/media/32e7c0_0e771e061ddb4ea5a2243f5beb2eb66a~mv2.png?originWidth=768&originHeight=768" alt="Gallery 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image src="https://static.wixstatic.com/media/32e7c0_ef30961a1c9e44a9ab191be28d368541~mv2.png?originWidth=768&originHeight=768" alt="Gallery 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image src="https://static.wixstatic.com/media/32e7c0_5bced5973c4e4ca1baa4d059e4280df2~mv2.png?originWidth=768&originHeight=768" alt="Gallery 4" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image src="https://static.wixstatic.com/media/32e7c0_9593588f6d86478db8e47b0ad8e39612~mv2.png?originWidth=768&originHeight=768" alt="Gallery 5" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image src="https://static.wixstatic.com/media/32e7c0_768c0abed5354c75aece7dd772d14b00~mv2.png?originWidth=768&originHeight=768" alt="Gallery 6" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* LOCATION & REVIEWS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            
            {/* Info Side */}
            <div className="p-10 flex flex-col justify-center">
              <AnimatedElement direction="left">
                <h3 className="text-2xl font-serif font-bold text-accent mb-6">Automobile Quick</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p>Delsterner Str. 92<br/>58091 Hagen</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="text-primary flex-shrink-0" size={20} />
                    <p>+49 (0) 2331 123456</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="text-primary flex-shrink-0" size={20} />
                    <p>info@automobilequick.de</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-4xl font-bold text-accent">4.9</div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Basierend auf 1.690 Google Rezensionen</p>
                  <a 
                    href="#" 
                    className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    Weitere Informationen <ChevronRight size={14} />
                  </a>
                </div>
              </AnimatedElement>
            </div>

            {/* Map Side */}
            <div className="h-[400px] lg:h-auto relative bg-gray-200">
              <AnimatedElement direction="right" className="w-full h-full">
                {/* Placeholder for Google Maps iframe to avoid actual external requests in this environment */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-500 p-8 text-center">
                  <MapPin size={48} className="mb-4 text-gray-400" />
                  <p className="font-medium mb-2">Google Maps Integration</p>
                  <p className="text-sm">Delsterner Str. 92, 58091 Hagen</p>
                  <button 
                    className="mt-4 bg-white px-4 py-2 rounded shadow-sm text-sm font-medium text-accent hover:bg-gray-50 transition-colors"
                    onClick={() => window.open('https://maps.google.com', '_blank')}
                  >
                    Route berechnen
                  </button>
                </div>
              </AnimatedElement>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
