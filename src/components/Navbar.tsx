import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useScrollspy } from '@/hooks/useScrollspy';
import { MobileDrawer } from './MobileDrawer';
import { OwnerNavControls } from './owner/OwnerNavControls';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Menu', target: 'menu' },
  { label: 'Gallery', target: 'gallery' },
  { label: 'Location', target: 'location' },
];

const navLinkIds = navLinks.map(l => l.target);

export const scrollToTarget = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
  e.preventDefault();
  const element = document.getElementById(target);
  if (!element) return;

  // Update the URL hash without triggering a sudden jump
  history.pushState(null, '', `#${target}`);

  const targetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 800; // 800ms duration
  let start: number | null = null;

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    
    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

export function Navbar() {
  const scrollY = useScrollPosition();
  const activeId = useScrollspy(navLinkIds, 100);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const isScrolled = scrollY > 50;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled ? "bg-primary/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
        )}
      >
        <div className="w-full pl-6 md:pl-12 lg:pl-40 pr-6 md:pr-12 flex items-center justify-between relative">
          {/* LOGO AREA */}
          <div className="flex-shrink-0 z-10">
            <a 
              href="#home" 
              onClick={(e) => scrollToTarget(e, 'home')}
              className="block focus:outline-none"
            >
              <img 
                src="/images/logo_desana.jpg" 
                alt="Desana Logo" 
                className="h-12 w-auto object-contain transition-all duration-300" 
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = activeId === link.target || (!activeId && link.target === 'home');
              
              return (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  onClick={(e) => scrollToTarget(e, link.target)}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-2 block flex flex-col items-center",
                    "hover:text-accent",
                    "after:content-[''] after:h-[2px] after:bg-accent after:absolute after:bottom-0 after:transition-all after:duration-300",
                    isActive
                      ? "text-accent after:w-3/5 scale-100 opacity-100"
                      : "text-white/90 after:w-0 hover:after:w-3/5"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right-side controls */}
          <div className="flex items-center gap-4 z-10">
            {isAuthenticated && <OwnerNavControls />}

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-white hover:text-accent transition-colors"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        activeId={activeId}
        navLinks={navLinks}
      />
    </>
  );
}