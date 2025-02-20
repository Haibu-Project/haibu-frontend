import Image from "next/image"
import { MoreHorizontal, MessageSquare, Heart, Repeat2, Share } from "lucide-react"

interface PostTag {
  label: string
  color: string
}

interface FeedPostProps {
  user: {
    name: string
    handle: string
    avatar: string
  }
  content: {
    body: string
    image?: string
  }
  engagement: {
    likes: string
    comments: string
    reposts: string
  }
  tags: PostTag[]
}

export default function FeedPost({ user, content, engagement, tags }: FeedPostProps) {
  return (
    <div className="bg-white dark:bg-primary-dark rounded-xl shadow-lg overflow-hidden border border-accent/20 dark:border-accent/10 transition-all duration-300 hover:shadow-xl">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Image
              src={user.avatar || "/placeholder.svg?height=48&width=48"}
              alt={user.name}
              width={48}
              height={48}
              className="rounded-full border-2 border-accent/20 dark:border-accent/10"
            />
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white text-lg">{user.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">@{user.handle}</p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <MoreHorizontal className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed">{content.body}</p>

          {content.image && (
            <div className="mt-3 rounded-xl overflow-hidden shadow-md">
              <Image
                src={content.image || "/placeholder.svg"}
                alt="Post image"
                width={600}
                height={350}
                className="w-full object-cover rounded-xl"
              />
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex space-x-6">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">{engagement.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm font-medium">{engagement.comments}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <Repeat2 className="h-5 w-5" />
              <span className="text-sm font-medium">{engagement.reposts}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <Share className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag.label} className={`px-3 py-1 text-xs font-medium rounded-full ${tag.color}`}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
