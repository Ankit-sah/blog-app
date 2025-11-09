'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, Zap, Palette, Moon, ArrowRight } from 'lucide-react';


export default function HomePage() {
  const { redirectIfAuthenticated } = useAuth();

  useEffect(() => {
    redirectIfAuthenticated();
  }, [redirectIfAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/95 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 text-white shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight">BlogApp</span>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium px-4 py-2 h-9 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-sky-100 dark:bg-slate-800 text-sky-700 dark:text-sky-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Modern Blogging Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight tracking-tight">
            Write Your
            <span className="block text-sky-600 dark:text-sky-400 mt-2">
              Story
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A modern blogging platform built with Next.js 16. Create, share, and discover beautiful stories with an editor that feels delightful.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-18">
            <Link href="/register">
              <Button size="lg" className="bg-sky-600 hover:bg-sky-500 text-white text-base px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2">
                Start Writing Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-base px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6 text-left shadow-soft transition-colors hover:border-sky-200 dark:hover:border-sky-500">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300 group-hover:animate-float-soft">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Lightning fast experience</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Built with Next.js 16 and edge caching for instant navigation and SEO wins.</p>
          </div>
          <div className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6 text-left shadow-soft transition-colors hover:border-emerald-200 dark:hover:border-emerald-500">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 group-hover:animate-float-soft">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Create with comfort</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">A polished editor with space to think, inline media, and serene color cues.</p>
          </div>
          <div className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6 text-left shadow-soft transition-colors hover:border-indigo-200 dark:hover:border-indigo-500">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 group-hover:animate-float-soft">
              <Moon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Day & night ready</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Adaptive theming keeps eyes relaxed whether you write at dawn or midnight.</p>
          </div>
        </div>
      </main>
    </div>
  );
}