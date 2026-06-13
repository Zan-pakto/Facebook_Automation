'use client';

import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services/api';
import { User as UserIcon, ShieldCheck, Database, HelpCircle, AlertTriangle, Key } from 'lucide-react';
import { User } from '@/types';

export default function SettingsPage() {
  // Fetch user details
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: authService.getMe,
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">System Settings</h1>
        <p className="text-muted-foreground text-xs mt-1">Manage Facebook connections, view API status, and configure environment keys.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Forms */}
        <div className="md:col-span-2 space-y-6">
          
          {/* User Profile Info Card */}
          <div className="p-6 rounded-2xl glass-card space-y-4">
            <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-primary" />
              Connected Facebook Profile
            </h3>
            
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-10 bg-white/5 rounded-xl w-full"></div>
                <div className="h-10 bg-white/5 rounded-xl w-2/3"></div>
              </div>
            ) : user ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">User Display Name</span>
                  <p className="font-semibold text-slate-200">{user.name}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Profile Email</span>
                  <p className="font-semibold text-slate-200">{user.email || 'N/A'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1 sm:col-span-2">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Facebook User ID</span>
                  <code className="font-mono text-slate-300 block mt-0.5">{user.facebookId}</code>
                </div>
              </div>
            ) : (
              <p className="text-xs text-red-400">Could not retrieve user data. Re-authenticate.</p>
            )}
          </div>

          {/* Setup Guide */}
          <div className="p-6 rounded-2xl glass-card space-y-4">
            <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-accent" />
              How to Setup Facebook App Secrets
            </h3>
            
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                Since this is a personal-use app, you can test it directly in developer mode without going through Meta's lengthy App Review process. Follow these steps:
              </p>
              
              <ol className="list-decimal list-inside space-y-2 border-l border-white/5 pl-2 mt-2">
                <li>
                  Go to the <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Meta for Developers Dashboard</a> and register a developer account.
                </li>
                <li>
                  Click <strong>Create App</strong>. Select <strong>Other</strong> &gt; <strong>Business</strong> (or Consumer/None, but Business is recommended for Pages API integration).
                </li>
                <li>
                  Under App Settings &gt; Basic: copy your <strong>App ID</strong> and <strong>App Secret</strong>.
                </li>
                <li>
                  Add a Product: Find <strong>Facebook Login</strong> and click Set Up. Choose Web and enter your site URL (e.g. <code>http://localhost:3000</code>).
                </li>
                <li>
                  In Facebook Login &gt; Settings: add <code>http://localhost:5000/api/auth/facebook/callback</code> to the <strong>Valid OAuth Redirect URIs</strong> input. Save changes.
                </li>
                <li>
                  Open the <code>backend/.env</code> file in your text editor and fill in the values:
                  <pre className="mt-1.5 p-2.5 rounded bg-black/60 border border-white/5 font-mono text-[10px] text-slate-400 overflow-x-auto">
{`FB_APP_ID=your_app_id
FB_APP_SECRET=your_app_secret
FB_REDIRECT_URI=http://localhost:5000/api/auth/facebook/callback`}
                  </pre>
                </li>
                <li>Restart your backend Express server for changes to take effect.</li>
              </ol>
            </div>
          </div>

        </div>

        {/* Right Side: Server info */}
        <div className="space-y-6">
          {/* Status info card */}
          <div className="p-6 rounded-2xl glass-card space-y-4">
            <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
              <Database className="w-4 h-4 text-success" />
              Service Status
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-muted-foreground">Backend API</span>
                <span className="flex items-center gap-1.5 text-success font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span>
                  Active (Port 5000)
                </span>
              </div>
              
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-muted-foreground">MongoDB</span>
                <span className="flex items-center gap-1.5 text-success font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                  Connected
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-muted-foreground">Security Token Cryptography</span>
                <span className="text-slate-300 font-mono">AES-256-CBC</span>
              </div>
            </div>
          </div>

          {/* Dev credentials check */}
          <div className="p-6 rounded-2xl glass-card space-y-4">
            <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
              <Key className="w-4 h-4 text-yellow-500" />
              Meta App Environment Keys
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] leading-normal">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Make sure credentials are set in <code>backend/.env</code> to enable OAuth logins.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
