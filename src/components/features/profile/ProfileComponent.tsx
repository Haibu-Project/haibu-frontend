"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart2, Calendar, Globe, MapPin, MessageCircle, Share2, Users } from "lucide-react"
import ProfileHeader from "./header"

export default function ProfileComponent() {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="max-w-4xl gap-8 flex flex-col items-center mx-auto p-4">

      <ProfileHeader />
      
      <Card className="relative mx-4 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 -mt-20 md:-mt-24">
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-gray-500 dark:text-gray-400">@johndoe</p>
              </div>
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? "outline" : "default"}
                className={
                  isFollowing ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800" : "bg-tertiary text-primary-dark"
                }
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Building the future of AI and social connections. Passionate about technology and innovation.
            </p>

            <div className="flex flex-wrap gap-6 mt-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a href="#" className="text-tertiary hover:underline">
                  website.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined February 2024</span>
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  <strong>2.5K</strong> Following
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  <strong>10.2K</strong> Followers
                </span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="posts" className="mt-6">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="posts"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-tertiary data-[state=active]:bg-transparent"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="replies"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-tertiary data-[state=active]:bg-transparent"
            >
              Replies
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-tertiary data-[state=active]:bg-transparent"
            >
              Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            {/* Example Post */}
            <div className="border dark:border-gray-700 rounded-lg p-4 mb-4">
              <div className="flex gap-4">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">John Doe</span>
                    <span className="text-gray-500">@johndoe</span>
                    <span className="text-gray-500">· 2h</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Just had an amazing breakthrough in our AI research! 🚀 Can't wait to share more details soon.
                    #AIInnovation #TechAdvancement
                  </p>
                  <div className="flex gap-4 mt-4">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      234
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Share2 className="h-4 w-4 mr-2" />
                      56
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <BarChart2 className="h-4 w-4 mr-2" />
                      1.2K
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

