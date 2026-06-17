import { motion } from 'framer-motion';
import { InstagramIcon as Instagram } from '@/components/InstagramIcon';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background Pattern/Gradient */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 opacity-30" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Follow Our Journey
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Ikuti kami di Instagram untuk update promo terbaru, menu seasonal, dan cerita di balik setiap cangkir kopi Desana.
          </p>

          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-white/90 hover:scale-105 transition-all shadow-xl"
          >
            <Instagram className="w-6 h-6" />
            <span>@desanacoffee</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
