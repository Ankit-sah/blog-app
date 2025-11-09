// app/(auth)/register/page.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import RegisterForm from '@/components/forms/RegisterForm';


export default function RegisterPage() {
  const { redirectIfAuthenticated } = useAuth();

  useEffect(() => {
    redirectIfAuthenticated();
  }, [redirectIfAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white/95 dark:bg-slate-900/80 shadow-soft p-8 md:p-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span className="text-lg font-semibold">B</span>
            </div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Create an account</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Join a friendly corner of the internet for thoughtful writing.</p>
          </div>
          
          <div className="mt-8">
            <RegisterForm />
          </div>

          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-sky-600 hover:text-sky-500 dark:text-sky-300 dark:hover:text-sky-200"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}