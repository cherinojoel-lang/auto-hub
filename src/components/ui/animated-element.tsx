import React, { useState, useEffect, useRef } from 'react';

export interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  duration?: number;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 700
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 scale-100';
    // HomePage uses translate-y-12 scale-95
    // Other pages originally used translate-y-8 (no scale)
    // To match original behavior closely while unifying:
    if (duration === 1000) { // HomePage behavior
      switch (direction) {
        case 'up': return 'translate-y-12 scale-95';
        case 'left': return '-translate-x-12';
        case 'right': return 'translate-x-12';
        case 'none': return 'scale-95';
        default: return 'translate-y-12 scale-95';
      }
    } else { // Standard pages behavior
      switch (direction) {
        case 'up': return 'translate-y-8';
        case 'left': return '-translate-x-8';
        case 'right': return 'translate-x-8';
        case 'none': return '';
        default: return 'translate-y-8';
      }
    }
  };

  const durationClass = duration === 1000 ? 'duration-1000' : 'duration-700';

  return (
    <div
      ref={ref}
      className={`transition-all ${durationClass} ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};
