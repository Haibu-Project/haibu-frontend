"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "@/api/post.api"
import { Image, X, Smile, Calendar, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/user-store"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CreatePostModal({ isOpen, onClose }: Props) {
  const { user } = useUserStore()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const queryClient = useQueryClient()
  const MAX_TITLE_CHARS = 100
  const MAX_CONTENT_CHARS = 500
  const userId = "currentUserId"

  const { mutate, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
      setTitle("")
      setContent("")
      onClose()
    },
    onError: (e: unknown) => {
      setError(e instanceof Error ? e.message : "Error")
    },
  })

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-0 shadow-lg animate-modal-enter">
          <div className="flex items-center p-4">
            <Dialog.Close asChild>
              <button className="rounded-full p-1 text-gray-600 hover:bg-gray-100">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <div className="px-4 pb-2">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <input
                  className="w-full border-b border-gray-300 p-2 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-0"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título del post"
                  maxLength={MAX_TITLE_CHARS}
                />
                <textarea
                  className="w-full resize-none border-0 bg-transparent p-2 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-0"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="¿Qué está pasando?"
                  maxLength={MAX_CONTENT_CHARS}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between p-4">
            <div className="flex gap-2 text-twitter">
              <button className="rounded-full p-2 hover:bg-blue-50">
                <Image size={18} className="text-twitter" />
              </button>
              <button className="rounded-full p-2 hover:bg-blue-50">
                <Smile size={18} className="text-twitter" />
              </button>
              <button className="rounded-full p-2 hover:bg-blue-50">
                <Calendar size={18} className="text-twitter" />
              </button>
              <button className="rounded-full p-2 hover:bg-blue-50">
                <MapPin size={18} className="text-twitter" />
              </button>
            </div>

            <Button
              className="rounded-full bg-twitter px-4 py-1 font-bold bg-black text-white hover:bg-twitter/90 disabled:opacity-50"
              onClick={() => mutate({ title, content, userId })}
              disabled={isLoading || !title.trim() || !content.trim()}
            >
              {isLoading ? "Enviando..." : "Publicar"}
            </Button>
          </div>

          {error && (
            <div className="px-4 pb-3">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}