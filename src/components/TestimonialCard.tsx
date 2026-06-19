import { Star, Pencil, Trash2 } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  review: string;
  rating: number;
  avatarUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TestimonialCard({ name, review, rating, avatarUrl, onEdit, onDelete }: TestimonialCardProps) {
  const handleDelete = () => {
    if (window.confirm(`Delete testimonial from "${name}"?`)) {
      onDelete?.();
    }
  };

  return (
    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm h-full flex flex-col mx-4 select-none relative group">
      {/* Owner edit/delete controls */}
      {(onEdit || onDelete) && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center shadow-sm hover:bg-accent/90 transition-colors"
              title="Edit"
            >
              <Pencil className="w-3 h-3" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shadow-sm hover:bg-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      <div className="flex items-center gap-1 mb-6 text-accent">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className="w-5 h-5" 
            fill={i < rating ? "currentColor" : "none"} 
            stroke={i < rating ? "currentColor" : "currentColor"}
            strokeWidth={i < rating ? 1 : 1.5}
            strokeOpacity={i < rating ? 1 : 0.3}
          />
        ))}
      </div>
      
      <p className="text-foreground/80 text-lg mb-8 italic flex-grow">
        "{review}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-muted"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-bold text-lg">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-bold text-foreground">{name}</h4>
          <span className="text-sm text-foreground/60">Local Guide</span>
        </div>
      </div>
    </div>
  );
}
