"use client";

import { useAuthCheck } from "@/hooks/useAuthChek";
import { MainNav } from "@/components/ui/sidebar/sidebar";
import { PostComposer } from "@/components/home/feed/post-composer";
import Feed from "@/components/features/feed/feed";
import { RightSidebar } from "@/components/home/feed/right-sidebar";
import { useRouter } from "next/navigation";
import { useAddress } from "@chopinframework/react";

export default function Page() {
  const { address, isLoading } = useAddress();
  const { isRegistered } = useAuthCheck();
  const router = useRouter();

  if (!address && !isLoading) {
    router.push("/auth/register");
  }

  if (isLoading || isRegistered === null) {
    return <div>Loading...</div>;
  }

  const post = {
    user: {
      name: "John Doe",
      handle: "johndoe",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    content: {
      body: "Just had an amazing breakthrough in our AI research! 🚀 Can't wait to share more details soon. #AIInnovation #TechAdvancement",
    },
    engagement: {
      likes: "1.2K",
      comments: "234",
      reposts: "56",
    },
    tags: [
      { label: "AI", color: "bg-tertiary/20 text-tertiary-dark" },
      { label: "Research", color: "bg-secondary/20 text-secondary-dark" },
    ],
  };

  return (
    <div className="animate__animated animate__fadeInRight">
      <div className="flex min-h-screen w-full dark:bg-primary-dark">
        <main className="flex-1 border-x dark:border-accent/10 px-4 sm:px-8">
          <div className="max-w-2xl mx-auto py-8">
            <PostComposer />
            <Feed/>
          </div>
        </main>
        <aside className="hidden lg:block lg:w-80 xl:w-96 h-screen sticky top-0 overflow-y-auto p-8 pr-[5rem]">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}
