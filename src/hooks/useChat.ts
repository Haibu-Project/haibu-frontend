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

    socket.emit("/chat/getChats", { userId });

    socket.on("/chat/chatList", (chatList) => {
      setChats(chatList);
    });

    socket.on("/chat/receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("chatList");
      socket.off("receiveMessage");
    };
  }, [userId]);

  const createChat = (newChatUser: string, onSuccess?: () => void) => {
    if (!newChatUser || !userId) return;

    socket.emit("createChat", { userA: userId, userB: newChatUser }, (chat: any) => {
      if (chat) {
        setChats((prevChats) => [...prevChats, chat]);
        if (onSuccess) onSuccess();
      } else {
        console.error("Error: No se pudo crear el chat");
      }
    });
  };

  // Buscar usuarios
  const searchUsers = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    socket.emit("searchUsers", { query }, (results: any[]) => {
      setSearchResults(results || []);
    });
  };

  const deleteChat = (chatId: string) => {
    socket.emit("/chat/deleteChat", { chatId });
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
  };
  const selectChat = (chatId: string) => {
    setActiveChat(chatId);
    socket.emit("/chat/joinChat", { chatId, userId });

    socket.emit("/chat/getMessages", { chatId }, (chatMessages: any[]) => {
      setMessages(chatMessages);
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    socket.emit("/chat/sendMessage", { chatId: activeChat, senderId: userId, content: newMessage });
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