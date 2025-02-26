"use client"
import GovernanceHeader from "@/components/features/governance/header"
import CampaignCard from "@/components/features/governance/CampaignCard"

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
        title: "Campaign 1",
        description: "Join us to support campaign 1.",
        priority: 'High',
        date: "2025-02-26T00:00:00Z",
        completed: false
    },
    {
        id: '2',
        title: "Campaign 2",
        description: "Get involved in campaign 2 and make a difference.",
        priority: 'Medium',
        date: "2025-02-28T00:00:00Z",
        completed: true
    },
    {
        id: '3',
        title: "Campaign 3",
        description: "Vote now for campaign 3 before it ends.",
        priority: 'Low',
        date: "2025-03-01T00:00:00Z",
        completed: false
    }
];

export default function GovernancePage() {
    return (
        <div className="animate__animated animate__fadeInDown">
            <div className="flex flex-col ml-[4rem] w-full ">
                <GovernanceHeader />

                <div className='flex mt-[4rem] flex-col gap-1'>
                    <h1 className="text-xl font-medium text-stellar-blue">
                        <span className="inline-block border-b-[0.1rem] border-[#f9a646]">
                            <b>Hurry up and vote! These Hai campaigns are ending</b>
                        </span>
                    </h1>
                </div>

                <div className="mt-8 flex gap-4">
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
        </div>
    )
}
