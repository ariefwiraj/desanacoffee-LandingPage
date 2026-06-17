import { X } from 'lucide-react';
import { InstagramIcon as Instagram } from './InstagramIcon';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeId: string;
  navLinks: { label: string; target: string }[];
}

export function MobileDrawer({ isOpen, onClose, activeId, navLinks }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-background z-50 shadow-xl flex flex-col"
          >
            <div className="p-4 flex justify-end">
              <button onClick={onClose} className="p-2 text-foreground hover:text-primary transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 p-6 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  onClick={onClose}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-border transition-colors",
                    activeId === link.target ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto p-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>Follow Us</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
