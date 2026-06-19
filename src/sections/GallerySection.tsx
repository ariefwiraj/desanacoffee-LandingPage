import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGalleryStore } from '@/store/galleryStore';
import { useAuthStore } from '@/store/authStore';
import { galleryService } from '@/services/galleryService';
import { AddGalleryModal } from '@/components/owner/AddGalleryModal';
import { getImageUrl } from '@/utils/imageUrl';
import { Maximize2, Plus, Trash2 } from 'lucide-react';
import type { GalleryImage } from '@/types';

export function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  const openModal = useGalleryStore((state) => state.openModal);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const fetchImages = useCallback(async () => {
    const data = await galleryService.getAll();
    setImages(data);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this photo?')) return;
    const success = await galleryService.remove(id);
    if (success) fetchImages();
  };

  const handleAddNew = () => {
    setEditingImage(null);
    setIsModalOpen(true);
  };

  // Map API data to gallery store shape: image_url → url
  const galleryStoreImages = images.map((img) => ({
    url: getImageUrl(img.image_url),
    caption: img.caption,
  }));

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent font-medium tracking-wider uppercase">Gallery</span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Momen di Desana
          </h2>
          <p className="text-foreground/80 text-lg">
            Intip suasana nyaman dan momen spesial yang diabadikan oleh pengunjung dan barista kami.
          </p>

          {isAuthenticated && (
            <button
              onClick={handleAddNew}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Photo</span>
            </button>
          )}
        </motion.div>

        {images.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-foreground/50 text-lg">No gallery photos yet.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all"
                onClick={() => openModal(idx, galleryStoreImages)}
              >
                <img
                  src={getImageUrl(img.image_url)}
                  alt={img.caption}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Owner delete button */}
                {isAuthenticated && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(img.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Delete photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Gallery Modal */}
      <AddGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchImages}
        editingImage={editingImage}
      />
    </section>
  );
}
