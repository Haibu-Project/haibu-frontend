"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MoreVertical,
  Search,
  Send,
  Plus,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useUserStore } from "@/store/user-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  const currentChat = chats.find((chat) => chat.id === activeChat);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchUsers(query);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)] flex flex-col">
      <Card className="flex flex-col h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Chats
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus size={16} />
                  Create Chat
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>New Chat</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by username"
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  <ScrollArea className="h-60">
                    {searchResults.length > 0 ? (
                      searchResults.map((user) => (
                        <div
                          key={user.id}
                          className={`p-3 mb-1 cursor-pointer rounded-md flex items-center gap-3 hover:bg-secondary/50 transition-colors ${
                            selectedUserId === user.id ? "bg-secondary" : ""
                          }`}
                          onClick={() => setSelectedUserId(user.id)}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {getInitials(user.username)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.username}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <p className="text-muted-foreground mb-2">
                          No users found
                        </p>
                        {searchQuery && (
                          <p className="text-sm text-muted-foreground">
                            try other method
                          </p>
                        )}
                      </div>
                    )}
                  </ScrollArea>
                  {selectedUserId && (
                    <Button
                      className="w-full"
                      onClick={() => {
                        createChat(selectedUserId, () =>
                          setIsDialogOpen(false)
                        );
                        setSelectedUserId(null);
                        setSearchQuery("");
                      }}
                    >
                      Confirm Chat
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            <div className="border-r dark:border-gray-800">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="p-2">
                  {chats.length > 0 ? (
                    chats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex justify-between items-center p-3 mb-1 rounded-md cursor-pointer transition-colors ${
                          activeChat === chat.id
                            ? "bg-secondary text-secondary-foreground"
                            : "hover:bg-secondary/50"
                        }`}
                        onClick={() => selectChat(chat.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>
                              {`${chat.participants[1]?.user.name.charAt(0)}${chat.participants[1]?.user.surnames.charAt(0)}`}{" "}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              Chat with {chat.participants[1]?.user.username}
                            </p>
                            <p className="text-xs text-muted-foreground truncate w-32">
                              Last message...
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteChat(chat.id);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                      <p className="text-muted-foreground mb-2">
                        No chats available
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsDialogOpen(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create new chat
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
            <div className="col-span-2 flex flex-col h-full">
              {activeChat ? (
                <>
                  <div className="border-b p-3 flex items-center">
                    <Avatar className="h-9 w-9 mr-3">
                      <AvatarFallback>
                        {`${currentChat?.participants[1]?.user.name.charAt(0)}${currentChat?.participants[1]?.user.surnames.charAt(0)}`}{" "}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {currentChat?.participants[1]?.user.username}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Active
                      </Badge>
                    </div>
                  </div>
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.length > 0 ? (
                        messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex text-white ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                                msg.senderId === userId
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary"
                              }`}
                            >
                              <p>{msg.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  msg.senderId === userId
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {new Date().toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-40 text-center">
                          <p className="text-muted-foreground">
                            No messages yet
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Send the first message to start
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <CardFooter className="border-t p-3">
                    <form
                      onSubmit={handleSendMessage}
                      className="flex gap-2 w-full"
                    >
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="type a HaiMessage"
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!newMessage.trim()}>
                        <Send size={16} className="mr-2" />
                        Send
                      </Button>
                    </form>
                  </CardFooter>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Select a chat</h3>
                  <p className="text-muted-foreground mb-4">
                    Select a chat or create one
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create new chat
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
