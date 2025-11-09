// app/dashboard/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Search,
  Plus,
  Edit,
  Trash2, 
  Eye,
  Calendar,
  Clock,
  User,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { formatDate } from "@/lib/util";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, requireAuth, logout } = useAuth();
  const {
    posts,
    isLoading,
    error,
    fetchPosts,
    deletePost,
    totalPosts,
    currentPage,
    hasMore,
    filters,
    setFilters,
    clearError,
  } = usePosts();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || filters.search || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Get all unique tags from posts for filter dropdown
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  // Initialize filters from URL params on mount
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    setFilters({ search, tags });
    setSearchTerm(search);
    setSelectedTags(tags);
    
    // Fetch initial posts
    const page = parseInt(searchParams.get('page') || '1');
    fetchPosts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce search and update filters
  useEffect(() => {
    // Skip on initial mount to avoid double fetch
    if (searchTerm === (searchParams.get('search') || '') && 
        JSON.stringify(selectedTags) === JSON.stringify(filters.tags)) {
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm) {
        params.set('search', searchTerm);
      }
      if (selectedTags.length > 0) {
        params.set('tags', selectedTags.join(','));
      }
      params.set('page', '1');
      
      setFilters({ search: searchTerm, tags: selectedTags });
      router.push(`/dashboard?${params.toString()}`);
      fetchPosts(1);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedTags]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setDeletingId(id);
    try {
      await deletePost(id);
      // Refresh the current page after deletion
      fetchPosts(currentPage);
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleRefresh = () => {
    fetchPosts(currentPage);
  };

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !isLoading) {
        fetchPosts(currentPage + 1);
      }
    }, { rootMargin: '200px' });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, currentPage, fetchPosts]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-900 px-8 py-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400"></div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.4),_transparent_60%)_0px_0px,_radial-gradient(circle_at_bottom,_rgba(167,243,208,0.35),_transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.35),_transparent_55%)_0px_0px,_radial-gradient(circle_at_bottom,_rgba(4,120,87,0.35),_transparent_60%)] bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-lg text-sm">
                <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-blue-700 dark:text-blue-300 font-medium">Welcome,</span>
                <span className="font-semibold text-blue-900 dark:text-blue-100">{user.name}</span>
              </div>
              
              <ThemeToggle />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="hidden sm:flex items-center gap-2 rounded-lg border border-sky-200/60 dark:border-sky-800/40 bg-white/80 dark:bg-slate-900/60 px-3 py-2 text-xs font-medium text-sky-600 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-900/70 disabled:opacity-60"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
              
              <Link href="/posts/create">
                <Button className="flex items-center gap-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:shadow-md transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>New post</span>
                </Button>
              </Link>
              <Button variant="ghost" onClick={logout} className="text-xs font-medium text-slate-500 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <Card className="rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/70 shadow-soft hover:shadow-soft-dark transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total posts</CardTitle>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300">
                  <Eye className="h-4.5 w-4.5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900 dark:text-slate-50">{totalPosts}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Published articles this year</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/70 shadow-soft hover:shadow-soft-dark transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">This month</CardTitle>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <Calendar className="h-4.5 w-4.5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900 dark:text-slate-50">
                {
                  posts.filter((post) => {
                    const postDate = new Date(post.createdAt);
                    const now = new Date();
                    return (
                      postDate.getMonth() === now.getMonth() &&
                      postDate.getFullYear() === now.getFullYear()
                    );
                  }).length
                }
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Fresh stories shared this month</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/70 shadow-soft hover:shadow-soft-dark transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Avg. read time</CardTitle>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
                  <Clock className="h-4.5 w-4.5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900 dark:text-slate-50">
                {posts.length > 0
                  ? Math.round(
                      posts.reduce((acc, post) => acc + post.readTime, 0) /
                        posts.length
                    )
                  : 0}
                <span className="ml-1 text-base font-medium text-slate-500">min</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Average reading time per article</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-10">
          <div className="bg-white/90 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/60 rounded-xl shadow-soft p-5 space-y-4">
            <div className="relative max-w-2xl">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                <Search className="h-5 w-5" />
              </div>
              <Input
                placeholder="Search posts by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 h-11 text-sm border border-slate-300 dark:border-slate-700 focus:border-sky-300 dark:focus:border-sky-500 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>

            {/* Tag Filters */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Filter</span>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTags(prev =>
                        prev.includes(tag)
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      );
                    }}
                    className={selectedTags.includes(tag)
                      ? "px-3 py-1 text-xs font-medium rounded-full border border-sky-200 dark:border-sky-700 bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                      : "px-3 py-1 text-xs font-medium rounded-full border border-slate-200 dark:border-slate-800 bg-white text-slate-600 dark:bg-slate-950 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600"}
                  >
                    {tag}
                  </button>
                ))}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 px-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Error State */}
        {error && (
          <div className="flex items-center justify-between rounded-lg border border-red-200/80 dark:border-red-900/60 bg-red-50/80 dark:bg-red-950/40 px-4 py-3 text-sm">
            <p className="font-medium text-red-700 dark:text-red-300">{error}</p>
            <Button variant="ghost" size="sm" onClick={clearError} className="text-red-600 dark:text-red-300 hover:bg-red-100/70 dark:hover:bg-red-950/60">
              Dismiss
            </Button>
          </div>
        )}

        {/* Loading State for initial load */}
        {isLoading && posts.length === 0 && (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center space-y-2 text-slate-500 dark:text-slate-500">
              <RefreshCw className="h-6 w-6 animate-spin" />
              <span className="text-sm font-medium">Loading posts...</span>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading || posts.length > 0 ? (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id} className="rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/70 shadow-soft hover:shadow-soft-dark transition-shadow overflow-hidden">                <CardHeader className="px-5 pt-5 pb-2">
                    <div className="flex justify-between items-start mb-3">
                      <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {post.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="px-5 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 px-5 pb-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-3 py-1 bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 border border-sky-100 dark:border-sky-700 font-medium">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <span>{formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                        <span>❤️</span>
                        <span className="font-medium">{post.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center gap-2 border-t border-slate-200 dark:border-slate-800 px-5 py-4">
                    <Link href={`/posts/create/${post.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full justify-center border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 hover:border-sky-200 dark:hover:border-sky-500"
                        size="sm"
                      >
                        <Edit className="mr-1.5 h-3.5 w-3.5" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                      className="h-8 px-3 text-xs font-medium text-red-500 dark:text-red-300 hover:bg-red-100/70 dark:hover:bg-red-950/60"
                    >
                      {deletingId === post.id ? (
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div ref={sentinelRef} className="h-12" />
            {isLoading && posts.length > 0 && (
              <div className="flex justify-center py-6">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">Loading more posts...</span>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Empty State */}
        {!isLoading && posts.length === 0 && (
          <div className="rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/70 shadow-soft py-16 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300">
              <span className="text-2xl">📝</span>
            </div>
            <div className="space-y-2 px-6">
              {searchTerm ? (
                <>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">No posts found</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">We couldn't find anything matching "{searchTerm}". Try refining your filters.</p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Your canvas is clear</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Start your first story and invite readers into your world.</p>
                </>
              )}
            </div>
            <div className="mt-8">
              <Link href="/posts/create">
                <Button className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-colors">
                  <Plus className="mr-2 h-4 w-4" />
                  Start writing
                </Button>
              </Link>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}