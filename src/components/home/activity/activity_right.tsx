"use client"

import { ChevronRight, Search, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

interface SocialCardProps {
  title: string
  description: string
  link: string
  borderColor: string
  textColor: string
}

const SocialCard = ({ title, description, link, borderColor, textColor }: SocialCardProps) => {
  const router = useRouter()

  return (
    <div
      className={`border-l-4 ${borderColor} bg-white p-4 rounded-lg shadow-md flex justify-between items-start w-full`}
    >
      <div>
        <p className={`text-lg font-semibold ${textColor}`}>{title}</p>
        <p className="text-sm mt-1 text-gray-600">{description}</p>
      </div>
      <button className={`font-extrabold ${textColor} text-2xl`} onClick={() => router.push(link)}>
        <ChevronRight />
      </button>
    </div>
  )
}

const SocialSection = () => {
  const router = useRouter()

  return (
    <div className="w-96 mx-auto bg-gray-100  p-6 rounded-xl shadow-md">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white rounded-lg shadow-md mb-6">
        <div className="relative p-3">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 rounded-full py-2 pl-12 pr-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Relevant People Section */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Relevant people</h2>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <Globe className="w-6 h-6 text-gray-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">Haibu</h3>
                  <p className="text-gray-600 text-sm">@haibuso...</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 transition duration-300 text-white font-bold py-2 px-4 rounded-md text-sm">
                  Following
                </button>
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Haibu is a decentralized and secure social platform built on top of Celestia's network. Here, you shape
                the future.
              </p>
            </div>
          </div>
        </div>

        {/* What's happening Section */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-4">What's happening</h2>
          <div className="space-y-4">
            <SocialCard
              title="#LeetCode"
              description="Join the coding challenge"
              link="/trending/leetcode"
              borderColor="border-green-500"
              textColor="text-green-500"
            />
            <SocialCard
              title="Alajuelense"
              description="Trending in Costa Rica"
              link="/trending/alajuelense"
              borderColor="border-yellow-500"
              textColor="text-yellow-500"
            />
            <SocialCard
              title="Vision Pro"
              description="Experience the future of computing"
              link="/trending/vision-pro"
              borderColor="border-purple-500"
              textColor="text-purple-500"
            />
          </div>
          <button
            onClick={() => router.push("/trending")}
            className="bg-blue-600 hover:bg-blue-500 transition duration-300 text-white font-bold py-2 px-4 rounded-md mt-4 text-sm"
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  )
}

export default SocialSection

