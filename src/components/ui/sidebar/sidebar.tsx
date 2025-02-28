// src/components/MainNav.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, Bell, Settings, Users, User } from "lucide-react"
import Image from "next/image"
import CreatePostModal from "@/components/features/postModal/postModal"

const navItems = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Governance", icon: MessageSquare, href: "/governance" },
  { title: "Hai AI", icon: Users, href: "/explore" },
  { title: "Settings", icon: Settings, href: "/settings" },
  { title: "Messages", icon: MessageSquare, href: "/messages" },
  { title: "Profile", icon: User, href: "/profile" },
]

export function MainNav() {
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col w-full h-full bg-primary text-white p-4 pl-[5rem]">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/haibu_white.svg" alt="Haibu Logo" width={150} height={100} />
        </Link>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-secondary text-white" : "text-white/70 hover:bg-primary-light hover:text-white"
                }`}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
      <button
        className="mt-auto rounded-full bg-tertiary text-primary-dark px-6 py-3 text-sm font-medium transition-colors hover:bg-tertiary-light focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 focus:ring-offset-primary"
        onClick={() => setIsModalOpen(true)}
      >
        Create Post
      </button>
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
