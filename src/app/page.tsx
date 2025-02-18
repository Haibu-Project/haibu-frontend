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
    <div className="flex min-h-screen bg-accent/5 dark:bg-primary-dark">
      <aside className="sticky top-0 hidden h-screen w-64 lg:block">
        <MainNav />
      </aside>
      <main className="flex justify-center items-center w-fit border-x border-accent/20 dark:border-accent/10">
        <div className="p-8">
          <PostComposer />
          <div className="space-y-4 p-4">
            <FeedPost {...post} />
            <FeedPost {...post} />
          </div>
        </div>
      </main>
      <aside className="sticky top-0 hidden h-screen lg:block overflow-y-auto">
        <RightSidebar />
      </aside>
    </div>
  )
}

