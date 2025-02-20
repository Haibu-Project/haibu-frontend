import { Search, TrendingUp, Users } from "lucide-react"
import Image from "next/image"

export function RightSidebar() {
  const peopleToFollow = [
    {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "AI Researcher | Building the future",
    },
    {
      name: "Alex Rivera",
      handle: "@arivera",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Full-stack developer & Web3 enthusiast",
    },
    {
      name: "Maria García",
      handle: "@mgarcia",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Product Designer | UX/UI Expert",
    },
  ]


  return (
    <div className="w-80 space-y-6 p-4">
      <div className="sticky top-0 z-10 bg-white dark:bg-primary-dark pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Nexus"
            className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tertiary dark:bg-primary dark:text-white"
          />
        </div>
      </div>

      <div className="bg-accent/10 dark:bg-primary rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4 text-primary-dark dark:text-white flex items-center">
          <Users className="mr-2 h-5 w-5 text-tertiary" /> Who to follow
        </h2>
        <div className="space-y-4">
          {peopleToFollow.map((person) => (
            <div key={person.handle} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={person.avatar || "/placeholder.svg"}
                  alt={person.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{person.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{person.handle}</p>
                </div>
              </div>
              <button className="bg-tertiary text-primary-dark rounded-full px-4 py-1 text-sm font-bold hover:bg-tertiary-light transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent/10 dark:bg-primary rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4 text-primary-dark dark:text-white flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-tertiary" /> Trending
        </h2>
      </div>
    </div>
  )
}

