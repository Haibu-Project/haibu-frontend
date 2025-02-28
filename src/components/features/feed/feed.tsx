"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/home/feed/feed-post";
import { fetchPosts } from "@/api/post.api";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: { username: string };
}

export default function FeedClient({ initialPosts }: { initialPosts: Post[] }) {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialData: initialPosts,
  });

  if (isLoading) return <p>Cargando posts...</p>;
  if (error) return <p>Error al cargar posts</p>;

  return (
    <div className="space-y-6">
      {posts?.map((post:Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
