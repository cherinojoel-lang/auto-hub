// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Star, MapPin, Phone, Mail, Clock, Info, Check, Award, Users, Zap } from 'lucide-react';
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
      title: 'Ihr Autohaus in Iserlohn-Letmathe | Automobile Quick - Gebrauchtwagen seit 1982',
      description: 'Automobile Quick: Hochwertige Gebrauchtwagen in Iserlohn-Letmathe. Audi, BMW, Mercedes, VW, Porsche - faire Preise, persönliche Beratung, seit 1982. Jetzt Fahrzeug finden!',
      keywords: 'Gebrauchtwagen Iserlohn, Gebrauchtwagen Letmathe, Autohaus Iserlohn, Gebrauchtwagen kaufen, Audi Gebrauchtwagen, BMW Gebrauchtwagen, Mercedes Gebrauchtwagen, VW Gebrauchtwagen, Porsche Gebrauchtwagen, Automobile Quick, Fahrzeugbestand, Gebrauchtwagen Hagen',
      ogTitle: 'Automobile Quick - Gebrauchtwagen in Iserlohn-Letmathe',
      ogDescription: 'Hochwertige Gebrauchtwagen mit persönlicher Beratung. Automobile Quick - Ihr Autohaus seit 1982 in Iserlohn-Letmathe.',
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
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] w-full bg-primary flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/32e7c0_d28732f69d9643a7ada1b1be4890a422~mv2.png?originWidth=1152&originHeight=576" 
            alt="Automobile Quick Autohaus - Gebrauchtwagen in Iserlohn-Letmathe seit 1982" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/60 to-background"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12 md:py-20">
          <AnimatedElement direction="up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-3 sm:mb-4 tracking-tight leading-tight">
              Ihr Autohaus in Iserlohn-Letmathe
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-paragraph font-light mb-8 sm:mb-12 leading-relaxed px-2">
              Gepflegte Gebrauchtwagen, persönliche Beratung und schnelle Kontaktaufnahme bei Automobile Quick – seit 1982.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap">
              <Link
                to="/vehicles"
                className="px-6 sm:px-8 py-3 bg-secondary text-white font-medium rounded-sm hover:bg-secondary/90 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Fahrzeuge ansehen
                <ChevronRight size={18} />
              </Link>
              <button
                onClick={() => window.location.href = '#contact'}
                className="px-6 sm:px-8 py-3 bg-white text-primary font-medium rounded-sm hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Besichtigung anfragen
                <ChevronRight size={18} />
              </button>
              <a
                href="tel:+4923311234567"
                className="px-6 sm:px-8 py-3 border-2 border-white text-white font-medium rounded-sm hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Anrufen
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="relative z-20 -mt-12 sm:-mt-16 md:-mt-24 mb-6 sm:mb-12 md:mb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatedElement delay={200}>
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-center mb-4 sm:mb-6 md:mb-8 text-primary">
                Jetzt Fahrzeug finden
              </h2>
              
              <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                  {/* Manufacturer */}
                  <div className="flex flex-col">
                    <select
                      value={manufacturer}
                      onChange={(e) => setManufacturer(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-none border-b-2 border-gray-200 bg-transparent text-foreground text-sm sm:text-base focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-none border-b-2 border-gray-200 bg-transparent text-foreground text-sm sm:text-base focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-none border-b-2 border-gray-200 bg-transparent text-foreground text-sm sm:text-base focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-none border-b-2 border-gray-200 bg-transparent text-foreground text-sm sm:text-base focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">km bis</option>
                      <option value="10000">bis 10.000</option>
                      <option value="30000">bis 30.000</option>
                      <option value="50000">bis 50.000</option>
                      <option value="100000">bis 100.000</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-center mt-2 sm:mt-4">
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 sm:px-12 py-2 sm:py-3 rounded-sm font-medium text-sm sm:text-base hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span>1040 Treffer</span>
                  </button>
                </div>
              </form>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-b border-gray-200 py-6 sm:py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
            <AnimatedElement delay={0}>
              <div className="flex flex-col items-center">
                <div className="flex gap-1 mb-2 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-bold text-primary">5 Sterne</p>
                <p className="text-xs text-gray-600">auf mobile.de</p>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <div className="flex flex-col items-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">157</p>
                <p className="text-sm font-bold text-primary">Bewertungen</p>
                <p className="text-xs text-gray-600">von Kunden</p>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <div className="flex flex-col items-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">1982</p>
                <p className="text-sm font-bold text-primary">Seit</p>
                <p className="text-xs text-gray-600">in Iserlohn-Letmathe</p>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={300}>
              <div className="flex flex-col items-center">
                <Users size={28} className="text-primary mb-2" />
                <p className="text-sm font-bold text-primary">Persönliche</p>
                <p className="text-xs text-gray-600">Beratung</p>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={400}>
              <div className="flex flex-col items-center">
                <Award size={28} className="text-primary mb-2" />
                <p className="text-sm font-bold text-primary">Geprüfte</p>
                <p className="text-xs text-gray-600">Gebrauchtwagen</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* FEATURED VEHICLES SECTION */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-3 sm:mb-4">
                Aktuelle Fahrzeuge
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Entdecken Sie unsere neuesten Fahrzeuge mit bester Qualität und fairen Preisen</p>
              <div className="w-16 sm:w-24 h-1 bg-secondary mx-auto"></div>
            </div>
          </AnimatedElement>

          <div className="relative min-h-[400px]">
            {/* Always render the grid container for refs to attach safely */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 transition-opacity duration-500 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              {isLoading ? (
                // Loading Skeletons
                Array.from({ length: 6 }).map((_, i) => (
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
                // Actual Data - Show first 6 vehicles
                vehicles.slice(0, 6).map((vehicle, index) => (
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
                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 text-xs font-bold text-primary rounded-sm shadow-sm">
                          Sofort lieferbar
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-3 sm:p-5 flex flex-col flex-grow">
                        <div className="mb-3 sm:mb-4 flex-grow">
                          <h3 className="text-base sm:text-lg font-bold text-primary leading-tight mb-1 group-hover:text-secondary transition-colors">
                            {vehicle.manufacturer} {vehicle.model}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-2 sm:mb-3">
                            {vehicle.description || 'Gebrauchtwagen | Automatik | Top Zustand'}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-y-1 sm:gap-y-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="text-secondary" />
                              <span>{vehicle.firstRegistrationYear ? `EZ ${vehicle.firstRegistrationYear}` : 'Neu'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Info size={12} className="text-secondary" />
                              <span>{vehicle.mileage ? `${vehicle.mileage.toLocaleString('de-DE')} km` : '0 km'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap size={12} className="text-secondary" />
                              <span>{vehicle.power ? `${vehicle.power} kW` : '-'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check size={12} className="text-secondary" />
                              <span>{vehicle.driveType || 'Automatik'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                          <p className="text-xs text-gray-500 mb-1">Barpreis</p>
                          <div className="flex items-end justify-between">
                            <div>
                              <span className="text-xl sm:text-2xl font-bold text-primary">
                                {formatPrice(vehicle.price)}
                              </span>
                              <p className="text-[10px] text-gray-400">inkl. 19% MwSt.</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
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
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            <AnimatedElement direction="left">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6 sm:p-8 rounded-sm shadow-lg">
                <Award size={40} className="mb-4 text-secondary" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3">Geprüfte Gebrauchtwagen</h3>
                <p className="text-sm sm:text-base text-white/90">Alle Fahrzeuge werden sorgfältig geprüft und inspiziert, um höchste Qualitätsstandards zu gewährleisten.</p>
              </div>
            </AnimatedElement>
            <AnimatedElement direction="up" delay={100}>
              <div className="bg-gradient-to-br from-secondary to-secondary/80 text-white p-6 sm:p-8 rounded-sm shadow-lg">
                <Users size={40} className="mb-4 text-white" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3">Persönliche Beratung</h3>
                <p className="text-sm sm:text-base text-white/90">Unser erfahrenes Team berät Sie kompetent und fair – ganz nach Ihren individuellen Wünschen und Anforderungen.</p>
              </div>
            </AnimatedElement>
            <AnimatedElement direction="right" delay={200}>
              <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6 sm:p-8 rounded-sm shadow-lg">
                <Zap size={40} className="mb-4 text-secondary" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3">Regional verwurzelt</h3>
                <p className="text-sm sm:text-base text-white/90">Seit 1982 sind wir ein verlässlicher Partner für Gebrauchtwagen in Iserlohn-Letmathe und der Region.</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* TRADE-IN TEASER */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatedElement>
            <div className="bg-white rounded-sm shadow-lg p-8 sm:p-12 md:p-16 text-center border-l-4 border-secondary">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4 sm:mb-6">
                Sie möchten Ihr Auto verkaufen?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
                Automobile Quick bietet faire Preise für Ihren Gebrauchtwagen. Kontaktieren Sie uns für eine unverbindliche Bewertung.
              </p>
              <Link
                to="/autoankauf"
                className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-white font-medium rounded-sm hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Autoankauf anfragen
                <ChevronRight size={20} />
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* FINANCING TEASER */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatedElement>
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-sm shadow-lg p-8 sm:p-12 md:p-16 text-center text-white border-r-4 border-secondary">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6">
                Flexible Finanzierungslösungen
              </h2>
              <p className="text-sm sm:text-base text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
                Wir bieten attraktive Finanzierungsmöglichkeiten für Ihren Traumwagen. Lassen Sie sich von unserem Team beraten.
              </p>
              <Link
                to="/finanzierung"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-medium rounded-sm hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Finanzierung anfragen
                <ChevronRight size={20} />
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* CONTACT & LOCATION SECTION */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 bg-white rounded-sm shadow-lg overflow-hidden border border-gray-100">
            
            {/* Info Side */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <AnimatedElement direction="left">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6 sm:mb-8">Kontakt & Anfahrt</h3>
                
                <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-secondary mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-primary mb-1">Adresse</p>
                      <p className="text-sm sm:text-base text-gray-600">
                        Automobile Quick<br/>
                        Hagener Str. 126a<br/>
                        58642 Iserlohn
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="text-secondary flex-shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-primary mb-1">Telefon</p>
                      <a href="tel:+4923311234567" className="text-sm sm:text-base text-secondary hover:text-secondary/80 transition-colors">+49 (0) 2331 123456</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="text-secondary flex-shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-primary mb-1">E-Mail</p>
                      <a href="mailto:info@automobilequick.de" className="text-sm sm:text-base text-secondary hover:text-secondary/80 transition-colors">info@automobilequick.de</a>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 sm:p-6 rounded-sm border border-gray-200">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-3xl sm:text-4xl font-bold text-primary">4.9</div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Basierend auf 157 Bewertungen</p>
                  <p className="text-xs sm:text-sm text-gray-500">Vertrauen Sie auf unsere Erfahrung und Kundenzufriedenheit</p>
                </div>
              </AnimatedElement>
            </div>

            {/* Map Side */}
            <div className="h-[300px] sm:h-[400px] lg:h-auto relative bg-gray-200">
              <AnimatedElement direction="right" className="w-full h-full">
                {/* Placeholder for Google Maps iframe to avoid actual external requests in this environment */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 p-6 sm:p-8 text-center">
                  <MapPin size={48} className="mb-4 text-primary" />
                  <p className="font-bold mb-2 text-sm sm:text-base text-primary">Automobile Quick</p>
                  <p className="text-xs sm:text-sm text-gray-600 mb-6">Hagener Str. 126a, 58642 Iserlohn</p>
                  <button 
                    className="bg-secondary text-white px-6 py-2 rounded-sm text-xs sm:text-sm font-medium hover:bg-secondary/90 transition-colors shadow-md"
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

      {/* ... keep existing code (BESTSELLER BRANDS, IMAGE GALLERY, LOCATION & REVIEWS sections removed) ... */}

      <Footer />
    </div>
  );
}
