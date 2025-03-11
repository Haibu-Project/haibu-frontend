import Image from "next/image"

interface ProfileHeaderProps {
  image: string
  description: string
  name?: string
  username?: string
}

export default function ProfileHeader({ image, description, name, username }: ProfileHeaderProps) {
  return (
    <header className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#4461f2] to-[#6e85ff] shadow-lg">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
        </svg>
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
      </div>

      <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-6">
        <div className="md:order-2 flex-shrink-0 relative">
          <div className="h-28 w-28 md:h-36 md:w-36 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
            {image ? (
              <Image
                src={image || "/placeholder.svg"}
                width={160}
                height={160}
                alt="Profile Image"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        <div className="md:order-1 flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{name || "Your Profile"}</h1>
          {username && <p className="text-white/80 text-lg mb-2">@{username}</p>}
          <p className="text-white/90 text-base md:text-lg font-medium max-w-xl">
            {description || "Welcome to your profile page"}
          </p>
        </div>
      </div>
    </header>
  )
}

