import { z } from 'zod';
import { Phone, MessageCircle, Mail, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

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

    try {
      console.log('Submitting form...');
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would normally send the data to your backend

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
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
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Information */}
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Kontaktieren Sie uns
            </h2>
            <p className="text-base text-slate-500 mb-8">
              Wir beraten Sie persönlich und unverbindlich. Rufen Sie an, schreiben Sie per
              WhatsApp oder nutzen Sie unser Formular.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone Card */}
              <div className="bg-slate-50 rounded-3xl p-5 flex items-start gap-4 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex-shrink-0">
                  <Phone size={24} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 mb-1">Telefon</p>
                  <p className="text-lg font-semibold text-slate-900 mb-2">
                    +49 (0) 2374 / 912912
                  </p>
                  <a
                    href="tel:+492374912912"
                    className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Jetzt anrufen
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-green-50 rounded-3xl p-5 flex items-start gap-4 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex-shrink-0">
                  <MessageCircle size={24} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 mb-1">WhatsApp</p>
                  <p className="text-lg font-semibold text-slate-900 mb-2">
                    Schnelle Antwort garantiert
                  </p>
                  <a
                    href="https://wa.me/492374912912?text=Hallo%20Automobile%20Quick,%20ich%20interessiere%20mich%20für%20ein%20Fahrzeug."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                  >
                    Nachricht senden
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-slate-50 rounded-3xl p-5 flex items-start gap-4 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex-shrink-0">
                  <Mail size={24} className="text-slate-900" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 mb-1">E-Mail</p>
                  <p className="text-lg font-semibold text-slate-900 mb-2">
                    auto-quick@t-online.de
                  </p>
                  <a
                    href="mailto:auto-quick@t-online.de"
                    className="text-sm font-medium text-slate-900 hover:text-slate-700 transition-colors"
                  >
                    E-Mail schreiben
                  </a>
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-slate-50 rounded-3xl p-5 flex items-start gap-4 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex-shrink-0">
                  <Clock size={24} className="text-slate-900" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 mb-1">Öffnungszeiten</p>
                  <p className="text-sm text-slate-900 mb-1">Mo–Fr: 09:00 – 18:00</p>
                  <p className="text-sm text-slate-900 mb-2">Sa: 09:00 – 13:00</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isOpen ? 'bg-green-500' : 'bg-slate-400'
                      }`}
                    />
                    <span className="text-sm font-medium text-slate-900">
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
            <div ref={mapRef} className="mb-6 rounded-3xl overflow-hidden h-80">
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
              className="w-full mb-8 px-6 py-3 bg-white border border-slate-200 text-slate-900 font-medium rounded-lg hover:bg-slate-50 transition-colors text-center"
            >
              Route berechnen
            </a>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Schnellanfrage</h3>

              {submitSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm animate-fade-in">
                  Vielen Dank! Wir werden uns in Kürze bei Ihnen melden.
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  maxLength={100}
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-red-600 transition-colors ${
                    formErrors.name ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="Ihr Name"
                />
                {formErrors.name && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  maxLength={100}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-red-600 transition-colors ${
                    formErrors.email ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="ihre.email@example.com"
                />
                {formErrors.email && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  maxLength={30}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-red-600 transition-colors"
                  placeholder="+49 (0) 123 / 456789"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  maxLength={2000}
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  aria-describedby="message-counter"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-red-600 transition-colors resize-none"
                  placeholder="Ihre Nachricht..."
                />
                <div id="message-counter" aria-live="polite" className="text-xs text-slate-500 mt-1 text-right">
                  {formData.message.length} / 2000
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
              </button>

              {/* Privacy Notice */}
              <p className="text-xs text-slate-500 text-center">
                Mit dem Absenden stimmen Sie unserer{' '}
                <a href="/datenschutz" className="text-slate-700 hover:text-slate-900 underline">
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
