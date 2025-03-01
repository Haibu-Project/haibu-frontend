import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { ScrollArea } from '../../ui/scroll-area';
import ShinyText from '../../ShinyText';
import axios from 'axios';
import { motion } from 'framer-motion';
import { InfiniteBeeAllFrames } from '@/components/magicui/infinite-bee-all-frames';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ role: string, content: string }[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [isChatStarted, setIsChatStarted] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { role: 'user', content: message };
        setChatHistory([...chatHistory, userMessage]);
        setIsChatStarted(true);

        setTimeout(async () => {
            setIsThinking(true);
            try {
                const response = await axios.post('/api/ai-haika', { message });
                const aiMessage = { role: 'assistant', content: (response.data as { response: string }).response.replace(/\*\*/g, '') };
                setChatHistory((prevChatHistory) => [...prevChatHistory.filter(chat => !chat.content.startsWith('Thinking')), aiMessage]);
            } catch (error) {
                console.error('Error sending message:', error);
                const errorMessage = { role: 'assistant', content: 'Failed to get response from AI' };
                setChatHistory((prevChatHistory) => [...prevChatHistory.filter(chat => !chat.content.startsWith('Thinking')), errorMessage]);
            } finally {
                setIsThinking(false);
            }
        }, 500);

        setMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatMessage = (message: string) => {
        return message.split('\n').map((line, index) => {
            if (line.startsWith('**')) {
                return <strong key={index}>{line.replace(/\*\*/g, '')}</strong>;
            } else if (line.startsWith('- ')) {
                return <li key={index}>{line.replace('- ', '')}</li>;
            } else {
                return <p key={index}>{line}</p>;
            }
        });
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isThinking) {
            interval = setInterval(() => {
                setChatHistory((prevChatHistory) => {
                    const lastMessage = prevChatHistory[prevChatHistory.length - 1];
                    if (lastMessage && lastMessage.role === 'assistant' && lastMessage.content.startsWith('Thinking')) {
                        const dots = lastMessage.content.split('.').length - 1;
                        const newDots = dots < 3 ? dots + 1 : 1;
                        const newMessage = `Thinking${'.'.repeat(newDots)}`;
                        return [...prevChatHistory.slice(0, -1), { ...lastMessage, content: newMessage }];
                    } else {
                        return [...prevChatHistory, { role: 'assistant', content: 'Thinking.' }];
                    }
                });
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isThinking]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className="flex flex-col h-full w-full p-4 justify-center items-center bg-haibu-purple rounded-lg shadow-md transition-all duration-500">
            {!isChatStarted ? (
                <div className="flex flex-col items-center justify-center h-full transition-all duration-500">
                    <div className='absolute z-10 top-0'>
                        <InfiniteBeeAllFrames height={300} width={300} />
                    </div>
                    <h1 className="text-2xl font-bold">I&apos;m Haika. How can I help you?</h1>
                    <div className="flex items-center w-full max-w-md">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 mr-2 rounded p-4 text-lg"
                            style={{ height: '3rem' }}
                        />
                        <Button onClick={sendMessage} className="bg-blue-500 text-white rounded">→</Button>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full w-full"
                >
                    <ScrollArea className="flex-1 mb-20 p-2 bg-haibu-purple rounded-lg shadow-inner overflow-y-auto" ref={scrollRef}>
                        {chatHistory.map((chat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className={`max-w-xl ${chat.role === 'user' ? 'ml-auto text-right' : 'mr-auto text-left'}`}
                            >
                                {chat.content.startsWith('Thinking') ? (
                                    <ShinyText text={chat.content} className="block text-center" />
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`mb-2 p-2 rounded-lg inline-block ${chat.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}
                                    >
                                        {formatMessage(chat.content)}
                                    </motion.div>
                                )}
                                {chat.role === 'user' && <div className="h-4" />}
                            </motion.div>
                        ))}
                    </ScrollArea>
                    <div className="flex items-center mt-auto fixed bottom-2 left-0 right-0 p-2 bg-gray-100">
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 mr-2"
                        />
                        <Button onClick={sendMessage} className="bg-blue-500 text-white">Send</Button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Chat;
