import { ArrowRight, PlayCircle, Sparkles } from "lucide-react"
import { InfiniteBeeAllFrames } from "@/components/magicui/infinite-bee-all-frames"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function GamifiedExperienceCard() {
    return (
        <div className="w-[45rem] mb-8">
            <Card className="overflow-hidden border bg-white shadow-lg relative p-4 text-center">
                <div className="absolute top-2 right-2">
                    <InfiniteBeeAllFrames height={200} width={200} />
                </div>

                <div className="relative z-10 mt-8">
                    <Badge className="bg-[#4F5FF8]/10 text-[#4F5FF8] border-0 px-2 py-0.75 text-xs font-medium flex items-center justify-center mx-auto">
                        <Sparkles className="w-3 h-3 mr-1" /> NEW
                    </Badge>

                    <h2 className="text-lg font-bold text-gray-900 mt-2">
                        Try Our <span className="text-[#4F5FF8]">Gamified Mode</span>
                    </h2>
                    <p className="text-xs text-gray-600">Win Hai tokens with fun challenges!</p>
                </div>

                <div className="relative rounded-md bg-gradient-to-br from-[#4F5FF8] to-[#6B7AFF] p-[1px] my-3">
                    <div className="w-full aspect-video bg-gray-50 rounded-md flex items-center justify-center group cursor-pointer">
                        <video
                            className="w-full h-auto"
                            src="/assets/HaiClick.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                </div>

                <Button className="bg-[#4F5FF8] hover:bg-[#4F5FF8]/90 text-white px-4 py-2 rounded-md text-xs font-medium shadow-md group w-full h-auto">
                    Play Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Card>
        </div>
    )
}

