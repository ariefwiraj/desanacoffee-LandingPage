import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useMenuOverlayStore } from '@/store/menuOverlayStore';
import { MenuCard } from '@/components/MenuCard';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Coffee', 'Non Coffee', 'Food & Snacks', 'Seasonal'];

// Dummy full menu for development
const FULL_MENU = [
  { id: '1', name: 'Desana Signature', description: 'Kopi susu gula aren.', price: 25000, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1964&auto=format&fit=crop' },
  { id: '2', name: 'Manual Brew V60', description: 'Single origin.', price: 30000, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1544243614-2d881e18dce8?q=80&w=2070&auto=format&fit=crop' },
  { id: '3', name: 'Matcha Latte', description: 'Premium matcha blend.', price: 28000, category: 'Non Coffee', imageUrl: 'https://images.unsplash.com/photo-1515823662972-da6a2b4d3002?q=80&w=2070&auto=format&fit=crop' },
  { id: '4', name: 'Butter Croissant', description: 'Renyah & buttery.', price: 22000, category: 'Food & Snacks', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=2003&auto=format&fit=crop' },
  { id: '5', name: 'Americano', description: 'Espresso & water.', price: 20000, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=1974&auto=format&fit=crop' },
  { id: '6', name: 'Red Velvet Latte', description: 'Manis & creamy.', price: 28000, category: 'Non Coffee', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75bf699?q=80&w=1974&auto=format&fit=crop' },
  { id: '7', name: 'Festive Blend', description: 'Spiced coffee blend.', price: 35000, category: 'Seasonal', imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop' },
];

export function MenuOverlay() {
  const { isOpen, close, searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useMenuOverlayStore();
  const [filteredMenu, setFilteredMenu] = useState(FULL_MENU);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Auto focus search input on desktop slightly delayed to allow animation
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
    let result = FULL_MENU;
    
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
  }, [searchQuery, activeCategory]);

  return (
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
                    {CATEGORIES.map((cat) => (
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
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-background">
              {filteredMenu.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMenu.map((item) => (
                    <MenuCard key={item.id} {...item} />
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
  );
}
