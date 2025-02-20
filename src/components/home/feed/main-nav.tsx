import Link from "next/link"
import { Home, MessageSquare, Bell, Settings, Users, Bookmark, User, Zap } from "lucide-react"

const navItems = [
  { title: "Home", icon: Home, href: "/", active: true },
  { title: "Explore", icon: Users, href: "/explore" },
  { title: "Messages", icon: MessageSquare, href: "/messages" },
  { title: "Notifications", icon: Bell, href: "/notifications" },
  { title: "Bookmarks", icon: Bookmark, href: "/bookmarks" },
  { title: "Profile", icon: User, href: "/profile" },
  { title: "Settings", icon: Settings, href: "/settings" },
]

export function MainNav() {
  return (
    <div className="flex flex-col h-full bg-primary text-white p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 px-4">
          <div className="rounded-xl bg-white p-2 text-primary">
            <Zap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">Nexus</span>
        </Link>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              item.active ? "bg-secondary text-white" : "text-white/70 hover:bg-primary-light hover:text-white"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>
      <button className="mt-auto rounded-full bg-tertiary text-primary-dark px-6 py-3 text-sm font-medium transition-colors hover:bg-tertiary-light focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 focus:ring-offset-primary">
        Create Post
      </button>
    </div>
  )
}

