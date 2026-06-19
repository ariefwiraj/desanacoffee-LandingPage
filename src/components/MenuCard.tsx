import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number; // in IDR
  category: string;
  imageUrl: string;
  featured?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function MenuCard({ name, description, price, category, imageUrl, onEdit, onDelete }: MenuCardProps) {
  // Format price as "25K"
  const formattedPrice = `${Math.floor(price / 1000)}K`;

  const handleDelete = () => {
    if (window.confirm(`Delete "${name}"? This action cannot be undone.`)) {
      onDelete?.();
    }
  };

  return (
    <motion.div 
      className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-border relative"
      whileHover={{ y: -4 }}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {category}
          </span>
        </div>

        {/* Owner edit/delete controls */}
        {(onEdit || onDelete) && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shadow-md hover:bg-accent/90 transition-colors"
                title="Edit"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="font-serif font-bold text-xl leading-tight text-primary">{name}</h3>
          <span className="font-bold text-lg text-accent whitespace-nowrap">{formattedPrice}</span>
        </div>
        <p className="text-foreground/70 text-sm mt-auto">{description}</p>
      </div>
    </motion.div>
  );
}
