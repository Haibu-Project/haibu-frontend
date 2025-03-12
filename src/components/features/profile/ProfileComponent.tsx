"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchPostsByUserId } from "@/api/post.api"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Calendar, Heart, Share2, UserPlus } from "lucide-react"
import ProfileHeader from "./header"
import { useUserStore } from "@/store/user-store"
import type { Post } from "@/types/post"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getFollowers, getFollowing } from "@/api/follow.api"

export default function ProfileComponent() {
  const { id, username, name, surnames, image, description } = useUserStore()

  const [modalType, setModalType] = useState<"followers" | "following" | null>(null)

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostsByUserId(id),
    enabled: !!id,
  })

  const { data: followersData, isLoading: isLoadingFollowers } = useQuery({
    queryKey: ["followers", id],
    queryFn: () => getFollowers(id),
  })

  const { data: followingData, isLoading: isLoadingFollowing } = useQuery({
    queryKey: ["following", id],
    queryFn: () => getFollowing(id),
  })

  const followersCount = followersData?.length ?? 0
  const followingCount = followingData?.length ?? 0

  interface UserData {
    id: string;
    username: string;
  }

  interface FollowerData {
    id: string;
    createdAt: string;
    follower: UserData; 
  }

  interface FollowingData {
    id: string;
    createdAt: string;
    following: UserData; 
  }


  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <ProfileHeader image={image} description={description} name={`${name} ${surnames}`} username={username} />

      <Card className="shadow-sm border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex flex-col">
              <span className="font-medium text-lg">{posts?.length || 0}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Posts</span>
            </div>
            <div className="w-px h-10 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col cursor-pointer" onClick={() => setModalType("followers")}>
              <span className="font-medium text-lg">{isLoadingFollowers ? "..." : followersCount}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Followers</span>
            </div>
            <div className="w-px h-10 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col cursor-pointer" onClick={() => setModalType("following")}>
              <span className="font-medium text-lg">{isLoadingFollowing ? "..." : followingCount}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Following</span>
            </div>
          </div>


          <Dialog open={modalType !== null} onOpenChange={() => setModalType(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{modalType === "followers" ? "Followers" : "Following"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                {(modalType === "followers"
                  ? (followersData as FollowerData[])
                  : (followingData as FollowingData[])
                )?.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 border-b">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <UserPlus className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-900 dark:text-gray-100">
                      {modalType === "followers" ? (item as FollowerData).follower?.username : (item as FollowingData).following?.username}
                    </span>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="posts" className="data-[state=active]:bg-[#4461f2] data-[state=active]:text-white">
                Posts
              </TabsTrigger>
              <TabsTrigger value="replies" className="data-[state=active]:bg-[#4461f2] data-[state=active]:text-white">
                Replies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {isLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-5/6 mb-3" />
                      <div className="flex gap-3">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </Card>
                  ))
              ) : isError ? (
                <div className="text-center p-8">
                  <div className="text-red-500 mb-2">Failed to load posts</div>
                  <p className="text-gray-500 dark:text-gray-400">
                    There was an error fetching your posts. Please try again later.
                  </p>
                </div>
              ) : posts?.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post: Post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-5">
                        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{post.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-[#4461f2] transition-colors">
                              <Heart className="h-4 w-4" />
                              <span>0</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-[#4461f2] transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments?.length ?? 0}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-[#4461f2] transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {post.createdAt
                                ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
                                : "Recently"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-gray-400 dark:text-gray-500 mb-2">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No posts yet</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Start creating content to see your posts here.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="replies" className="p-6 text-center text-gray-500 dark:text-gray-400">
              <div className="py-10">
                <div className="mb-3">
                  <MessageCircle className="h-10 w-10 mx-auto text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No replies yet</h3>
                <p className="mt-1">When you reply to posts, they will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}