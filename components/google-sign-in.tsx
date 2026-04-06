'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            config: {
              theme?: string;
              size?: string;
              text?: string;
              shape?: string;
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

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';

function decodeUser(credential: string): User | null {
  try {
    const payload = window.google!.accounts!.id!.decodeCredential(credential);
    return {
      name: payload.name || 'User',
      email: payload.email || '',
      picture: payload.picture || '',
      sub: payload.sub,
    };
  } catch {
    return null;
  }
}

export function GoogleSignIn() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [gisReady, setGisReady] = useState(false);
  const initRef = useRef(false);

  // Hydration: read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('haima_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('haima_user');
      }
    }
  }, []);

  // GIS initialization
  useEffect(() => {
    if (initRef.current) return;
    if (!CLIENT_ID) {
      console.error('[GoogleSignIn] NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set');
      return;
    }

    initRef.current = true;

    // Check URL hash for credential (returning from Google redirect)
    const hash = window.location.hash;
    if (hash.includes('credential=')) {
      const params = new URLSearchParams(hash.substring(1));
      const credential = params.get('credential');
      if (credential) {
        const userObj = decodeUser(credential);
        if (userObj) {
          localStorage.setItem('haima_user', JSON.stringify(userObj));
          window.history.replaceState({}, document.title, window.location.pathname);
          setUser(userObj);
          return;
        }
      }
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!window.google?.accounts?.id || !buttonRef.current) return;
      setGisReady(true);

      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => {
          const userObj = decodeUser(response.credential);
          if (userObj) {
            localStorage.setItem('haima_user', JSON.stringify(userObj));
            setUser(userObj);
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'medium',
        text: 'signin_with',
        shape: 'rectangular',
      });
    };
    document.head.appendChild(script);
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('haima_user');
    setUser(null);
    initRef.current = false;
  }, []);

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
    <div ref={buttonRef} className="flex items-center">
      {!CLIENT_ID && (
        <span className="text-xs text-red-400">[GIS: missing CLIENT_ID]</span>
      )}
    </div>
  );
}
