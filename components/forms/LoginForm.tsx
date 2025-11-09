// components/forms/login-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Loader2, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'demo@blog.com',
      password: 'password',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      // Redirect is handled by the page component via redirectIfAuthenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError('root', { 
        message: error instanceof Error ? error.message : 'Login failed' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Email
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300 flex items-center justify-center border border-sky-200/80 dark:border-sky-800/60">
              <Mail className="h-5 w-5" />
            </div>
          </div>
          <input
            {...register('email')}
            type="email"
            className="block w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-300 dark:focus:border-sky-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Password
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300 flex items-center justify-center border border-emerald-200/70 dark:border-emerald-800/60">
              <Lock className="h-5 w-5" />
            </div>
          </div>
          <input
            {...register('password')}
            type="password"
            className="block w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-300 dark:focus:border-sky-500 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        {errors.password && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <div className="rounded-xl border border-red-200/70 dark:border-red-900/60 bg-red-50/80 dark:bg-red-950/40 px-4 py-3">
          <p className="text-sm text-red-600 dark:text-red-400 text-center">
            {errors.root.message}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Signing in...</span>
          </>
        ) : (
          <span className="text-sm font-medium">Sign in</span>
        )}
      </button>

      <div className="text-center">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Demo credentials: demo@blog.com / password
        </p>
      </div>
    </form>
  );
}