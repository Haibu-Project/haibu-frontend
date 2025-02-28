"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MoreVertical } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useUserStore } from "@/store/user-store";

export default function ChatPage() {
  const { id: userId } = useUserStore();
  const {
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
  } = useChat(userId);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chats</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Crear Chat</Button>
          </DialogTrigger>
          <DialogContent>
            <Input
              placeholder="Buscar usuario por nombre"
              onChange={(e) => searchUsers(e.target.value)}
            />
            <div className="max-h-40 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div
                    key={user.id}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedUserId === user.id ? "bg-gray-300" : ""
                    }`}
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    {user.username}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm p-2">No users found</p>
              )}
            </div>
            {selectedUserId && (
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  createChat(selectedUserId, () => setIsDialogOpen(false)); // Cerrar modal
                  setSelectedUserId(null);
                }}
              >
                Confirmar Chat
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border-r p-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                activeChat === chat.id ? "bg-gray-200" : ""
              }`}
              onClick={() => selectChat(chat.id)}
            >
              <span>Chat {chat.id}</span>
              <Button variant="ghost" size="icon" onClick={() => deleteChat(chat.id)}>
                <MoreVertical size={16} />
              </Button>
            </div>
          ))}
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          {activeChat ? (
            <>
              <div className="h-64 overflow-y-auto border p-2">
                {messages.map((msg, idx) => (
                  <p
                    key={idx}
                    className={`p-1 rounded ${
                      msg.senderId === userId ? "text-right bg-blue-100" : "text-left bg-gray-100"
                    }`}
                  >
                    {msg.content}
                  </p>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                />
                <Button onClick={sendMessage}>Enviar</Button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Selecciona un chat para comenzar</p>
          )}
        </div>
      </div>
    </div>
  );
}