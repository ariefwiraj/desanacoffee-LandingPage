import { useState, useEffect, useRef } from 'react';
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
}

export function TestimonialCarousel({ items }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
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

  // Scroll to active index
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[activeIndex] as HTMLElement;
      if (child) {
        container.scrollTo({
          left: child.offsetLeft - container.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  if (items.length === 0) return null;

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div 
            key={item.id} 
            className="w-full flex-shrink-0 snap-center md:w-[80%] lg:w-[60%]"
          >
            <TestimonialCard {...item} />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-3 mt-4">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === activeIndex 
                ? 'bg-primary scale-125' 
                : 'bg-primary/20 hover:bg-primary/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
