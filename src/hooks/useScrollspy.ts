import { useState, useEffect } from 'react';

export function useScrollspy(ids: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      let currentId = '';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const { top } = element.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          
          if (scrollPosition >= absoluteTop - offset) {
            currentId = id;
          }
        }
      }
      
      if (currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset, activeId]);

  return activeId;
}
