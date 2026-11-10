import { z } from 'zod';
import { Phone, MessageCircle, Mail, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { submitLead } from '@/lib/lead-client';

function isBusinessOpen() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours + minutes / 60;

  // Mo-Fr: 09:00 - 18:00
  if (day >= 1 && day <= 5) {
    return currentTime >= 9 && currentTime < 18;
  }

  // Sa: 09:00 - 13:00
  if (day === 6) {
    return currentTime >= 9 && currentTime < 13;
  }

  // Sunday: closed
  return false;
}

function getNextOpeningTime() {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();

  // If it's Monday-Friday before 9 AM
  if (day >= 1 && day <= 5 && hours < 9) {
    return 'heute 09:00';
  }

  // If it's Monday-Friday after 6 PM
  if (day >= 1 && day <= 5 && hours >= 18) {
    if (day === 5) {
      return 'Sa 09:00';
    }
    return `${String(day + 1).padStart(2, '0')} 09:00`;
  }

  // If it's Saturday before 9 AM
  if (day === 6 && hours < 9) {
    return 'heute 09:00';
  }

  // If it's Saturday after 1 PM
  if (day === 6 && hours >= 13) {
    return 'Mo 09:00';
  }

  // If it's Sunday
  if (day === 0) {
    return 'Mo 09:00';
  }

  return 'Mo 09:00';
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setIsOpen(isBusinessOpen());
  }, []);

  // Lazy load Google Maps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !mapLoaded) {
          setMapLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, [mapLoaded]);

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name ist erforderlich';
    }

    if (!formData.email.trim()) {
      errors.email = 'E-Mail ist erforderlich';
    } else if (!z.string().email().safeParse(formData.email).success) {
      errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('Submitting form...');
      const res = await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
        intent: 'general',
      });

      if (res.success) {
        setSubmitSuccess(true);
        setSubmitError(null);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitSuccess(false);
        setSubmitError(res.error);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitSuccess(false);
      setSubmitError('Ihre Anfrage konnte nicht übermittelt werden. Bitte rufen Sie uns direkt an: +49 (0) 2374 / 912912.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const nextOpeningTime = getNextOpeningTime();

  return (
    <section className="w-full bg-surface py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Information */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Kontaktieren Sie uns
            </h2>
            <p className="text-base text-text-secondary mb-8">
              Wir beraten Sie persönlich und unverbindlich. Rufen Sie an, schreiben Sie per
              E-Mail oder nutzen Sie unser Formular.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone Card */}
              <div className="bg-white rounded-xl p-5 border border-border-line flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5 shadow-sm">
                <div className="flex-shrink-0">
                  <Phone size={24} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-secondary mb-1">Telefon</p>
                  <p className="text-base sm:text-lg font-bold text-foreground mb-1">
                    +49 (0) 2374 / 912912
                  </p>
                  <a
                    href="tel:+492374912912"
                    className="text-sm font-bold text-secondary hover:text-cta-hover transition-colors"
                  >
                    Jetzt anrufen
                  </a>
                </div>
              </div>

              {/* Contact Form Card */}
              <div className="bg-white rounded-xl p-5 border border-border-line flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5 shadow-sm">
                <div className="flex-shrink-0">
                  <MessageCircle size={24} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-secondary mb-1">Kontaktformular</p>
                  <p className="text-base sm:text-lg font-bold text-foreground mb-1">
                    Schnelle Antwort garantiert
                  </p>
                  <a
                    href="#kontaktformular"
                    className="text-sm font-bold text-green-700 hover:text-green-800 transition-colors"
                  >
                    Zum Formular
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-xl p-5 border border-border-line flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5 shadow-sm">
                <div className="flex-shrink-0">
                  <Mail size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-secondary mb-1">E-Mail</p>
                  <p className="text-base sm:text-lg font-bold text-foreground mb-1">
                    auto-quick@t-online.de
                  </p>
                  <a
                    href="mailto:auto-quick@t-online.de"
                    className="text-sm font-bold text-primary hover:underline transition-colors"
                  >
                    E-Mail schreiben
                  </a>
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-white rounded-xl p-5 border border-border-line flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5 shadow-sm">
                <div className="flex-shrink-0">
                  <Clock size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-secondary mb-1">Öffnungszeiten</p>
                  <p className="text-sm font-medium text-foreground mb-1">Mo–Fr: 09:00 – 18:00</p>
                  <p className="text-sm font-medium text-foreground mb-2">Sa: 09:00 – 13:00</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isOpen ? 'bg-green-500' : 'bg-slate-400'
                      }`}
                    />
                    <span className="text-xs font-bold text-foreground">
                      {isOpen ? 'Jetzt geöffnet' : `Geschlossen — öffnet ${nextOpeningTime}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map and Form */}
          <div>
            {/* Google Maps */}
            <div ref={mapRef} className="mb-6 rounded-xl overflow-hidden h-72 border border-border-line shadow-sm">
              {mapLoaded && (
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Automobile%20Quick%20Hagener%20Str.%20126a%2058642%20Iserlohn&output=embed"
                  title="Standort Automobile Quick – Google Maps"
                  aria-label="Interaktive Karte: Standort Automobile Quick in Iserlohn-Letmathe"
                />
              )}
            </div>

            {/* Route Button */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Hagener+Str.+126a,+58642+Iserlohn"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mb-6 px-6 py-3 bg-white border border-border-line text-foreground font-bold rounded-md hover:bg-alt-bg transition-colors text-center text-sm shadow-sm"
            >
              Route berechnen
            </a>

            {/* Contact Form */}
            <form id="kontaktformular" onSubmit={handleSubmit} className="space-y-4 scroll-mt-24 bg-white p-6 rounded-xl border border-border-line shadow-sm">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-4">Schnellanfrage</h3>

              {submitSuccess && (
                <div role="status" className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm font-medium">
                  Vielen Dank! Ihre Anfrage ist eingegangen. Wir melden uns schnellstmöglich bei Ihnen.
                </div>
              )}

              {submitError && (
                <div role="alert" className="p-4 bg-amber-50 border border-amber-300 rounded-md text-amber-900 text-sm font-medium">
                  {submitError}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-sm ${
                    formErrors.name ? 'border-red-500 bg-red-50/50' : 'border-border-line'
                  }`}
                  placeholder="Ihr Name"
                />
                {formErrors.name && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{formErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-sm ${
                    formErrors.email ? 'border-red-500 bg-red-50/50' : 'border-border-line'
                  }`}
                  placeholder="ihre.email@example.com"
                />
                {formErrors.email && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{formErrors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-sm"
                  placeholder="+49 (0) 2374 / 912912"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-sm resize-none"
                  placeholder="Ihre Nachricht an uns..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3.5 bg-secondary text-white font-bold rounded-md hover:bg-cta-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] text-base"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
              </button>

              {/* Privacy Notice */}
              <p className="text-xs text-text-secondary text-center">
                Mit dem Absenden stimmen Sie unserer{' '}
                <a href="/datenschutz" className="text-primary hover:underline font-medium">
                  Datenschutzerklärung
                </a>{' '}
                zu.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
