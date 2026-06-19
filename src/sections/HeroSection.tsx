import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { scrollToTarget } from '@/components/Navbar';

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" 
          alt="Desana Coffee Atmosphere" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* PERUBAHAN DI SINI:
        - Kita pakai lagi 'max-w-[1280px] mx-auto' supaya di layar ultra-lebar tetap aman.
        - Kita naikkan padding kiri di layar besar 'md:pl-20 lg:pl-32' agar teks bergeser manis ke kanan (tidak mepet kiri).
      */}
      <div className="relative z-10 w-full pl-6 md:pl-12 lg:pl-40 pr-6 flex flex-col items-start text-left justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-accent font-medium tracking-widest uppercase mb-4 block">
            Welcome to Desana
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Artisan Coffee <br className="hidden md:block" />
            <span className="text-accent italic">Exceptional</span> Moments
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light">
            Nikmati seduhan kopi terbaik dan suasana nyaman di jantung kota. 
            Tempat ideal untuk berkumpul, bekerja, atau sekadar bersantai.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a 
              href="#menu"
              onClick={(e) => scrollToTarget(e, 'menu')}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:gap-3"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#location"
              onClick={(e) => scrollToTarget(e, 'location')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-white/20 transition-colors border border-white/20"
            >
              <MapPin className="w-5 h-5" />
              <span>Visit Us</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}