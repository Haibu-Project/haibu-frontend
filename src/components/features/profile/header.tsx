
import Image from "next/image"

export default function ProfileHeader() {
    return (
        <header className="flex mt-[2rem] p-6 h-[10rem] bg-gradient-to-r from-[#4461f2] to-[#4461F2] rounded-3xl items-center">
            <div className="w-2/3 pl-6">
                <h1 className="text-[26px] font-semibold text-white">
                    Your Profile
                </h1>
                <p className="text-[18px] font-medium text-white">
                    Welcome to your profile. Here you can view and manage your posts, interactions, and followers.
                </p>
            </div>
            <div className="w-1/3 mt-[2rem] flex justify-center items-center">
                <Image
                    src="/icons/profile2.svg"
                    width={160}
                    height={160}
                    alt="HaiToken SVG"
                    className="object-contain"
                />
            </div>
        </header>
    )
}