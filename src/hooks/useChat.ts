"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

interface Chat {
  id: string;
  participants: any;
}

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

interface User {
  id: string;
  username: string;
}

export function useChat(userId: string) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const fetchChats = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats/${userId}`);
      if (!res.ok) throw new Error("Error al obtener chats");
      const data = await res.json();
      setChats(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchChats();

    socket.on("searchUsersResults", (results: User[]) => {
      setSearchResults(results || []);
    });

    return () => {
      socket.off("searchUsersResults");
    };
  }, [userId]);

  const createChat = async (newChatUser: string, onSuccess?: () => void) => {
    if (!newChatUser || !userId) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chats`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userA: userId, userB: newChatUser }),
        }
      );
      if (!response.ok) throw new Error("Error al crear chat");

      const chat: Chat = await response.json();
      setChats((prevChats) => [...prevChats, chat]);

      await fetchChats();

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const searchUsers = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    socket.emit("searchUsers", { query }, (results: User[]) => {
      setSearchResults(results || []);
    });
  };

  const deleteChat = async (chatId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chats/${chatId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error al eliminar chat");

      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const selectChat = async (chatId: string) => {
    setActiveChat(chatId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chats/messages/${chatId}`
      );
      if (!response.ok) throw new Error("Error al obtener mensajes");

      const chatMessages: Message[] = await response.json();
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chats/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId: activeChat,
            senderId: userId,
            content: newMessage,
          }),
        }
      );
      if (!response.ok) throw new Error("Error al enviar mensaje");

      const message: Message = await response.json();
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    chats,
    messages,
    searchResults,
    newMessage,
    setNewMessage,
    createChat,
    searchUsers,
    deleteChat,
    selectChat,
    sendMessage,
    activeChat,
    fetchChats,
  };
}
