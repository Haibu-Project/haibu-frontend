"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPostsByUserId } from "@/api/post.api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Globe, MapPin, MessageCircle, Users } from "lucide-react";
import ProfileHeader from "./header";
import { useUserStore } from "@/store/user-store";
import { Post } from "@/types/post";

export default function ProfileComponent() {

  const { id, username, name, surnames } = useUserStore();
  const [isFollowing, setIsFollowing] = useState(false);

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
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? "outline" : "default"}
                className={
                  isFollowing ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800" : "bg-tertiary text-primary-dark"
                }
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Building the future of AI and social connections. Passionate about technology and innovation.
            </p>

            <div className="flex flex-wrap gap-6 mt-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a href="#" className="text-tertiary hover:underline">website.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined February 2024</span>
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span><strong>2.5K</strong> Following</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span><strong>10.2K</strong> Followers</span>
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
