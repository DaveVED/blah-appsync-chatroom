import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Plus, Settings, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "./types";

interface MessageInputProps {
  currentUser: User;
  onSendMessage: (content: string) => void;
  onSettings: () => void;
  onCleanupChat: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  currentUser,
  onSendMessage,
  onSettings,
  onCleanupChat,
}) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            className="rounded-full w-8 h-8 bg-gray-200 hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center flex-shrink-0"
          >
            <Plus className="h-4 w-4 text-gray-600" />
            <span className="sr-only">Additional options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onSettings}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCleanupChat}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Clean up chat</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex-grow relative">
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder={`Message as ${currentUser.name}...`}
          className="w-full min-h-[60px] p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none"
        />
      </div>
      <Button
        type="submit"
        size="icon"
        className="rounded-full w-10 h-10 bg-purple-600 hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center flex-shrink-0"
      >
        <Send className="h-5 w-5 text-white" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
};
