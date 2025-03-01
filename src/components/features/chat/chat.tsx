import { useState } from "react";
import { useChat } from "@/hooks/useChat";

interface ChatProps {
  userId: string;
  receiverId: string;
}

export default function Chat({ userId, receiverId }: ChatProps) {
  const { messages, sendMessage } = useChat(userId);
  const [message, setMessage] = useState("");

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Chat</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-4">
        {messages.map((msg, idx) => (
          <p key={idx} className={msg.senderId === userId ? "text-right text-blue-500" : "text-left text-gray-700"}>
            <strong>{msg.senderId === userId ? "Tú" : "Ellos"}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-l p-2"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={() => {
            sendMessage(receiverId, message);
            setMessage("");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
