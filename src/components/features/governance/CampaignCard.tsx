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

const CampaignCard: React.FC<TaskCardProps> = ({ title, description, priority, progress = 65 }) => {
  const [vote, setVote] = useState<string | null>(null);
  const [options, setOptions] = useState(false);

  const normalizedProgress = Math.min(100, Math.max(1, progress));

  return (
    <div className="bg-white rounded-lg p-4 shadow w-full max-w-xs">
      <div className="relative">
        <div className="flex justify-between mb-2">
          <div className="px-3 py-1 rounded-full bg-[#E6F5EA] text-[#56D06D] text-xs">Active</div>
          <button onClick={() => setOptions(!options)} className="text-gray-400">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600 text-sm">Time Remaining</span>
            <span className="font-medium text-sm">2d 14h</span>
          </div>
          <ProgressBar value={normalizedProgress} className="h-1 bg-gray-100 [&>div]:bg-[#4F46E5]" />
        </div>

        <div className="flex justify-between text-[16px]">
          <span className="text-[#56D06D]">{normalizedProgress}% Yes</span>
          <span className="text-[#EF4545]">{100 - normalizedProgress}% No</span>
        </div>

        <div className="mt-4 flex gap-2">
          <button 
            className={`px-3 py-1 rounded-md text-white text-sm ${vote === 'approve' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'}`} 
            onClick={() => setVote('approve')}
          >
            Approve
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-white text-sm ${vote === 'reject' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'}`} 
            onClick={() => setVote('reject')}
          >
            Reject
          </button>
        </div>

        {vote && <p className="mt-2 text-sm text-gray-700">You voted: <b>{vote === 'approve' ? 'Approve' : 'Reject'}</b></p>}
      </div>
    </div>
  )
}

export default CampaignCard
