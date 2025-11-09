'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useRouter } from 'next/navigation';
import { Loader2, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';


const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'user',
      });
      // Redirect to dashboard after successful registration
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError('root', { 
        message: error instanceof Error ? error.message : 'Registration failed' 
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Full Name
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300 flex items-center justify-center border border-emerald-200/70 dark:border-emerald-800/60">
              <User className="h-5 w-5" />
            </div>
          </div>
          <input
            {...register('name')}
            type="text"
            className="block w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-300 dark:focus:border-sky-500 focus:outline-none"
            placeholder="Enter your full name"
          />
        </div>
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{errors.name.message}</p>
        )}
      </div>

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
            <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300 flex items-center justify-center border border-sky-200/80 dark:border-sky-800/60">
              <Lock className="h-5 w-5" />
            </div>
          </div>
          <input
            {...register('password')}
            type="password"
            className="block w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-300 dark:focus:border-sky-500 focus:outline-none"
            placeholder="Create a password"
          />
        </div>
        {errors.password && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Confirm Password
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-900/40 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <Lock className="h-5 w-5" />
            </div>
          </div>
          <input
            {...register('confirmPassword')}
            type="password"
            className="block w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-300 dark:focus:border-sky-500 focus:outline-none"
            placeholder="Confirm your password"
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{errors.confirmPassword.message}</p>
        )}
      </div>

      {errors.root && (
        <div className="rounded-xl border border-red-200/70 dark:border-red-900/60 bg-red-50/80 dark:bg-red-950/40 px-4 py-3">
          <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
            {errors.root.message}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Creating account...</span>
          </>
        ) : (
          <span className="text-sm font-medium">Create account</span>
        )}
      </button>
    </form>
  );
}