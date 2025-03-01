"use client"
import Chat from "@/components/features/chat/chat";
import { useState } from "react";
import { useUserStore } from "@/store/user-store";

export default function Home() {
  const { id:userId } = useUserStore();
  const [receiverId, setReceiverId] = useState("9885d822-e06c-45ab-8782-ba3bf9e00b0c");

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Chat en Tiempo Real</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Selecciona un usuario para chatear:</label>
        <select
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecciona un usuario</option>
          <option value="usuario2">Usuario 2</option>
          <option value="usuario3">Usuario 3</option>
          <option value="usuario4">Usuario 4</option>
        </select>
      </div>

      {receiverId && <Chat userId={userId} receiverId={receiverId} />}
    </div>
  );
}
