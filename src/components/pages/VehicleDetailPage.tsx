import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Gauge, Zap, Fuel, ArrowLeft, Phone, MapPin, Wrench, Check } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags, getStructuredDataProduct } from '@/lib/seo';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

// Mock features for the demo vehicle
const DEMO_FEATURES = [
  'Klimaanlage',
  'Einparkhilfe hinten',
  'Apple CarPlay',
  'Android Auto',
  'Sitzheizung',
  'Tempomat',
  'Alu 16"',
];

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicles | null>(null);
  const [similarVehicles, setSimilarVehicles] = useState<Vehicles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    loadVehicle();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadVehicle = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<Vehicles>('vehicles', id);
      setVehicle(data);
      
      // Load similar vehicles
      const allVehicles = await BaseCrudService.getAll<Vehicles>('vehicles', [], { limit: 10 });
      const similar = allVehicles.items
        .filter(v => v._id !== id && v.manufacturer === data?.manufacturer)
        .slice(0, 4);
      setSimilarVehicles(similar.length >= 3 ? similar : allVehicles.items.filter(v => v._id !== id).slice(0, 4));
      
      // Update SEO for vehicle detail page
      if (data) {
        updateMetaTags({
          title: `${data.manufacturer} ${data.model} - Gebrauchtwagen bei Automobile Quick`,
          description: data.description || `${data.manufacturer} ${data.model} - Hochwertiger Gebrauchtwagen bei Automobile Quick in Iserlohn-Letmathe. Faire Preise und persönliche Beratung.`,
          keywords: `${data.manufacturer}, ${data.model}, Gebrauchtwagen, ${data.driveType}, Iserlohn, Letmathe`,
          ogTitle: `${data.manufacturer} ${data.model} - Automobile Quick`,
          ogDescription: data.description || `${data.manufacturer} ${data.model} - Hochwertiger Gebrauchtwagen`,
          ogImage: data.mainImage,
          canonicalUrl: `https://automobilequick.de/vehicles/${id}`,
          structuredData: getStructuredDataProduct(data),
        });
      }
    } catch (error) {
      console.error('Error loading vehicle:', error);
    } finally {
      setIsLoading(false);
    }
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

  const calculateFinancing = (price?: number) => {
    if (!price) return 'auf Anfrage';
    const monthlyRate = Math.round(price / 100);
    return `${monthlyRate} EUR`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a href="#main-content" className="skip-to-main">
        Zum Hauptinhalt springen
      </a>
      <Header />

      <div className="flex-1">
        {isLoading ? (
          <div className="container mx-auto px-4 max-w-7xl py-20 flex justify-center items-center min-h-[600px]">
            <LoadingSpinner className="w-12 h-12 text-primary" />
          </div>
        ) : !vehicle ? (
          <div className="container mx-auto px-4 max-w-7xl py-20 text-center min-h-[600px] flex flex-col justify-center">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
              Fahrzeug nicht gefunden
            </h2>
            <Link
              to="/vehicles"
              className="text-primary hover:text-primary/80 font-bold text-lg transition-colors inline-block"
            >
              Zurück zur Übersicht
            </Link>
          </div>
        ) : (
          <>
            {/* Back Link */}
            <div className="container mx-auto px-4 max-w-7xl pt-6 sm:pt-8" id="main-content">
              <Link
                to="/vehicles"
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-200 text-base sm:text-lg"
              >
                <ArrowLeft size={22} />
                Zurück zur Übersicht
              </Link>
            </div>

            {/* Image Gallery Section */}
            <AnimatedElement className="container mx-auto px-4 max-w-7xl py-8 sm:py-12">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  {vehicle.mainImage ? (
                    <Image
                      src={vehicle.mainImage}
                      alt={`${vehicle.manufacturer} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                      width={1200}
                      height={675}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-gray-300 mb-4">📷</div>
                        <p className="text-xl font-bold text-gray-500">Bild folgt</p>
                        <p className="text-sm text-gray-400 mt-2">Hochwertige Fotos in Kürze verfügbar</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedElement>

            {/* Main Content Grid */}
            <div className="container mx-auto px-4 max-w-7xl pb-24 sm:pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Title & Intro */}
                  <AnimatedElement>
                    <div>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
                        {vehicle.manufacturer} {vehicle.model}
                      </h1>
                      <p className="text-lg text-gray-700 leading-relaxed font-paragraph">
                        Gepflegter Gebrauchtwagen bei Automobile Quick in Iserlohn-Letmathe. Persönliche Beratung, Besichtigung vor Ort und unverbindliche Finanzierungsanfrage möglich.
                      </p>
                    </div>
                  </AnimatedElement>

                  {/* Technical Data */}
                  <AnimatedElement>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                        Technische Kerndaten
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {vehicle.firstRegistrationYear && (
                          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Erstzulassung</p>
                            </div>
                            <p className="font-bold text-lg text-primary">{vehicle.firstRegistrationYear}</p>
                          </div>
                        )}

                        {vehicle.mileage && (
                          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                              <Gauge className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Kilometerstand</p>
                            </div>
                            <p className="font-bold text-lg text-primary">
                              {vehicle.mileage.toLocaleString('de-DE')} km
                            </p>
                          </div>
                        )}

                        {vehicle.power && (
                          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                              <Zap className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Leistung</p>
                            </div>
                            <p className="font-bold text-lg text-primary">
                              {Math.round(vehicle.power * 1.36)} PS
                            </p>
                          </div>
                        )}

                        {vehicle.driveType && (
                          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                              <Fuel className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Kraftstoff</p>
                            </div>
                            <p className="font-bold text-lg text-primary">{vehicle.driveType}</p>
                          </div>
                        )}

                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-2">
                            <Wrench className="text-secondary flex-shrink-0" size={24} />
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Getriebe</p>
                          </div>
                          <p className="font-bold text-lg text-primary">Automatik</p>
                        </div>

                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-2">
                            <MapPin className="text-secondary flex-shrink-0" size={24} />
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Standort</p>
                          </div>
                          <p className="font-bold text-lg text-primary">Iserlohn-Letmathe</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>

                  {/* Features/Equipment */}
                  <AnimatedElement>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                        Ausstattung
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {DEMO_FEATURES.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-neutral-100 rounded-lg border border-gray-200">
                            <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                            <span className="font-medium text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedElement>

                  {/* Description */}
                  {vehicle.description && (
                    <AnimatedElement>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                          Beschreibung
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-base font-paragraph">
                          {vehicle.description}
                        </p>
                      </div>
                    </AnimatedElement>
                  )}

                  {/* Similar Vehicles */}
                  {similarVehicles.length > 0 && (
                    <AnimatedElement>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                          Ähnliche Fahrzeuge
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {similarVehicles.map((v) => (
                            <Link
                              key={v._id}
                              to={`/vehicles/${v._id}`}
                              className="group bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                              <div className="aspect-video bg-gray-100 overflow-hidden">
                                {v.mainImage ? (
                                  <Image
                                    src={v.mainImage}
                                    alt={`${v.manufacturer} ${v.model}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    width={400}
                                    height={225}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <span className="text-4xl font-bold text-gray-400">📷</span>
                                  </div>
                                )}
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-lg text-primary mb-2 group-hover:text-secondary transition-colors">
                                  {v.manufacturer} {v.model}
                                </h3>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">
                                    {v.firstRegistrationYear} • {v.mileage?.toLocaleString('de-DE')} km
                                  </span>
                                  <span className="font-bold text-secondary">{formatPrice(v.price)}</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </AnimatedElement>
                  )}
                </div>

                {/* Right Column - Sticky Price Box */}
                <div className="lg:col-span-1">
                  <div className={`${scrolled ? 'fixed' : 'sticky'} top-24 lg:top-32 right-4 lg:right-auto w-full sm:w-96 lg:w-auto transition-all duration-300`}>
                    <AnimatedElement className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 sm:p-8">
                      {/* Price */}
                      <div className="mb-8">
                        <p className="text-sm text-gray-600 font-medium mb-2">Verkaufspreis</p>
                        <p className="text-5xl sm:text-6xl font-bold text-primary">
                          {formatPrice(vehicle.price)}
                        </p>
                      </div>

                      {/* Financing */}
                      <div className="mb-8 p-4 bg-neutral-100 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 font-medium mb-1">Finanzierung ab</p>
                        <p className="text-2xl font-bold text-secondary">
                          {calculateFinancing(vehicle.price)}/Monat
                        </p>
                        <p className="text-xs text-gray-500 mt-2">(unverbindlich)</p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-3">
                        <a
                          href="tel:+492374912912"
                          className="flex items-center justify-center gap-2 w-full bg-secondary text-white px-6 py-4 rounded-lg font-bold hover:bg-secondary/90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md text-base"
                        >
                          <Phone size={20} />
                          Anrufen
                        </a>
                        <Link
                          to="/contact"
                          className="block w-full bg-primary text-white text-center px-6 py-4 rounded-lg font-bold hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md text-base"
                        >
                          Besichtigung anfragen
                        </Link>
                        <Link
                          to="/finanzierung"
                          className="block w-full bg-white text-primary border-2 border-primary text-center px-6 py-4 rounded-lg font-bold hover:bg-primary/5 transition-all duration-300 text-base"
                        >
                          Finanzierung anfragen
                        </Link>
                      </div>

                      {/* Info Text */}
                      <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
                        Alle Angaben ohne Gewähr. Besichtigung und Beratung vor Ort möglich.
                      </p>
                    </AnimatedElement>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 shadow-2xl">
              <div className="container mx-auto px-4 max-w-7xl py-3 flex gap-3">
                <a
                  href="tel:+492374912912"
                  className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white px-4 py-3 rounded-lg font-bold hover:bg-secondary/90 transition-all duration-300 text-sm"
                >
                  <Phone size={18} />
                  Anrufen
                </a>
                <Link
                  to="/contact"
                  className="flex-1 bg-primary text-white text-center px-4 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all duration-300 text-sm"
                >
                  Besichtigung
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
