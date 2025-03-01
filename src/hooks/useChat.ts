import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
export function useChat(userId: string) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    // Unirse al chat
    socket.emit("joinChat", { userId });

    // Escuchar mensajes recibidos
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId]);

  const sendMessage = (receiverId: string, content: string) => {
    socket.emit("sendMessage", { senderId: userId, receiverId, content });
  };

  return { messages, sendMessage };
}
