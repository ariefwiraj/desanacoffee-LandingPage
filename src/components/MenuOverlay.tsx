import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Settings2 } from 'lucide-react';
import { useMenuOverlayStore } from '@/store/menuOverlayStore';
import { useAuthStore } from '@/store/authStore';
import { menuService } from '@/services/menuService';
import { getImageUrl } from '@/utils/imageUrl';
import { MenuCard } from '@/components/MenuCard';
import { EditMenuModal } from '@/components/owner/EditMenuModal';
import { ManageCategoriesModal } from '@/components/owner/ManageCategoriesModal';
import { cn } from '@/lib/utils';
import type { Menu, MenuCategory } from '@/types';
import { categoryService } from '@/services/categoryService';

export function MenuOverlay() {
  const { isOpen, close, searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useMenuOverlayStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [allMenus, setAllMenus] = useState<Menu[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<Menu[]>([]);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isManageCategoriesOpen, setIsManageCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchMenusAndCategories = useCallback(async () => {
    const [menusData, catsData] = await Promise.all([
      menuService.getAll(),
      categoryService.getAll()
    ]);
    setAllMenus(menusData);
    setCategories(catsData);
  }, []);

  // Fetch data when overlay opens
  useEffect(() => {
    if (isOpen) {
      fetchMenusAndCategories();
    }
  }, [isOpen, fetchMenusAndCategories]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Filter logic
  useEffect(() => {
    let result = allMenus;
    
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q)
      );
    }
    
    setFilteredMenu(result);
  }, [searchQuery, activeCategory, allMenus]);

  const handleEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const success = await menuService.remove(id);
    if (success) fetchMenusAndCategories();
  };

  const dynamicCategories = ['All', ...categories.map(c => c.name)];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl"
          >
            {/* Main Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-[1400px] flex flex-col bg-background shadow-2xl md:h-[90vh] md:rounded-3xl md:w-[95vw] overflow-hidden border border-border"
            >
              {/* Header */}
              <div className="flex flex-col gap-6 p-6 md:p-10 border-b border-border bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-primary">Full Menu</h2>
                    <p className="text-foreground/70">Find your favorite drinks and snacks</p>
                  </div>
                  <button
                    onClick={close}
                    className="p-3 bg-muted rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Search Bar */}
                  <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search menu..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-foreground"
                    />
                  </div>

                  {/* Categories */}
                  <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    <div className="flex items-center gap-2">
                      {dynamicCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={cn(
                            "px-5 py-2 rounded-full font-medium whitespace-nowrap transition-colors",
                            activeCategory === cat 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-foreground hover:bg-muted/80"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                      
                      {isAuthenticated && (
                        <button
                          onClick={() => setIsManageCategoriesOpen(true)}
                          className="px-5 py-2 rounded-full font-medium whitespace-nowrap transition-colors bg-accent/20 text-accent hover:bg-accent/30 flex items-center gap-2"
                        >
                          <Settings2 className="w-4 h-4" />
                          Edit Categories
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Grid */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-background">
                {filteredMenu.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredMenu.map((item) => (
                      <MenuCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        category={item.category}
                        imageUrl={getImageUrl(item.image_url)}
                        featured={item.featured}
                        onEdit={isAuthenticated ? () => handleEdit(item) : undefined}
                        onDelete={isAuthenticated ? () => handleDelete(item.id) : undefined}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Search className="w-10 h-10 text-foreground/40" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">No items found</h3>
                    <p className="text-foreground/70">
                      We couldn't find anything matching "{searchQuery}" in {activeCategory}.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal (renders outside AnimatePresence to avoid z-index issues) */}
      <EditMenuModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        menu={editingMenu}
        onSaved={fetchMenusAndCategories}
      />

      <ManageCategoriesModal
        isOpen={isManageCategoriesOpen}
        onClose={() => setIsManageCategoriesOpen(false)}
        onSaved={fetchMenusAndCategories}
      />
    </>
  );
}
