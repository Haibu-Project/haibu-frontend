"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPostsByUserId } from "@/api/post.api";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {MessageCircle } from "lucide-react";
import ProfileHeader from "./header";
import { useUserStore } from "@/store/user-store";
import { Post } from "@/types/post";

export default function ProfileComponent() {

  const { id, username, name, surnames } = useUserStore();

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostsByUserId(id),
    enabled: !!id,
  });

  return (
    <div className="max-w-4xl gap-8 flex flex-col items-center mx-auto p-4">
      <ProfileHeader />

      <Card className="relative mx-4 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 -mt-20 md:-mt-24"></div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold"></h1>
                <p className="text-gray-500 dark:text-gray-400">@{username}</p>
                <p className="text-gray-500 dark:text-gray-400">{name} {surnames}</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="posts" className="mt-6">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="posts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-tertiary data-[state=active]:bg-transparent">
              Posts
            </TabsTrigger>
            <TabsTrigger value="replies" className="rounded-none border-b-2 border-transparent data-[state=active]:border-tertiary data-[state=active]:bg-transparent">
              Replies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            {isLoading ? (
              <p className="text-gray-500 dark:text-gray-400">Loading posts...</p>
            ) : isError ? (
              <p className="text-red-500">Error fetching posts.</p>
            ) : posts?.length > 0 ? (
              <div className="flex flex-col gap-4">
                {posts.map((post:Post) => (
                  <Card key={post.id} className="p-4">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{post.content}</p>
                    <div className="flex items-center gap-2 mt-3 text-gray-500 dark:text-gray-400">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments?.length ?? 0} Comments</span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
            )}
          </TabsContent>

        </Tabs>
      </Card>
    </div>
  );
}
