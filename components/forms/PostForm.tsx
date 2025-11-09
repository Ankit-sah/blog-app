
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Loader2 } from 'lucide-react';

import { Post } from '@/types';

import { calculateReadTime, generateExcerpt } from '@/lib/util';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import RichTextEditor from './RichTextEditor';
import { Button } from '../ui/Button';
import { usePosts } from '@/hooks/usePosts';



const postSchema = yup.object({
  title: yup.string().required('Title is required').min(10, 'Title must be at least 10 characters'),
  tags: yup.string(),
});

interface PostFormProps {
  post?: Post;
  onSuccess: () => void;
}

export default function PostForm({ post, onSuccess }: PostFormProps) {
  const [content, setContent] = useState(post?.content || '');
  const { createPost, updatePost, isLoading: storeLoading } = usePosts();


  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      tags: post?.tags?.join(', ') || '',
    },
  });

  const isLoading = storeLoading;

  const onSubmit = async (data: any) => {
    if (!content || content === '<p><br></p>' || content === '<p></p>') {
      setError('root', { message: 'Content is required' });
      return;
    }

    try {
      const postData = {
        title: data.title,
        content,
        excerpt: generateExcerpt(content),
        tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '') : [],
        published: true,
        readTime: calculateReadTime(content),
        likes: post?.likes || 0,
      };

      if (post) {
        await updatePost(post.id, postData);
      } else {
        await createPost(postData);
      }
      onSuccess();
    } catch (error) {
      setError('root', { message: 'Failed to save post' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2 block">
          Title
        </Label>
        <Input
          {...register('title')}
          type="text"
          className="mt-2 h-12 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-300 dark:focus:border-sky-500 focus:outline-none"
          placeholder="Enter a captivating title for your post..."
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="tags" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2 block">
          Tags (comma separated)
        </Label>
        <Input
          {...register('tags')}
          type="text"
          className="mt-2 h-12 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-300 dark:focus:border-sky-500 focus:outline-none"
          placeholder="react, nextjs, blog, tutorial"
        />
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          💡 Separate tags with commas to help readers find your content
        </p>
      </div>

      <div>
        <Label htmlFor="content" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2 block">
          Content
        </Label>
        <div className="mt-2 rounded-xl border border-slate-200 dark:border-slate-800 focus-within:border-sky-300 dark:focus-within:border-sky-500 bg-white dark:bg-slate-950 transition-all duration-200 shadow-sm overflow-hidden richtext-wrapper">
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your post content... Let your creativity flow!"
          />
        </div>
        {!content || content === '<p><br></p>' || content === '<p></p>' ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
            ⚠️ Content is required to publish your post
          </p>
        ) : (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            ✨ Your content looks great! Ready to publish.
          </p>
        )}
      </div>

      {errors.root && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 p-4">
          <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
            {errors.root.message}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isLoading}
          className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-semibold"
        >
          <span className="mr-2">❌</span>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !content || content === '<p><br></p>' || content === '<p></p>'}
          className="min-w-[150px] px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">Saving...</span>
            </>
          ) : (
            <span className="text-sm font-medium">Save post</span>
          )}
        </Button>
      </div>
    </form>
  );
}