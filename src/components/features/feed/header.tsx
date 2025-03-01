/* eslint-disable react/no-unescaped-entities */

import { useUserStore } from "@/store/user-store"
import { InfiniteBeeAllFrames } from "@/components/magicui/infinite-bee-all-frames"

export default function FeedHeader() {

    const { name } = useUserStore()

    return (
        <header className="flex mt-[2rem] p-6 h-[10rem] bg-gradient-to-r from-[#4461f2] to-[#4461F2] rounded-3xl items-center">
            <div className="w-2/3 pl-6">
        
                <h1 className="text-[26px] font-semibold text-white">
                    Welcome {name} 
                </h1>
                <p className="text-[18px] font-medium text-white">
                   Here you can share your thoughts, ideas, and experiences through posts, comments, and interactions.
                </p>
            </div>
            <div className="w-[40%] mt-[2rem] flex justify-center items-center">
                <InfiniteBeeAllFrames  width={350} height={100}/>
            </div>
        </header>
    )
}