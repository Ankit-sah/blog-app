// app/posts/create/page.tsx
'use client';

import { useEffect } from 'react';
import PostForm from '@/components/forms/PostForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';


export default function CreatePostPage() {
  const { requireAuth, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      requireAuth();
    }
  }, [isAuthenticated, requireAuth]);

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-10">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">✍️</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create New Post
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Share your thoughts and ideas with the world
            </p>
          </div>
          <PostForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}