"use client"

import { useState } from "react"
import { ImageIcon, MapPinIcon, SmileIcon, Zap, Calendar, BarChart2 } from "lucide-react"
import Image from "next/image"

export function PostComposer() {
  const [content, setContent] = useState("")

  return (
    <div className="bg-white dark:bg-primary-dark rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <div className="flex gap-5">
        <div className="flex-shrink-0">
          <Image
            src="/placeholder.svg?height=48&width=48"
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full border-2 border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="flex-grow">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[150px] bg-transparent border-2 border-gray-200 dark:border-gray-700 text-lg p-4 rounded-lg resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white transition-all"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex -ml-2 space-x-3">
              {[ImageIcon, Zap, BarChart2, SmileIcon, Calendar, MapPinIcon].map((Icon, index) => (
                <button
                  key={index}
                  className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-secondary rounded-full transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
            <button
              className="px-6 py-2 bg-tertiary text-primary-dark rounded-full font-medium hover:bg-tertiary-light focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              disabled={!content.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
