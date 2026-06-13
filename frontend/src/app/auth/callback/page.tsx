'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldAlert, Loader2 } from 'lucide-react';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      setErrorMsg(decodeURIComponent(error));
      return;
    }

    if (token) {
      // Store JWT token securely in local storage
      localStorage.setItem('token', token);
      
      // Redirect to dashboard page
      router.push('/dashboard');
    } else {
      setErrorMsg('No authentication token received from Facebook server.');
    }
  }, [router, searchParams]);

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#0f111a] text-center">
        <div className="p-4 rounded-full bg-red-950/40 border border-red-500/20 text-red-500 mb-4 animate-bounce">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-slate-100">Handshake Authentication Failed</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md">{errorMsg}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all text-xs"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f111a]">
      <div className="p-8 rounded-2xl glass-panel flex flex-col items-center max-w-sm w-full border border-white/5 shadow-2xl">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <h3 className="mt-4 font-bold text-slate-200">Processing Facebook OAuth</h3>
        <p className="mt-1 text-xs text-muted-foreground text-center">
          Verifying authorization token and synchronizing permissions. Please wait...
        </p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f111a]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}
