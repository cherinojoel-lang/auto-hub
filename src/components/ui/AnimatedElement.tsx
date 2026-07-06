import React, { useEffect, useRef, useState } from 'react';

export const AnimatedElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  priority?: boolean
}> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
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
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay, priority]);

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 opacity-100 scale-100';
    switch (direction) {
      case 'up': return 'translate-y-12 opacity-0 scale-95';
      case 'left': return '-translate-x-12 opacity-0';
      case 'right': return 'translate-x-12 opacity-0';
      case 'none': return 'opacity-0 scale-95';
      default: return 'translate-y-12 opacity-0 scale-95';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};
