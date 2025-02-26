"use client"
import GovernanceHeader from "@/components/features/governance/header";
import CampaignCard from "@/components/features/governance/CampaignCard";

type Card = {
    id: string;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    date: string;
    completed: boolean;
};

const cards: Card[] = [
    {
        id: '1',
        title: "Gamified Click Campaign",
        description: "Continue the gamified click campaign to distribute the first Hai tokens until early May.",
        priority: 'High',
        date: "2025-05-01T00:00:00Z",
        completed: false
    },
    {
        id: '2',
        title: "NFT Marketplace",
        description: "Create a section where users can sell their NFTs securely.",
        priority: 'Medium',
        date: "2025-04-15T00:00:00Z",
        completed: false
    },
    {
        id: '3',
        title: "Hai Token Reward System",
        description: "A new gamified system where users can earn Hai tokens by completing daily challenges and engaging with the community.",
        priority: 'High',
        date: "2025-04-30T00:00:00Z",
        completed: false
    }
];

export default function GovernancePage() {
    return (
        <>
            <div className="animate__animated  animate__fadeInDown flex flex-col px-4 w-full overflow-x-hidden gap-6">

                <div className="flex flex-col justify-center items-center px-4 w-full overflow-x-hidden">
                    <GovernanceHeader />
                </div>


                <div className='flex flex-col gap-1'>
                    <h1 className="text-xl ml-[4.8rem] font-medium text-stellar-blue">
                        <span className="inline-block border-b-[0.1rem] border-[#f9a646]">
                            <b>Hurry up and vote! These Hai campaigns are ending</b>
                        </span>
                    </h1>
                </div>

                <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-6 w-full max-w-6xl mx-auto">
                    {cards.map((card) => (
                        <CampaignCard
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            priority={card.priority}
                            date={card.date}
                            completed={card.completed}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
