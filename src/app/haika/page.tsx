"use client";

import Chat from "@/components/features/chatHaika/chat";

export default function HaikaPage() {
  return (
    <div className="animate__animated animate__fadeInRight">
      <div className="flex min-h-screen w-full dark:bg-primary-dark overflow-hidden">
        <main className="flex-1 border-x dark:border-accent/10 px-4 sm:px-8 flex flex-col">
          <div className="w-full h-full py-8 flex-1 flex flex-col relative">
            <div className="absolute inset-0">
              <Chat />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}