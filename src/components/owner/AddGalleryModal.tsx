import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ImagePlus } from 'lucide-react';
import type { GalleryImage } from '@/types';
import { galleryService } from '@/services/galleryService';
import imageCompression from 'browser-image-compression';
import { getImageUrl } from '@/utils/imageUrl';

interface AddGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editingImage?: GalleryImage | null;
}

export function AddGalleryModal({ isOpen, onClose, onSaved, editingImage }: AddGalleryModalProps) {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const isEditing = editingImage !== null && editingImage !== undefined;

  // Populate form when editing
  useEffect(() => {
    if (editingImage) {
      setCaption(editingImage.caption);
      setImagePreview(getImageUrl(editingImage.image_url));
      setImageFile(null);
    } else {
      setCaption('');
      setImagePreview(null);
      setImageFile(null);
    }
    setError('');
  }, [editingImage, isOpen]);

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
        const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true, fileType: 'image/webp' });
        setImageFile(compressedFile);
        setImagePreview(URL.createObjectURL(compressedFile));
      } catch (err) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true, fileType: 'image/webp' });
        setImageFile(compressedFile);
        setImagePreview(URL.createObjectURL(compressedFile));
      } catch (err) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isEditing && !imageFile) {
      setError('Please select an image.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('caption', caption);
    if (imageFile) {
      const originalName = imageFile.name || 'image.jpg';
      const fileName = imageFile.type === 'image/webp' 
        ? originalName.replace(/\.[^/.]+$/, "") + ".webp" 
        : originalName;
      formData.append('image', imageFile, fileName);
    }

    const result = isEditing
      ? await galleryService.update(editingImage.id, formData)
      : await galleryService.create(formData);

    setIsSubmitting(false);

    if (result) {
      onSaved();
      onClose();
    } else {
      setError('Failed to save gallery image. Please try again.');
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
                {isEditing ? 'Edit Photo' : 'Add Photo'}
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

              {/* Image Drop Zone */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Image
                </label>
                <label
                  className="block cursor-pointer"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <div
                    className={`border-2 border-dashed rounded-xl overflow-hidden transition-colors ${
                      isDragging ? 'border-accent bg-accent/5' : 'border-border hover:border-accent'
                    }`}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-56 object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-56 text-foreground/40">
                        <ImagePlus className="w-12 h-12 mb-3" />
                        <span className="text-sm font-medium">
                          Drop image here or click to upload
                        </span>
                        <span className="text-xs mt-1">JPG, PNG up to 5MB</span>
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

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Caption
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-foreground"
                  placeholder="A short caption for this photo"
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
                    Uploading...
                  </span>
                ) : isEditing ? (
                  'Update Photo'
                ) : (
                  'Add Photo'
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
