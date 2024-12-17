import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

// Constants
const REALTIME_DOMAIN =
  "zevvk6dlwbevva4gkf6jv3deju.appsync-realtime-api.us-east-1.amazonaws.com";
const HTTP_DOMAIN =
  "zevvk6dlwbevva4gkf6jv3deju.appsync-api.us-east-1.amazonaws.com";
const API_KEY = "da2-jtftu76bmzeghgjf4tghyatqby";
const authorization = { "x-api-key": API_KEY, host: HTTP_DOMAIN };

// Mock Data
const users = [
  {
    id: 1,
    name: "Alice",
    avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Alice",
  },
  {
    id: 2,
    name: "Bob",
    avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Bob",
  },
  {
    id: 3,
    name: "Charlie",
    avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Charlie",
  },
  {
    id: 4,
    name: "David",
    avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=David",
  },
  {
    id: 5,
    name: "Eve",
    avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Eve",
  },
];

const initialMessages: any[] = [];

export const HomeComponent = () => {
  // State
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState(users[0]);

  // WebSocket Logic
  useEffect(() => {
    const getAuthProtocol = () => {
      const header = btoa(JSON.stringify(authorization))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      return `header-${header}`;
    };

    const socket = new WebSocket(`wss://${REALTIME_DOMAIN}/event/realtime`, [
      "aws-appsync-event-ws",
      getAuthProtocol(),
    ]);

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(JSON.stringify({ type: "connection_init" }));

      socket.send(
        JSON.stringify({
          type: "subscribe",
          id: crypto.randomUUID(),
          channel: "/default/dummy",
          authorization,
        }),
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received:", data);
      console.log("Received type:", data.type);

      if (data.type === "data" && data.event) {
        const parsedEvent = JSON.parse(data.event);
        console.log("Parsed Event:", parsedEvent);

        if (parsedEvent.message) {
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              content: parsedEvent.message,
              role: data.role || "assistant",
              user: users.find((u) => u.id === parsedEvent.userId) || users[0],
              timestamp: new Date(),
            },
          ]);
        }
      }
    };

    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onerror = (error) => console.error("WebSocket error:", error);

    return () => {
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
  }, []);

  // Input Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        id: crypto.randomUUID(),
        content: input,
        role: "user",
        user: currentUser,
        timestamp: new Date(),
      };

      const event = {
        channel: "/default/dummy",
        events: [JSON.stringify({ message: input.trim(), userId: 5 })],
      };
      await fetch(`https://${HTTP_DOMAIN}/event`, {
        method: "POST",
        headers: {
          ...authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => {
            const isCurrentUser = message.user.id === currentUser.id;
            const showAvatar =
              index === 0 || messages[index - 1].user.id !== message.user.id;

            return (
              <div
                key={message.id}
                className={`mb-4 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-end max-w-[80%]`}
                >
                  {showAvatar && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={message.user.avatar}
                        alt={message.user.name}
                      />
                      <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`flex flex-col ${isCurrentUser ? "items-end mr-2" : "items-start ml-2"}`}
                  >
                    {showAvatar && (
                      <span
                        className={`text-xs text-gray-500 mb-1 ${isCurrentUser ? "text-right" : "text-left"}`}
                      >
                        {message.user.name}
                      </span>
                    )}
                    <div
                      className={`rounded-lg p-2 ${
                        isCurrentUser
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {message.content}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {format(message.timestamp, "HH:mm")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollArea>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={`Message as ${currentUser.name}...`}
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>

      {/* User List Sidebar */}
      <div className="w-64 bg-white border-l">
        <h2 className="text-xl font-bold p-4">Users</h2>
        <ScrollArea className="h-[calc(100vh-60px)]">
          {users.map((user) => (
            <button
              key={user.id}
              className={`w-full text-left p-2 hover:bg-gray-100 ${
                currentUser.id === user.id ? "bg-blue-100" : ""
              }`}
              onClick={() => setCurrentUser(user)}
            >
              {user.name}
            </button>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
