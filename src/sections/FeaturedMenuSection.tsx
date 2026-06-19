import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { MenuCard } from '@/components/MenuCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { useMenuOverlayStore } from '@/store/menuOverlayStore';
import { useAuthStore } from '@/store/authStore';
import { menuService } from '@/services/menuService';
import { EditMenuModal } from '@/components/owner/EditMenuModal';
import { getImageUrl } from '@/utils/imageUrl';
import type { Menu } from '@/types';

export function FeaturedMenuSection() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openMenuOverlay = useMenuOverlayStore((state) => state.open);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const fetchMenus = useCallback(async () => {
    setIsLoading(true);
    const data = await menuService.getAll(true);
    setMenus(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const handleEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setIsEditModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingMenu(null);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const success = await menuService.remove(id);
    if (success) fetchMenus();
  };

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

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onClick={handleAddNew}
                className="hidden md:flex items-center gap-2 px-5 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add Menu</span>
              </motion.button>
            )}

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
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : menus.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-foreground/50 text-lg">No featured menu items yet.</p>
            {isAuthenticated && (
              <button
                onClick={handleAddNew}
                className="mt-4 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-all"
              >
                Add your first menu item
              </button>
            )}
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
                <MenuCard
                  id={menu.id}
                  name={menu.name}
                  description={menu.description}
                  price={menu.price}
                  category={menu.category}
                  imageUrl={getImageUrl(menu.image_url)}
                  featured={menu.featured}
                  onEdit={isAuthenticated ? () => handleEdit(menu) : undefined}
                  onDelete={isAuthenticated ? () => handleDelete(menu.id) : undefined}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-10 md:hidden flex flex-col gap-3">
          {isAuthenticated && (
            <button
              onClick={handleAddNew}
              className="flex items-center justify-center w-full gap-2 px-6 py-4 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Menu</span>
            </button>
          )}
          <button
            onClick={openMenuOverlay}
            className="flex items-center justify-center w-full gap-2 px-6 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-all"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Edit/Create Modal */}
      <EditMenuModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        menu={editingMenu}
        onSaved={fetchMenus}
      />
    </section>
  );
}
