import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Edit2, Check } from 'lucide-react';
import type { MenuCategory } from '@/types';
import { categoryService } from '@/services/categoryService';

interface ManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function ManageCategoriesModal({ isOpen, onClose, onSaved }: ManageCategoriesModalProps) {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      setError('');
      setNewCategoryName('');
      setEditingId(null);
    }
  }, [isOpen, fetchCategories]);

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

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    setError('');
    const res = await categoryService.create({ name: newCategoryName.trim(), sort_order: categories.length + 1 });
    if (res) {
      setNewCategoryName('');
      fetchCategories();
      onSaved();
    } else {
      setError('Failed to add category. Name might already exist.');
    }
  };

  const handleEditStart = (cat: MenuCategory) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleEditSave = async (id: string) => {
    if (!editName.trim()) return;
    setError('');
    
    const res = await categoryService.update(id, { name: editName.trim() });
    if (res) {
      setEditingId(null);
      fetchCategories();
      onSaved();
    } else {
      setError('Failed to update category. Name might already exist.');
    }
  };

  const handleDelete = async (id: string) => {
    setError('');
    const res = await categoryService.remove(id);
    if (res.success) {
      fetchCategories();
      onSaved();
    } else {
      setError(res.error || 'Failed to delete category');
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
              <h2 className="text-xl font-serif font-bold text-primary">
                Manage Categories
              </h2>
              <button
                onClick={onClose}
                className="p-2 bg-muted rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Add New Category */}
              <form onSubmit={handleAdd} className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-foreground"
                />
                <button
                  type="submit"
                  disabled={!newCategoryName.trim()}
                  className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </form>

              {/* Categories List */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground/70 uppercase tracking-wider">
                  Current Categories
                </h3>
                {isLoading ? (
                  <div className="text-center py-4 text-foreground/50">Loading...</div>
                ) : categories.length === 0 ? (
                  <div className="text-center py-4 text-foreground/50">No categories found</div>
                ) : (
                  categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded-xl group"
                    >
                      {editingId === cat.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 px-3 py-1.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleEditSave(cat.id);
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                          />
                          <button
                            onClick={() => handleEditSave(cat.id)}
                            className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 text-foreground/50 hover:bg-muted rounded-lg"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="font-medium text-foreground">{cat.name}</span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditStart(cat)}
                              className="p-1.5 text-foreground/60 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(cat.id)}
                              className="p-1.5 text-foreground/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
