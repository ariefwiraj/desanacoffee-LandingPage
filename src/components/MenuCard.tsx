import { motion } from 'framer-motion';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number; // in IDR
  category: string;
  imageUrl: string;
  featured?: boolean;
}

export function MenuCard({ name, description, price, category, imageUrl }: MenuCardProps) {
  // Format price as "25K"
  const formattedPrice = `${Math.floor(price / 1000)}K`;

  return (
    <motion.div 
      className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-border"
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
