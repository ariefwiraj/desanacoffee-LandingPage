import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useScrollspy } from '@/hooks/useScrollspy';
import { MobileDrawer } from './MobileDrawer';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', target: 'hero' },
  { label: 'About', target: 'about' },
  { label: 'Menu', target: 'menu' },
  { label: 'Gallery', target: 'gallery' },
  { label: 'Location', target: 'location' },
];

export function Navbar() {
  const scrollY = useScrollPosition();
  const activeId = useScrollspy(navLinks.map(l => l.target), 100);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
            <a href="#hero" className="block focus:outline-none">
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
              const isActive = activeId === link.target || (!activeId && link.target === 'hero');
              
              return (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  className={cn(
                    // Base classes & Hover effect
                    "text-sm font-medium transition-colors relative py-2 block flex flex-col items-center",
                    "hover:text-accent",
                    // Garis bawah tiruan menggunakan after:
                    "after:content-[''] after:h-[2px] after:bg-accent after:absolute after:bottom-0 after:transition-all after:duration-300",
                    
                    // Kondisi saat menu AKTIF (Sama seperti image_b2c7bd.png)
                    isActive
                      ? "text-accent after:w-3/5 scale-100 opacity-100" // Garis muncul sepanjang 60% teks jika aktif
                      : "text-white/90 after:w-0 hover:after:w-3/5" // Garis 0% tapi memanjang saat di-hover
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white hover:text-accent transition-colors z-10"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
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