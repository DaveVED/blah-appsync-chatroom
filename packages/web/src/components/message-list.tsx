import { useRef, useEffect } from "react";
import { User, Message } from "@/components/types";
import { MessageItem } from "@/components/message-item";

interface MessageListProps {
  messages: Message[];
  users: User[];
  currentUser: User;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  users,
  currentUser,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="h-full p-4 overflow-y-auto">
      {messages.map((message, index) => {
        const user = users.find((u) => u.id === message.userId)!;
        const isCurrentUser = user.id === currentUser.id;
        const showAvatar =
          index === 0 || messages[index - 1].userId !== message.userId;

        return (
          <MessageItem
            key={message.id}
            message={message}
            user={user}
            isCurrentUser={isCurrentUser}
            showAvatar={showAvatar}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};
