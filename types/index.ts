// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  readTime: number;
  likes: number;
  featuredImage?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

export interface PostsState {
  posts: Post[];
  featuredPosts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  totalPosts: number;
  currentPage: number;
  filters: {
    search: string;
    tags: string[];
    sort: 'latest' | 'popular';
  };
  actions: {
    fetchPosts: (page?: number) => Promise<void>;
    fetchPost: (id: string) => Promise<void>;
    createPost: (postData: Omit<Post, 'id' | 'author' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updatePost: (id: string, postData: Partial<Post>) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    likePost: (id: string) => Promise<void>;
    setFilters: (filters: Partial<PostsState['filters']>) => void;
    clearError: () => void;
  };
}

export interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}