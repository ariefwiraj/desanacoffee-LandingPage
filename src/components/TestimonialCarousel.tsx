import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TestimonialCard } from './TestimonialCard';

interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  avatarUrl?: string;
}

interface CarouselProps {
  items: Testimonial[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TestimonialCarousel({ items, onEdit, onDelete }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide
  useEffect(() => {
    if (isHovered || items.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length, isHovered]);

  if (items.length === 0) return null;

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto overflow-hidden px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Wrapper Kontainer Slider */}
      <div className="w-full overflow-hidden style={{ backfaceVisibility: 'hidden' }}">
        <motion.div
          className="flex"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          style={{ 
            willChange: 'transform',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)'
          }}
        >
          {items.map((item) => (
            <div 
              key={item.id} 
              className="w-full flex-shrink-0 px-2 box-border"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="max-w-2xl mx-auto h-full">
                <TestimonialCard
                  {...item}
                  onEdit={onEdit ? () => onEdit(item.id) : undefined}
                  onDelete={onDelete ? () => onDelete(item.id) : undefined}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-3 mt-8 relative z-20">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className="p-2 group focus:outline-none"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === activeIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-primary/20 group-hover:bg-primary/50'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}