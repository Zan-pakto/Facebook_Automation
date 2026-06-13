'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';
import { ShieldCheck, Zap, Layers, BarChart3, AlertCircle } from 'lucide-react';
import FacebookIcon from '@/components/facebook-icon';

export default function LoginPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Check if token exists in URL query or local storage
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      setCheckingAuth(false);
    }

    // Check for error in query string
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error) {
      setErrorMsg(decodeURIComponent(error));
    }
  }, [router]);

  const handleLogin = () => {
    // Redirect to backend Facebook login endpoint
    window.location.href = authService.getLoginUrl();
  };

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f111a]">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground animate-pulse text-sm">Securing handshake with Meta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden px-4 md:px-12 py-8">
      {/* Decorative Glow Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="flex justify-between items-center max-w-7xl w-full mx-auto z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <FacebookIcon className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            FB BulkPoster
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-white/5 glass-panel bg-white/2">
          <ShieldCheck className="w-3.5 h-3.5 text-success" />
          <span>Personal Dashboard v1.0</span>
        </div>
      </header>

      {/* Main content grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl w-full mx-auto items-center justify-center my-auto py-12 z-10">
        {/* Left Side: Teaser & Features */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold w-fit">
            <Zap className="w-3.5 h-3.5" />
            Meta Graph API Integrated
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Publish once.<br />
            Post to <span className="bg-gradient-to-r from-primary via-[#4cc2ff] to-[#a855f7] bg-clip-text text-transparent">multiple Pages</span>.
          </h1>
          
          <p className="text-muted-foreground max-w-xl text-md md:text-lg leading-relaxed">
            Connect your Meta Business account, pull your Pages instantly, and distribute text, images, and videos with a single click. Save hours of manual posting.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 max-w-xl">
            <div className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Multi-Page Selection</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Select a subset or select all pages with toggle selectors.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Unified Media Composer</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Add descriptions, upload high-res images, and video files.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-success/10 text-success">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Status & Error Logs</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Track publishing outcomes per page in real-time history.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Encrypted Storage</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Page tokens are encrypted in DB to secure your access keys.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Glass login card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md p-8 rounded-3xl glass-panel relative overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between">
            {/* Background spotlight */}
            <div className="absolute top-[-20%] left-[-20%] w-[150px] h-[150px] bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Access Dashboard</h2>
              <p className="text-muted-foreground text-sm mt-1">Connect your Facebook Account for Business to manage pages and start broadcasting.</p>
            </div>

            {errorMsg && (
              <div className="mb-6 flex gap-2.5 items-start p-3 bg-red-950/30 border border-red-500/20 text-red-400 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Authentication failed</span>
                  <p className="mt-0.5 leading-normal opacity-90">{errorMsg}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleLogin}
                className="w-full py-4.5 rounded-2xl bg-[#1877f2] hover:bg-[#166fe5] active:scale-[0.98] text-white font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-[#1877f2]/25 group cursor-pointer"
              >
                <FacebookIcon className="w-5 h-5 text-white group-hover:scale-105 transition-transform" />
                Connect via Facebook Login
              </button>

              <div className="text-center pt-2">
                <p className="text-[11px] text-muted-foreground leading-normal max-w-[280px] mx-auto">
                  By connecting, you grant permission to view managed pages, read content, and publish posts on your behalf.
                </p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between text-xs text-muted-foreground">
              <span>Next.js + Express + MongoDB</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span>
                System Operational
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto text-center border-t border-white/5 pt-8 text-xs text-muted-foreground z-10 flex flex-col md:flex-row justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Facebook Bulk Posting Dashboard. Personal Use Licence.</p>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-slate-300">Meta Terms</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-slate-300">App Setup</a>
        </div>
      </footer>
    </div>
  );
}
