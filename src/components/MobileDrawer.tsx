import { cn } from '@/lib/utils';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { scrollToTarget } from './Navbar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeId: string;
  navLinks: { label: string; target: string }[];
}

const drawerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: -8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 350 }
  },
  exit: { opacity: 0, scale: 0.96, y: -8, transition: { duration: 0.12 } }
};

export function MobileDrawer({ isOpen, onClose, activeId, navLinks }: MobileDrawerProps) {

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30"
            onClick={onClose}
          />

          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-20 left-4 right-4 md:left-auto md:right-12 md:w-64 bg-white rounded-xl shadow-2xl z-50 flex flex-col p-2 border border-gray-100 origin-top-right will-change-transform"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeId === link.target || (!activeId && link.target === 'home');
                return (
                  <a
                    key={link.target}
                    href={`#${link.target}`}
                    onClick={(e) => {
                      scrollToTarget(e, link.target);
                      onClose();
                    }}
                    className={cn(
                      "text-base font-medium px-4 py-3 rounded-lg transition-colors",
                      isActive 
                        ? "bg-gray-100 text-accent" 
                        : "text-gray-800 hover:bg-gray-50 hover:text-primary"
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}