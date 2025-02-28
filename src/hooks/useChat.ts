"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

export function useChat(userId: string) {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!userId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats/${userId}`)
      .then((res) => res.json())
      .then(setChats)
      .catch(console.error);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("searchUsersResults", (results) => {
      setSearchResults(results || []);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("searchUsersResults");
    };
  }, [userId]);

  const createChat = async (newChatUser: string, onSuccess?: () => void) => {
    if (!newChatUser || !userId) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userA: userId, userB: newChatUser }),
      });

      if (!response.ok) throw new Error("Error al crear chat");

      const chat = await response.json();
      setChats((prevChats) => [...prevChats, chat]);
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
    socket.emit("searchUsers", { query }, (results: any[]) => {
      setSearchResults(results || []);
    });
  };

  const deleteChat = async (chatId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats/${chatId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar chat");

      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const selectChat = async (chatId: string) => {
    setActiveChat(chatId);
    socket.emit("joinChat", { chatId, userId });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats/messages/${chatId}`);
      if (!response.ok) throw new Error("Error al obtener mensajes");

      const chatMessages = await response.json();
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    socket.emit("sendMessage", { chatId: activeChat, senderId: userId, content: newMessage });
    setNewMessage("");
  };

  return {
    chats,
    activeChat,
    messages,
    searchResults,
    newMessage,
    setNewMessage,
    createChat,
    searchUsers,
    deleteChat,
    selectChat,
    sendMessage,
  };
}
