'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services/api';
import { 
  LayoutDashboard, 
  PenTool, 
  History, 
  Settings, 
  LogOut, 
  User
} from 'lucide-react';
import FacebookIcon from '@/components/facebook-icon';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Fetch current user details
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getMe,
    retry: false,
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Composer', path: '/dashboard/composer', icon: PenTool },
    { name: 'History Logs', path: '/dashboard/history', icon: History },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-background/80 backdrop-blur-xl flex flex-col justify-between shrink-0 h-screen sticky top-0 z-20">
      {/* Brand Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-md shadow-primary/20">
            <FacebookIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight text-md bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
            FB BulkPoster
          </span>
        </Link>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/15 text-primary border border-primary/20 shadow-inner'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform group-hover:scale-105 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Section / Footer */}
      <div className="p-4 border-t border-border space-y-3">
        {user && (
          <div className="flex items-center gap-3 p-2 rounded-xl bg-card border border-border">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
              {user.name.substring(0, 2)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate text-gray-900">{user.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user.email || 'Connected via Meta'}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/10 active:scale-[0.98] transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Disconnect Account
        </button>
      </div>
    </aside>
  );
}
