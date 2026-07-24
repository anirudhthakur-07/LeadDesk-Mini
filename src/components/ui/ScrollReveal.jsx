'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up', 'down', 'left', 'right', 'none'
  duration = 600,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Triggers reveal on scroll down, resets on scroll out so scrolling up/down continuously animates!
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of element is in view
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getDirectionStyles = () => {
    if (isVisible) {
      return 'opacity-100 translate-x-0 translate-y-0 scale-100';
    }

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-8 scale-95';
      case 'down':
        return 'opacity-0 -translate-y-8 scale-95';
      case 'left':
        return 'opacity-0 translate-x-8 scale-95';
      case 'right':
        return 'opacity-0 -translate-x-8 scale-95';
      default:
        return 'opacity-0 scale-95';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
      className={`transition-all ease-out transform-gpu ${getDirectionStyles()} ${className}`}
    >
      {children}
    </div>
  );
}
