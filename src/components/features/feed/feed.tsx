"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/home/feed/feed-post";
import { fetchPosts } from "@/api/post.api";
import FeedHeader from "./header";
import { Loader2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    image: string;
  };
}


export default function FeedClient({ initialPosts }: { initialPosts: Post[] }) {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialData: initialPosts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-10 w-10 animate-spin text-[#4461F2]" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error while loading posts</p>;
  }

  return (
    <div className="space-y-6">
      <FeedHeader />
      {posts?.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
