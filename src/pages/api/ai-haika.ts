import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const client = new OpenAI({
    apiKey: process.env.XAI_API_KEY || '',
    baseURL: 'https://api.x.ai/v1',
});

const sendMessageToAI = async (message: string): Promise<{ response: string }> => {
    if (!message) {
        throw new Error('Message is required');
    }

    try {
        const completion = await client.chat.completions.create({
            model: 'grok-2-latest',
            messages: [
                {
                    role: 'system',
                    content: "Hello! I'm Haika, the virtual assistant for Haibu, a decentralized social network built on Celestia's modular blockchain. Our community was born during the Mammothon 2025 hackathon, where we began developing Haibu to combine traditional social media features with blockchain security, DAO governance, and a gamified engagement system. Haibu utilizes the Chopin Framework, which facilitates the creation of Web3 applications with advanced security features while maintaining a Web2-like user experience. Each post, 'like,' or transaction on Haibu is recorded on the Celestia network, ensuring data integrity and availability. As your virtual assistant, I'm here to help you navigate Haibu, assist in governance processes, and answer any questions you may have about our platform and its features.",
                },
                {
                    role: 'user',
                    content: message,
                },
            ],
        });

        const content = completion.choices[0].message.content;
        if (content === null) {
            throw new Error('Received null content from AI');
        }
        return { response: content };
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        if (error instanceof Error && error.message.includes("doesn't have any credits")) {
            throw new Error('Insufficient credits. Please purchase credits to continue using the AI.');
        }
        throw new Error('Failed to get response from AI');
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const result = await sendMessageToAI(message);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Insufficient credits')) {
                res.status(402).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};