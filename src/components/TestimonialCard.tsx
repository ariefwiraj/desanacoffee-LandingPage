import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  review: string;
  rating: number;
  avatarUrl?: string;
}

export function TestimonialCard({ name, review, rating, avatarUrl }: TestimonialCardProps) {
  return (
    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm h-full flex flex-col mx-4 select-none">
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
