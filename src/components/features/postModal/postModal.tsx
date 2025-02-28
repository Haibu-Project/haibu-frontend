"use client"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "@/api/post.api"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"] as any)
      setContent("")
      onClose()
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Error"
      setError(message)
    },
  })
  if (!isOpen) return null
  const handleCreatePost = () => {
    setError("")
    mutate({ content })
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-full max-w-md mx-auto rounded shadow p-6 relative">
        <button className="absolute top-2 right-2 font-bold" onClick={onClose}>X</button>
        <h2 className="text-xl font-semibold mb-4">Crear nuevo Post</h2>
        <textarea
          className="w-full p-2 border mb-4"
          rows={4}
          placeholder="¿Qué estás pensando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          onClick={handleCreatePost}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={isLoading || !content.trim()}
        >
          {isLoading ? "Enviando..." : "Publicar"}
        </button>
      </div>
    </div>
  )
}