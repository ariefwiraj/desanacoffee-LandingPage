import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGalleryStore } from '@/store/galleryStore';
import { Maximize2 } from 'lucide-react';

const DUMMY_GALLERY = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop',
    caption: 'Suasana hangat di pagi hari'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2070&auto=format&fit=crop',
    caption: 'Kopi hitam peningkat semangat'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop',
    caption: 'Sudut favorit para pengunjung'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop',
    caption: 'Barista in action'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop',
    caption: 'Biji kopi pilihan'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1964&auto=format&fit=crop',
    caption: 'Signature latte art'
  }
];

export function GallerySection() {
  const [images, setImages] = useState<typeof DUMMY_GALLERY>([]);
  const openModal = useGalleryStore((state) => state.openModal);

  useEffect(() => {
    // Simulate Supabase fetch
    setTimeout(() => {
      setImages(DUMMY_GALLERY);
    }, 500);
  }, []);

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
        </motion.div>

        {/* Masonry Grid Simulation (using CSS columns for simplicity) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all"
              onClick={() => openModal(idx, images)}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
