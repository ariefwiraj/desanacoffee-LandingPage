import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ImagePlus } from 'lucide-react';
import type { Menu } from '@/types';
import { menuService } from '@/services/menuService';
import imageCompression from 'browser-image-compression';
import { getImageUrl } from '@/utils/imageUrl';
import { categoryService } from '@/services/categoryService';
import type { MenuCategory } from '@/types';

interface EditMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menu: Menu | null;
  onSaved: () => void;
}


export function EditMenuModal({ isOpen, onClose, menu, onSaved }: EditMenuModalProps) {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceStr, setPriceStr] = useState<string>('');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isEditing = menu !== null;

  // Fetch categories
  useEffect(() => {
    if (isOpen) {
      categoryService.getAll().then((data) => {
        setCategories(data);
        if (!menu && data.length > 0) {
          setCategory(data[0].name);
        }
      });
    }
  }, [isOpen, menu]);

  // Populate form when editing
  useEffect(() => {
    if (menu) {
      setName(menu.name);
      setDescription(menu.description);
      setPriceStr(menu.price ? new Intl.NumberFormat('id-ID').format(menu.price) : '');
      setCategory(menu.category);
      setFeatured(menu.featured);
      setImagePreview(getImageUrl(menu.image_url));
      setImageFile(null);
    } else {
      setName('');
      setDescription('');
      setPriceStr('');
      setFeatured(false);
      setImagePreview(null);
      setImageFile(null);
    }
    setError('');
  }, [menu, isOpen]);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
          fileType: 'image/webp'
        });
        setImageFile(compressedFile);
        setImagePreview(URL.createObjectURL(compressedFile));
      } catch (err) {
        console.error('Image compression failed', err);
        // Fallback to original
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (!rawValue) {
      setPriceStr('');
      return;
    }
    setPriceStr(new Intl.NumberFormat('id-ID').format(Number(rawValue)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', priceStr.replace(/\./g, ''));
    formData.append('category', category);
    formData.append('featured', String(featured));
    if (imageFile) {
      const originalName = imageFile.name || 'image.jpg';
      const fileName = imageFile.type === 'image/webp' 
        ? originalName.replace(/\.[^/.]+$/, "") + ".webp" 
        : originalName;
      formData.append('image', imageFile, fileName);
    }

    const result = isEditing
      ? await menuService.update(menu.id, formData)
      : await menuService.create(formData);

    setIsSubmitting(false);

    if (result) {
      onSaved();
      onClose();
    } else {
      setError('Failed to save menu item. Please try again.');
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
                {isEditing ? 'Edit Menu Item' : 'Add Menu Item'}
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

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Image
                </label>
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-border rounded-xl overflow-hidden hover:border-accent transition-colors">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 text-foreground/40">
                        <ImagePlus className="w-10 h-10 mb-2" />
                        <span className="text-sm">Click to upload image</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-foreground"
                  placeholder="Menu item name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-foreground resize-none"
                  placeholder="Short description"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Price (IDR)
                  </label>
                  <input
                    type="text"
                    value={priceStr}
                    onChange={handlePriceChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-foreground"
                    placeholder="25.000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-foreground"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Featured Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm font-medium text-foreground/80">
                  Featured on homepage
                </span>
              </label>

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
                  'Update Menu Item'
                ) : (
                  'Add Menu Item'
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
