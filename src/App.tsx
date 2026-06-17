import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { FeaturedMenuSection } from '@/sections/FeaturedMenuSection';
import { GallerySection } from '@/sections/GallerySection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { LocationSection } from '@/sections/LocationSection';
import { CTASection } from '@/sections/CTASection';
import { FooterSection } from '@/sections/FooterSection';
import { MenuOverlay } from '@/components/MenuOverlay';
import { GalleryModal } from '@/components/GalleryModal';

function App() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedMenuSection />
        <GallerySection />
        <TestimonialsSection />
        <LocationSection />
        <CTASection />
      </main>

      <FooterSection />

      {/* Modals & Overlays */}
      <MenuOverlay />
      <GalleryModal />
    </div>
  );
}

export default App;
