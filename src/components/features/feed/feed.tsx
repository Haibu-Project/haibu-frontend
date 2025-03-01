"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/home/feed/feed-post";
import { fetchPosts, getPostLikes } from "@/api/post.api";
import FeedHeader from "./header";

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

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error while loading posts</p>;

  return (
    <div className="space-y-6">
      <FeedHeader />
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
