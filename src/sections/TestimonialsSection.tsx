import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';

const DUMMY_TESTIMONIALS = [
  {
    id: '1',
    name: 'Budi Santoso',
    review: 'Tempatnya cozy banget buat WFC. Kopinya juara, terutama signature lattenya. Pelayanan ramah dan wifi kenceng!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Wijaya',
    review: 'Selalu jadi pilihan pertama buat meeting santai. Vibe-nya tenang, pastry-nya selalu fresh tiap pagi.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Reza Pahlevi',
    review: 'Manual brew V60 nya konsisten enak. Baristanya pinter diajak ngobrol soal beans. Recommended buat coffee enthusiast.',
    rating: 4,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Dinda Amanda',
    review: 'Spot foto aesthetic ada dimana-mana. Suka banget sama interior designnya. Kopi dan makanannya juga ga mengecewakan.',
    rating: 5
  }
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<typeof DUMMY_TESTIMONIALS>([]);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setTestimonials(DUMMY_TESTIMONIALS);
    }, 500);
  }, []);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 translate-y-1/3" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent font-medium tracking-wider uppercase">Testimonials</span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
            Apa Kata Mereka
          </h2>
          <p className="text-foreground/80 text-lg">
            Cerita pengalaman para pelanggan setia menikmati momen di Desana Coffee.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TestimonialCarousel items={testimonials} />
        </motion.div>
      </div>
    </section>
  );
}
