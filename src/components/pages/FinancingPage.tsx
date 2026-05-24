import { useRef, useState, useEffect } from 'react';
import { Zap, Percent, Clock } from 'lucide-react';
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

export default function FinancingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    updateMetaTags({
      title: 'Gebrauchtwagen-Finanzierung in Iserlohn-Letmathe | Automobile Quick',
      description: 'Flexible Finanzierungslösungen für Gebrauchtwagen bei Automobile Quick. Faire Konditionen, schnelle Abwicklung, persönliche Beratung. Jetzt Finanzierung anfragen!',
      keywords: 'Gebrauchtwagen Finanzierung, Autofinanzierung Iserlohn, Kredit Auto, Finanzierungsangebot, Automobile Quick',
      ogTitle: 'Gebrauchtwagen-Finanzierung - Automobile Quick',
      ogDescription: 'Flexible Finanzierungslösungen mit fairen Konditionen für Ihr Fahrzeug.',
      canonicalUrl: 'https://automobilequick.de/finanzierung',
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: 'https://automobilequick.de/' },
        { name: 'Finanzierung', url: 'https://automobilequick.de/finanzierung' },
      ]),
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        vehicle: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-background py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <AnimatedElement>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Gebrauchtwagen-Finanzierung in Iserlohn-Letmathe
              </h1>
              <p className="text-lg md:text-xl text-background/90 leading-relaxed">
                Automobile Quick unterstützt Sie bei der passenden Finanzierung für Ihren Gebrauchtwagen. Fragen Sie Ihr Wunschfahrzeug direkt an und erhalten Sie persönliche Beratung zu möglichen Monatsraten und Laufzeiten.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedElement delay={100}>
              <div className="bg-neutral-100 rounded-lg p-8">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Zap className="text-background" size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  Persönliche Beratung
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed text-center">
                  Kein Online-Abschluss – wir beraten Sie persönlich vor Ort.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={150}>
              <div className="bg-neutral-100 rounded-lg p-8">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Percent className="text-background" size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  Flexible Laufzeiten
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed text-center">
                  Monatsraten und Laufzeiten individuell nach Ihren Möglichkeiten.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-neutral-100 rounded-lg p-8">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Clock className="text-background" size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  Schnelle Rückmeldung
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed text-center">
                  Wir melden uns zeitnah nach Ihrer Anfrage.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-20 bg-neutral-100">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                Finanzierung anfragen
              </h2>
              <p className="text-foreground/70">
                Füllen Sie das Formular aus und wir melden uns zeitnah bei Ihnen.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <form onSubmit={handleSubmit} className="bg-background rounded-lg p-8 shadow-sm border border-neutral-200">
              {/* Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-secondary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="Ihr Name"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefon <span className="text-secondary">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="Ihre Telefonnummer"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="Ihre E-Mail"
                />
              </div>

              {/* Vehicle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Gewünschtes Fahrzeug
                </label>
                <input
                  type="text"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="z.B. BMW X1, Opel Corsa"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nachricht
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
                  placeholder="Weitere Informationen zu Ihrer Finanzierungsanfrage..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-background font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Finanzierung anfragen'}
              </button>

              {/* Legal Notice */}
              <div className="mt-8 p-4 bg-neutral-100 rounded-lg border border-neutral-300">
                <p className="text-xs text-foreground/70 leading-relaxed">
                  <strong>Unverbindliche Anfrage.</strong> Keine Kreditzusage. Kein Online-Abschluss. Keine Garantieversprechen. Alle Angaben ohne Gewähr.
                </p>
              </div>
            </form>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
