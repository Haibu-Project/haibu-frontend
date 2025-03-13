"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  UserPlus,
  Check,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useUserStore } from "@/store/user-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";

import {
  checkIfFollowing,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "@/api/follow.api";

interface UserProfileViewProps {
  user: User;
  posts: Post[];
  isLoadingPosts: boolean;
  isErrorPosts: boolean;
}

export default function UserProfileView({
  user,
  posts,
  isLoadingPosts,
  isErrorPosts,
}: UserProfileViewProps) {

  const queryClient = useQueryClient();
  const currentUser = useUserStore();
  const isOwnProfile = currentUser.id === user.id;

  const { data: followersData, isLoading: isLoadingFollowers } = useQuery({
    queryKey: ["followers", user.id],
    queryFn: () => getFollowers(user.id),
  });

  const { data: followingData, isLoading: isLoadingFollowing } = useQuery({
    queryKey: ["following", user.id],
    queryFn: () => getFollowing(user.id),
  });

  const followersCount = followersData?.length ?? 0;
  const followingCount = followingData?.length ?? 0;

  const {
    data: followStatusData,
    isLoading: isLoadingFollowStatus,
  } = useQuery({
    queryKey: ["isFollowing", currentUser.id, user.id],
    queryFn: () => checkIfFollowing(currentUser.id, user.id),
    enabled: !!currentUser.id && !!user.id && currentUser.id !== user.id,
  });

  const isFollowing = followStatusData?.isFollowing ?? false;

  const { mutate: followMutate, isPending: isFollowLoading } = useMutation({
    mutationFn: () => followUser({ followerId: currentUser.id, followingId: user.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isFollowing", currentUser.id, user.id] });
      queryClient.invalidateQueries({ queryKey: ["followers", user.id] });
    },
  });

  const { mutate: unfollowMutate, isPending: isUnfollowLoading } = useMutation({
    mutationFn: () => unfollowUser({ followerId: currentUser.id, followingId: user.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isFollowing", currentUser.id, user.id] });
      queryClient.invalidateQueries({ queryKey: ["followers", user.id] });
    },
  });

  function handleToggleFollow() {
    if (isFollowing) {
      unfollowMutate();
    } else {
      followMutate();
    }
  }

  const [modalType, setModalType] = useState<"followers" | "following" | null>(null);


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

      <header className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#4461f2] to-[#6e85ff] shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
          </svg>
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
        </div>

        <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-6">
          <div className="md:order-2 flex-shrink-0 relative">
            <div className="h-28 w-28 md:h-36 md:w-36 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
              {user.image ? (
                <Image
                  src={user.image || "/icons/profile2.svg"}
                  width={160}
                  height={160}
                  alt={""}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="md:order-1 flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{`${user.name} ${user.surnames || ""}`}</h1>
            <p className="text-white/80 text-lg mb-2">@{user.username}</p>
            <p className="text-white/90 text-base md:text-lg font-medium max-w-xl">
              {user.description || "No description."}
            </p>
          </div>
        </div>
      </header>

      <Card className="shadow-sm border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
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
                </div>
              </div>
            </div>

            {!isOwnProfile && (
              <div className="flex gap-2">
                <Button
                  onClick={handleToggleFollow}
                  variant={isFollowing ? "outline" : "default"}
                  disabled={isLoadingFollowStatus || isFollowLoading || isUnfollowLoading}
                  className={isFollowing ? "border-[#4461f2] text-[#4461f2]" : "bg-[#4461f2]"}
                >
                  {isLoadingFollowStatus ? "Loading..." : isFollowing ? <><Check className="h-4 w-4 mr-2" /> Following</> : <><UserPlus className="h-4 w-4 mr-2" /> Follow</>}
                </Button>
              </div>
            )}
          </div>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger
                value="posts"
                className="data-[state=active]:bg-[#4461f2] data-[state=active]:text-white"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="data-[state=active]:bg-[#4461f2] data-[state=active]:text-white"
              >
                Media
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {isLoadingPosts ? (
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
              ) : isErrorPosts ? (
                <div className="text-center p-8">
                  <div className="text-red-500 mb-2">Error with posts</div>
                  <p className="text-gray-500 dark:text-gray-400">Try later.</p>
                </div>
              ) : posts?.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post: Post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-5">
                        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {post.content}
                        </p>

                        <div className="flex items-center justify-between text-sm">

                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {post.createdAt
                                ? formatDistanceToNow(
                                  new Date(post.createdAt),
                                  { addSuffix: true }
                                )
                                : "Recientemente"}
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
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    No posts
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    This user hasn&apos;t published
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="media"
              className="p-6 text-center text-gray-500 dark:text-gray-400"
            >
              <div className="py-10">
                <div className="mb-3">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  There&apos;s no media.
                </h3>
                <p className="mt-1">
                  This user hasn&apos;t published any media.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
