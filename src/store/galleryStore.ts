import { create } from 'zustand';

interface GalleryState {
  isOpen: boolean;
  selectedIndex: number;
  images: { url: string; caption: string }[];
  openModal: (index: number, images: { url: string; caption: string }[]) => void;
  closeModal: () => void;
  next: () => void;
  prev: () => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  isOpen: false,
  selectedIndex: 0,
  images: [],
  openModal: (index, images) => set({ isOpen: true, selectedIndex: index, images }),
  closeModal: () => set({ isOpen: false }),
  next: () => set((state) => ({ 
    selectedIndex: (state.selectedIndex + 1) % state.images.length 
  })),
  prev: () => set((state) => ({ 
    selectedIndex: (state.selectedIndex - 1 + state.images.length) % state.images.length 
  })),
}));
