import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MenuCard } from '@/components/MenuCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { useMenuOverlayStore } from '@/store/menuOverlayStore';

// Dummy data for initial dev (will be replaced by Supabase)
const DUMMY_FEATURED = [
  {
    id: '1',
    name: 'Desana Signature',
    description: 'Kopi susu gula aren khas dengan resep rahasia yang creamy.',
    price: 25000,
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1964&auto=format&fit=crop',
    featured: true
  },
  {
    id: '2',
    name: 'Manual Brew V60',
    description: 'Pilihan beans single origin untuk penggemar kopi hitam.',
    price: 30000,
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1544243614-2d881e18dce8?q=80&w=2070&auto=format&fit=crop',
    featured: true
  },
  {
    id: '3',
    name: 'Matcha Latte',
    description: 'Premium matcha blend dengan susu segar pilihan.',
    price: 28000,
    category: 'Non Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1515823662972-da6a2b4d3002?q=80&w=2070&auto=format&fit=crop',
    featured: true
  },
  {
    id: '4',
    name: 'Butter Croissant',
    description: 'Croissant buttery yang renyah di luar, lembut di dalam.',
    price: 22000,
    category: 'Food & Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=2003&auto=format&fit=crop',
    featured: true
  }
];

export function FeaturedMenuSection() {
  const [menus, setMenus] = useState<typeof DUMMY_FEATURED>([]);
  const [isLoading, setIsLoading] = useState(true);
  const openMenuOverlay = useMenuOverlayStore((state) => state.open);

  useEffect(() => {
    // Simulate Supabase fetch
    const fetchMenus = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setMenus(DUMMY_FEATURED);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchMenus();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent font-medium tracking-wider uppercase">Our Menu</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
              Pilihan Favorit
            </h2>
            <p className="mt-4 text-foreground/80 text-lg">
              Kurasi menu terbaik kami yang menjadi favorit para pelanggan setia Desana Coffee.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={openMenuOverlay}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-all hover:gap-3"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {menus.map((menu) => (
              <motion.div key={menu.id} variants={itemVariants}>
                <MenuCard {...menu} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-10 md:hidden flex justify-center">
          <button
            onClick={openMenuOverlay}
            className="flex items-center justify-center w-full gap-2 px-6 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-all"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
