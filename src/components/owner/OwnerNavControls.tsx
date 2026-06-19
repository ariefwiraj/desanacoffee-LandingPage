import { Shield, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function OwnerNavControls() {
  const { owner, logout } = useAuthStore();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/15 rounded-full">
        <Shield className="w-3.5 h-3.5 text-accent" />
        <span className="text-xs font-medium text-accent whitespace-nowrap">
          Owner Mode
        </span>
      </div>
      {owner && (
        <span className="hidden lg:inline text-xs text-white/70 truncate max-w-[120px]">
          {owner.name}
        </span>
      )}
      <button
        onClick={logout}
        className="flex items-center gap-1.5 text-xs text-white/70 hover:text-accent transition-colors"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}
