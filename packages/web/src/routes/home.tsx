"use client";

import { useState } from "react";
import { MessageList } from "@/components/message-list";
import { MessageInput } from "@/components/message-input";
import { users, initialMessages, User, Message } from "@/components/types";

export const HomeComponent = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentUser, setCurrentUser] = useState<User>(users[0]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      userId: currentUser.id,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  const handleCleanupChat = () => {
    console.log("Clean up chat clicked");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50 w-full">
      <div className="flex-1 overflow-hidden">
        <MessageList
          messages={messages}
          users={users}
          currentUser={currentUser}
        />
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <MessageInput
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
          onSettings={handleSettings}
          onCleanupChat={handleCleanupChat}
        />
      </div>
    </div>
  );
};
