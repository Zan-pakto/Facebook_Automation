'use client';

import { usePathname } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pageService } from '@/services/api';
import { RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [syncMessage, setSyncMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({
    text: '',
    type: null,
  });

  const syncMutation = useMutation({
    mutationFn: pageService.syncPages,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['facebookPages'] });
      setSyncMessage({ text: `Synced ${data.pages?.length || 0} pages successfully!`, type: 'success' });
      setTimeout(() => setSyncMessage({ text: '', type: null }), 4000);
    },
    onError: (error: any) => {
      const errMsg = error.response?.data?.message || error.message;
      setSyncMessage({ text: `Sync failed: ${errMsg}`, type: 'error' });
      setTimeout(() => setSyncMessage({ text: '', type: null }), 6000);
    },
  });

  // Determine page title based on pathname
  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Overview';
      case '/dashboard/composer':
        return 'Post Composer';
      case '/dashboard/history':
        return 'Publishing Logs';
      case '/dashboard/settings':
        return 'Settings & Configuration';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-16 px-8 border-b border-border bg-background/40 backdrop-blur-md flex items-center justify-between sticky top-0 z-10 w-full">
      <div>
        <h2 className="font-bold text-lg text-gray-900 tracking-tight">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-4">
        {syncMessage.type && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
            syncMessage.type === 'success' 
              ? 'bg-success/10 border-success/20 text-success' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          } animate-fade-in`}>
            {syncMessage.type === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5" />
            )}
            <span>{syncMessage.text}</span>
          </div>
        )}

        {pathname !== '/dashboard/settings' && (
          <button
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 border border-border active:scale-[0.98] text-xs font-semibold text-foreground transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncMutation.isPending ? 'animate-spin text-primary' : ''}`} />
            {syncMutation.isPending ? 'Syncing Pages...' : 'Sync Pages'}
          </button>
        )}
      </div>
    </header>
  );
}
