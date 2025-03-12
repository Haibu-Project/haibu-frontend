"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchUserByUsername } from "@/api/users.api"
import { fetchPostsByUserId } from "@/api/post.api"
import UserProfileView from "@/components/features/profile/user-profile-view"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserProfilePage() {
  const params = useParams()
  const username = params?.username as string | undefined

  const {
    data: userData,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchUserByUsername(username as string),
    enabled: !!username,
  })

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useQuery({
    queryKey: ["posts", userData?.id],
    queryFn: () => fetchPostsByUserId(userData?.id),
    enabled: !!userData?.id,
  })

  if (isLoadingUser) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Skeleton className="w-full h-48 rounded-xl" />
        <Skeleton className="w-full h-96 rounded-lg" />
      </div>
    )
  }

  if (isErrorUser) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">User not found</h2>
          <p className="text-gray-600 dark:text-gray-300">
            User not found
          </p>
        </div>
      </div>
    )
  }

  return <UserProfileView user={userData} posts={posts} isLoadingPosts={isLoadingPosts} isErrorPosts={isErrorPosts} />
}

