// stores/posts-store.ts
import { create } from 'zustand';
import { PostsState, Post, User } from '@/types';
import { useAuthStore } from './authStore';

// In-memory store for mock posts (simulates backend)
let mockPostsCache: Post[] = [];

const initializeMockPosts = (): Post[] => {
  if (mockPostsCache.length === 0) {
    mockPostsCache = Array.from({ length: 50 }, (_, i) => ({
      id: (i + 1).toString(),
      title: `Blog Post ${i + 1}`,
      content: `<p>This is the content of blog post ${i + 1}. It contains interesting information about various topics.</p><p>You can edit this post to see the rich text editor in action!</p>`,
      excerpt: `This is a brief excerpt from blog post ${i + 1}...`,
      author: {
        id: '1',
        name: 'Demo User',
        email: 'demo@blog.com',
        role: 'admin'
      },
      tags: i % 2 === 0 ? ['react', 'nextjs'] : ['javascript', 'webdev'],
      published: true,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
      readTime: Math.ceil(Math.random() * 10),
      likes: Math.floor(Math.random() * 100),
      featuredImage: i % 3 === 0 ? `/images/post-${(i % 3) + 1}.jpg` : undefined
    }));
  }
  return mockPostsCache;
};

const postsApi = {
  fetchPosts: async (page = 1, limit = 10, filters?: { search?: string; tags?: string[] }): Promise<{ posts: Post[]; total: number }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let mockPosts = initializeMockPosts();

    let filteredPosts = mockPosts;
    if (filters?.search) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    if (filters?.tags && filters.tags.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(tag => filters.tags!.includes(tag))
      );
    }

    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      total: filteredPosts.length
    };
  },

  fetchPost: async (id: string): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockPosts = initializeMockPosts();
    const post = mockPosts.find(p => p.id === id);
    
    if (post) {
      return post;
    }
    
    // Fallback if post not found
    return {
      id,
      title: `Blog Post ${id}`,
      content: `<p>This is the detailed content of blog post ${id}.</p><p>It has multiple paragraphs and rich content.</p>`,
      excerpt: `Excerpt for post ${id}...`,
      author: {
        id: '1',
        name: 'Demo User',
        email: 'demo@blog.com',
        role: 'admin'
      },
      tags: ['react', 'nextjs'],
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: 5,
      likes: 42,
      featuredImage: '/images/post-1.jpg'
    };
  },

  createPost: async (postData: Omit<Post, 'id' | 'author' | 'createdAt' | 'updatedAt'>, user?: User): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const author = user || {
      id: '1',
      name: 'Demo User',
      email: 'demo@blog.com',
      role: 'admin' as const
    };
    
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      author,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to mock cache
    mockPostsCache = [newPost, ...mockPostsCache];
    
    return newPost;
  },

  updatePost: async (id: string, postData: Partial<Post>): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockPosts = initializeMockPosts();
    const existingPost = mockPosts.find(p => p.id === id);
    
    if (!existingPost) {
      throw new Error('Post not found');
    }
    
    const updatedPost: Post = {
      ...existingPost,
      ...postData,
      updatedAt: new Date().toISOString()
    };
    
    // Update in mock cache
    const index = mockPostsCache.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPostsCache[index] = updatedPost;
    }
    
    return updatedPost;
  },

  deletePost: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove from mock cache
    mockPostsCache = mockPostsCache.filter(p => p.id !== id);
  },

  likePost: async (id: string): Promise<{ likes: number }> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { likes: Math.floor(Math.random() * 100) + 1 };
  }
};

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  featuredPosts: [],
  currentPost: null,
  isLoading: false,
  error: null,
  hasMore: true,
  totalPosts: 0,
  currentPage: 1,
  filters: {
    search: '',
    tags: [],
    sort: 'latest'
  },

  actions: {
    fetchPosts: async (page = 1) => {
      const { filters, posts } = get();
      set({ isLoading: true, error: null });

      try {
        const { posts: newPosts, total } = await postsApi.fetchPosts(page, 10, filters);
        
        set({
          posts: page === 1 ? newPosts : [...posts, ...newPosts],
          hasMore: (page * 10) < total,
          totalPosts: total,
          currentPage: page,
          isLoading: false
        });
      } catch (error) {
        set({ error: 'Failed to fetch posts', isLoading: false });
      }
    },

    fetchPost: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        // Check if post exists in current posts list
        const state = get();
        const existingPost = state.posts.find(p => p.id === id);
        
        if (existingPost) {
          set({ currentPost: existingPost, isLoading: false });
        } else {
          // Fetch from API if not in cache
          const post = await postsApi.fetchPost(id);
          set({ currentPost: post, isLoading: false });
        }
      } catch (error) {
        set({ error: 'Failed to fetch post', isLoading: false });
      }
    },

    createPost: async (postData) => {
      set({ isLoading: true, error: null });
      try {
        // Get current user from auth store
        const user = useAuthStore.getState().user;
        const newPost = await postsApi.createPost(postData, user || undefined);
        set(state => ({ 
          posts: [newPost, ...state.posts],
          totalPosts: state.totalPosts + 1,
          isLoading: false 
        }));
      } catch (error) {
        set({ error: 'Failed to create post', isLoading: false });
        throw error;
      }
    },

    updatePost: async (id: string, postData: Partial<Post>) => {
      set({ isLoading: true, error: null });
      try {
        const updatedPost = await postsApi.updatePost(id, postData);
        set(state => ({
          posts: state.posts.map(post => post.id === id ? updatedPost : post),
          currentPost: state.currentPost?.id === id ? updatedPost : state.currentPost,
          isLoading: false
        }));
      } catch (error) {
        set({ error: 'Failed to update post', isLoading: false });
        throw error;
      }
    },

    deletePost: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        await postsApi.deletePost(id);
        set(state => ({
          posts: state.posts.filter(post => post.id !== id),
          totalPosts: Math.max(0, state.totalPosts - 1),
          isLoading: false
        }));
      } catch (error) {
        set({ error: 'Failed to delete post', isLoading: false });
        throw error;
      }
    },

    likePost: async (id: string) => {
      try {
        const { likes } = await postsApi.likePost(id);
        set(state => ({
          posts: state.posts.map(post => 
            post.id === id ? { ...post, likes } : post
          ),
          currentPost: state.currentPost?.id === id 
            ? { ...state.currentPost, likes }
            : state.currentPost
        }));
      } catch (error) {
        console.error('Failed to like post:', error);
      }
    },

    setFilters: (newFilters) => {
      set(state => ({
        filters: { ...state.filters, ...newFilters },
        posts: [],
        hasMore: true,
        currentPage: 1
      }));
    },

    clearError: () => {
      set({ error: null });
    }
  }
}));