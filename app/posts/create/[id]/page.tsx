// app/posts/[id]/page.tsx
'use client';

import PostForm from '@/components/forms/PostForm';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { useParams, useRouter } from 'next/navigation';

import { useEffect } from 'react';


export default function EditPostPage() {
  const { id } = useParams();
  const { requireAuth, isAuthenticated } = useAuth();
  const { currentPost, fetchPost, isLoading } = usePosts();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      requireAuth();
      return;
    }
    
    if (id && (!currentPost || currentPost.id !== id)) {
      fetchPost(id as string);
    }
  }, [id, isAuthenticated, currentPost, fetchPost, requireAuth]);

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  if (!isAuthenticated || isLoading || !currentPost || currentPost.id !== id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <h1 className="text-3xl font-bold text-card-foreground mb-6">Edit Post</h1>
          <PostForm post={currentPost} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}