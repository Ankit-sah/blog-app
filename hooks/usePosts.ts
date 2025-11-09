// hooks/use-posts.ts

import { usePostsStore } from "@/stores/postsStore";


export const usePosts = () => {
  const { 
    posts, 
    featuredPosts, 
    currentPost, 
    isLoading, 
    error, 
    hasMore,
    totalPosts,
    currentPage,
    filters, 
    actions 
  } = usePostsStore();

  return {
    posts,
    featuredPosts,
    currentPost,
    isLoading,
    error,
    hasMore,
    totalPosts,
    currentPage,
    filters,
    ...actions
  };
};