import { MainNav } from "@/components/sidebar/sidebar"
import { PostComposer } from "@/components/feed/post-composer"
import FeedPost from "@/components/feed/feed-post"
import { RightSidebar } from "@/components/sidebar/right-bar"

export default function Page() {
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
  }

  return (
    <div className="flex min-h-screen w-full bg-accent/5 dark:bg-primary-dark">
      <aside className="hidden lg:block lg:w-72 xl:w-80 h-screen sticky top-0">
        <MainNav />
      </aside>

      <main className="flex-1 border-x border-accent/20 dark:border-accent/10 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto py-8">
          <PostComposer />
          <div className="space-y-4 p-4">
            <FeedPost {...post} />
            <FeedPost {...post} />
            <FeedPost {...post} />
            <FeedPost {...post} />
            <FeedPost {...post} />
          </div>
        </div>
      </main>

      <aside className="hidden lg:block lg:w-80 xl:w-96 h-screen sticky top-0 overflow-y-auto p-8 pr-[5rem]">
        <RightSidebar />
      </aside>
    </div>
  )
}
