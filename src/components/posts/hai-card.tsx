import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Repeat2 } from "lucide-react"

interface HaiCardProps {
  hai: {
    id: string
    content: string
    likes: number
    rehais: number
    replies: number
    createdAt: string
    author: {
      name: string
      username: string
      avatar: string
    }
  }
}

export function HaiCard({ hai }: HaiCardProps) {
  return (
    <article className="p-4 hover:bg-gray-50">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={hai.author.avatar} alt={hai.author.name} />
          <AvatarFallback>{hai.author.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-1 text-sm">
            <span className="font-bold hover:underline">{hai.author.name}</span>
            <span className="text-gray-500">@{hai.author.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 hover:underline">{hai.createdAt}</span>
          </div>

          <p className="mt-1 whitespace-pre-wrap text-[15px]">{hai.content}</p>

          <div className="mt-3 flex gap-10 text-sm text-gray-500">
            <button className="group flex items-center gap-1 hover:text-twitter">
              <div className="rounded-full p-2 group-hover:bg-blue-50">
                <MessageCircle size={18} />
              </div>
              <span>{hai.replies}</span>
            </button>

            <button className="group flex items-center gap-1 hover:text-green-600">
              <div className="rounded-full p-2 group-hover:bg-green-50">
                <Repeat2 size={18} />
              </div>
              <span>{hai.rehais}</span>
            </button>

            <button className="group flex items-center gap-1 hover:text-red-600">
              <div className="rounded-full p-2 group-hover:bg-red-50">
                <Heart size={18} />
              </div>
              <span>{hai.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

