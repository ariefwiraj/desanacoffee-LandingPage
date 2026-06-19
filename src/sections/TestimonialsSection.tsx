import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { useAuthStore } from '@/store/authStore';
import { testimonialService } from '@/services/testimonialService';
import { EditTestimonialModal } from '@/components/owner/EditTestimonialModal';
import type { Testimonial } from '@/types';

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const fetchTestimonials = useCallback(async () => {
    const data = await testimonialService.getAll();
    setTestimonials(data);
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleEdit = (id: string) => {
    const t = testimonials.find((item) => item.id === id);
    if (t) {
      setEditingTestimonial(t);
      setIsEditModalOpen(true);
    }
  };

  const handleAddNew = () => {
    setEditingTestimonial(null);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const success = await testimonialService.remove(id);
    if (success) fetchTestimonials();
  };

  // Map API response to carousel's expected shape
  const carouselItems = testimonials.map((t) => ({
    id: t.id,
    name: t.customer_name,
    review: t.review,
    rating: t.rating,
    avatarUrl: t.avatar_url ?? undefined,
  }));

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

          {isAuthenticated && (
            <button
              onClick={handleAddNew}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Testimonial</span>
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {carouselItems.length > 0 ? (
            <TestimonialCarousel
              items={carouselItems}
              onEdit={isAuthenticated ? handleEdit : undefined}
              onDelete={isAuthenticated ? handleDelete : undefined}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/50 text-lg">No testimonials yet.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Edit/Create Modal */}
      <EditTestimonialModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        testimonial={editingTestimonial}
        onSaved={fetchTestimonials}
      />
    </section>
  );
}
