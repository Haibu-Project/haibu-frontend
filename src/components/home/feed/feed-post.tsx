import { MoreHorizontal, MessageSquare, Heart, Repeat2, Share, Send } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  user: {
    username: string
  }
}

const PostCard = ({ post }: { post: Post }) => {
  const [comments, setComments] = useState<{ id: string; author: string; text: string }[]>([])
  const [newComment, setNewComment] = useState("")

  const addComment = () => {
    if (!newComment.trim()) return
    setComments([...comments, { id: `${Date.now()}`, author: "You", text: newComment }])
    setNewComment("")
  }

  return (
    <div className="bg-white dark:bg-primary-dark rounded-xl shadow-lg overflow-hidden border border-accent/20 dark:border-accent/10 transition-all duration-300 hover:shadow-xl">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white text-lg">{post.user.username}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <MoreHorizontal className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed">{post.content}</p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex space-x-6">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <div>
                  <h2 className="font-semibold text-lg mb-2">{post.user.username}</h2>
                  <p>{post.content}</p>
                </div>
                <ScrollArea className="h-60 border-b p-2">
                  {comments.map((comment) => (
                    <div key={comment.id} className="mb-2 border-b pb-2">
                      <p className="font-bold text-sm">{comment.author}</p>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex items-center mt-2">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1"
                  />
                  <Button onClick={addComment} className="ml-2">
                    <Send size={16} />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <Repeat2 className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <Share className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard