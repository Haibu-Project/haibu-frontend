import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HaiCard } from "@/components/posts/hai-card"
import { CalendarDays, Link2, MapPin } from "lucide-react"

// Mock data - replace with your actual data fetching
const profile = {
  username: "juandc",
  name: "Juan David Castro",
  avatar: "/placeholder.svg?height=100&width=100",
  cover: "/placeholder.svg?height=300&width=800",
  bio: "Developer & Creator • Building the future of social media with @haibuapp • Learning in public",
  location: "Bogotá, Colombia",
  website: "juandc.co",
  joinedDate: "Marzo 2024",
  stats: {
    following: 1234,
    followers: 5678,
  },
}

const hais = [
  {
    id: "1",
    content:
      "¡Haibu es increíble! 🚀 Cada día más personas se unen a nuestra comunidad. Gracias a todos por ser parte de esta aventura. #HaibuApp",
    likes: 42,
    rehais: 12,
    replies: 5,
    createdAt: "2h",
    author: {
      name: "Juan David Castro",
      username: "juandc",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  // Add more hais here...
]

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Cover Image */}
      <div className="relative h-[200px] md:h-[300px]">
        <img src={profile.cover || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
        <div className="absolute -bottom-16 left-4 md:left-6">
          <Avatar className="h-32 w-32 border-4 border-white">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Profile Header */}
      <div className="border-b">
        <div className="px-4 pb-4 pt-20 md:px-6">
          <div className="flex justify-end mb-4">
            <Button variant="outline" className="rounded-full">
              Editar perfil
            </Button>
          </div>

          <div className="mb-4">
            <h1 className="text-xl font-bold">{profile.name}</h1>
            <p className="text-sm text-gray-500">@{profile.username}</p>
          </div>

          <p className="mb-4 whitespace-pre-wrap">{profile.bio}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-1">
                <Link2 size={16} />
                <a href={`https://${profile.website}`} className="text-twitter hover:underline">
                  {profile.website}
                </a>
              </div>
            )}
            <div className="flex items-center gap-1">
              <CalendarDays size={16} />
              <span>Se unió en {profile.joinedDate}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-4 text-sm">
            <button className="hover:underline">
              <span className="font-bold">{profile.stats.following}</span>{" "}
              <span className="text-gray-500">Siguiendo</span>
            </button>
            <button className="hover:underline">
              <span className="font-bold">{profile.stats.followers}</span>{" "}
              <span className="text-gray-500">Seguidores</span>
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="hais" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0">
            <TabsTrigger
              value="hais"
              className="rounded-none border-0 px-8 py-4 font-semibold data-[state=active]:border-b-4 data-[state=active]:border-twitter"
            >
              Hais
            </TabsTrigger>
            <TabsTrigger
              value="rehais"
              className="rounded-none border-0 px-8 py-4 font-semibold data-[state=active]:border-b-4 data-[state=active]:border-twitter"
            >
              Rehais
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="rounded-none border-0 px-8 py-4 font-semibold data-[state=active]:border-b-4 data-[state=active]:border-twitter"
            >
              Me gusta
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hais" className="mt-0 border-0">
            <div className="divide-y">
              {hais.map((hai) => (
                <HaiCard key={hai.id} hai={hai} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rehais" className="mt-0 border-0">
            <div className="divide-y">{/* Rehais content */}</div>
          </TabsContent>

          <TabsContent value="likes" className="mt-0 border-0">
            <div className="divide-y">{/* Likes content */}</div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

