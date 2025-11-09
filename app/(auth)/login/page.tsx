// app/(auth)/login/page.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/forms/LoginForm';


export default function LoginPage() {
  const { redirectIfAuthenticated } = useAuth();

  useEffect(() => {
    redirectIfAuthenticated();
  }, [redirectIfAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white/95 dark:bg-slate-900/80 shadow-soft p-8 md:p-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300">
              <span className="text-lg font-semibold">B</span>
            </div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Welcome back</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to continue crafting your stories.</p>
          </div>
          
          <div className="mt-8">
            <LoginForm />
          </div>

          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-semibold text-sky-600 hover:text-sky-500 dark:text-sky-300 dark:hover:text-sky-200"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}