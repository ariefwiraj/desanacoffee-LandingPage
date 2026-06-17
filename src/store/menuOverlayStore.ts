import { create } from 'zustand';

interface MenuOverlayState {
  isOpen: boolean;
  searchQuery: string;
  activeCategory: string;
  open: () => void;
  close: () => void;
  setSearchQuery: (q: string) => void;
  setActiveCategory: (cat: string) => void;
  reset: () => void;
}

export const useMenuOverlayStore = create<MenuOverlayState>((set) => ({
  isOpen: false,
  searchQuery: '',
  activeCategory: 'All',
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  reset: () => set({ searchQuery: '', activeCategory: 'All' }),
}));
