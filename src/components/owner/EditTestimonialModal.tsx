import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import type { Testimonial } from '@/types';
import { testimonialService } from '@/services/testimonialService';

interface EditTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: Testimonial | null;
  onSaved: () => void;
}

export function EditTestimonialModal({
  isOpen,
  onClose,
  testimonial,
  onSaved,
}: EditTestimonialModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isEditing = testimonial !== null;

  // Populate form
  useEffect(() => {
    if (testimonial) {
      setCustomerName(testimonial.customer_name);
      setReview(testimonial.review);
      setRating(testimonial.rating);
      setAvatarUrl(testimonial.avatar_url || '');
    } else {
      setCustomerName('');
      setReview('');
      setRating(5);
      setAvatarUrl('');
    }
    setError('');
  }, [testimonial, isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const data = {
      customer_name: customerName,
      review,
      rating,
      avatar_url: avatarUrl.trim() || null,
    };

    const result = isEditing
      ? await testimonialService.update(testimonial.id, data)
      : await testimonialService.create(data);

    setIsSubmitting(false);

    if (result) {
      onSaved();
      onClose();
    } else {
      setError('Failed to save testimonial. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-serif font-bold text-primary">
                {isEditing ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 bg-muted rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-foreground"
                  placeholder="Full name"
                />
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Review
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-foreground resize-none"
                  placeholder="Customer review text"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className="w-7 h-7 text-accent"
                        fill={star <= rating ? 'currentColor' : 'none'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Avatar URL{' '}
                  <span className="text-foreground/40 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-foreground"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : isEditing ? (
                  'Update Testimonial'
                ) : (
                  'Add Testimonial'
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
