"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, deletePost } from "@/api/postApi";

export default function PostsPage() {
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }
  const _deletePost = (id: string) => {
    deletePost(id).then(() => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    });
    // Placeholder function for delete action
    console.log("Delete post with id:", id);
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li className="pb-4" key={post.id}>
            {post.title}{" "}
            <button onClick={() => _deletePost(post.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
