"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "@/api/post.api"
import { X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/user-store"
import Image from "next/image"
import { UserIcon } from "lucide-react"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CreatePostModal({ isOpen, onClose }: Props) {
  const { id: userId, image } = useUserStore()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const queryClient = useQueryClient()
  const MAX_TITLE_CHARS = 100
  const MAX_CONTENT_CHARS = 500

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
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

              {image ? (
                <Image
                  src={image}
                  width={40}
                  height={40}
                  alt={"User Image"}
                  className="object-cover w- h-full rounded-full"
                />
              ) : (
                <div className="w-[35px] h-[35px] bg-gray-200 flex rounded-full p-1 items-center justify-center text-gray-400">
                  <UserIcon color="#4460F0" />
                </div>
              )}


              <div className="flex-1">
                <input
                  className="w-full border-b border-gray-300 p-2 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-0"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  maxLength={MAX_TITLE_CHARS}
                />
                <textarea
                  className="w-full resize-none border-0 bg-transparent p-2 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-0"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What are you thinking?"
                  maxLength={MAX_CONTENT_CHARS}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between p-4">

            <Button
              className="rounded-full px-4 py-1 font-bold bg-[#222064] text-white"
              onClick={() => mutate({ title, content, userId })}
              disabled={isPending || !title.trim() || !content.trim()}
            >
              {isPending ? "Posting..." : "Post a Hai"}
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