"use client"

import type React from "react"
import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { ProgressBar } from "./ProcessBar"

type TaskCardProps = {
  id: string
  title: string
  description: string
  priority: "Low" | "Medium" | "High"
  date: string
  completed: boolean
  progress?: number
}

const CampaignCard: React.FC<TaskCardProps> = ({ title, description }) => {

  const [options, setOptions] = useState(false);


  return (
    <div className="bg-white rounded-lg p-4 shadow w-full max-w-xs">
      <div className="relative">
        <div className="flex justify-between mb-2">
          <div className="px-3 py-1 rounded-full bg-[#E6F5EA] text-[#2baa4d] text-xs">Will be open soon</div>
          <button onClick={() => setOptions(!options)} className="text-gray-400">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600 text-sm">Process:</span>
          </div>
          <ProgressBar value={5} className="h-1 bg-gray-100 [&>div]:bg-[#4F46E5]" />
        </div>

      </div>
    </div>
  )
}

export default CampaignCard
