'use client';

import { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
          }) => void;
          prompt: () => void;
          renderButton: (
            element: HTMLElement,
            config: {
              theme?: string;
              size?: string;
              text?: string;
              shape?: string;
              logo_alignment?: string;
            }
          ) => void;
          decodeCredential: (token: string) => GoogleUserPayload;
        };
      };
    };
  }
}

interface GoogleUserPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  locale?: string;
  hd?: string;
}

interface User {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';

export function GoogleSignIn() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Parse the ID token from URL hash on mount (after Google redirect)
  const parseTokenFromUrl = useCallback(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('credential=')) {
      const params = new URLSearchParams(hash.substring(1));
      const credential = params.get('credential');
      if (credential) {
        try {
          const payload = window.google?.accounts.id.decodeCredential(credential);
          if (payload) {
            const userObj: User = {
              name: payload.name || 'User',
              email: payload.email || '',
              picture: payload.picture || '',
              sub: payload.sub,
            };
            localStorage.setItem('haima_user', JSON.stringify(userObj));
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            return userObj;
          }
        } catch {
          // Invalid token, ignore
        }
      }
    }
    return null;
  }, []);

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setLoading(false);
      // Check URL first (returning from Google redirect)
      const fromUrl = parseTokenFromUrl();
      if (fromUrl) {
        setUser(fromUrl);
        return;
      }
      // Then check localStorage
      const stored = localStorage.getItem('haima_user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem('haima_user');
        }
      }
    };
    document.head.appendChild(script);
  }, [parseTokenFromUrl]);

  const handleSignIn = () => {
    const id = window.google?.accounts?.id;
    if (id) {
      id.prompt();
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('haima_user');
    setUser(null);
  };

  if (loading) return null;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={user.picture}
          alt={user.name}
          className="h-9 w-9 rounded-full border border-slate-200"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-800">{user.name}</span>
          <span className="text-xs text-slate-500">{user.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="ml-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Sign in with Google
    </button>
  );
}
