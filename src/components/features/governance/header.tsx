import Image from "next/image"

export default function GovernanceHeader() {
    return (
        <>
            <header className="flex mt-[2rem] p-6 h-[10rem] w-[90%] bg-gradient-to-r from-[#4461f2] to-[#4461F2] rounded-3xl items-center">
                <div className="w-2/3 pl-6">
                    <h1 className="text-[26px] font-semibold text-white">
                        Start Earning Hai Tokens
                    </h1>
                    <p className="text-[18px] font-medium text-white">
                        Hai Tokens are the Haibu&apos;s governance token, start accumulating them to participate in our voting campaigns.
                    </p>
                </div>
                <div className="w-1/3 flex justify-end mr-[4rem]">
                    <Image
                        src="/assets/HaiToken.svg"
                        width={160}
                        height={160}
                        alt="HaiToken SVG"
                        className="object-contain"
                    />
                </div>
            </header>
        </>
    )
}