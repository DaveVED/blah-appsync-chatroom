import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Message } from "./types"

interface MessageItemProps {
  message: Message;
  user: User;
  isCurrentUser: boolean;
  showAvatar: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, user, isCurrentUser, showAvatar }) => {
  return (
    <div className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end w-full`}>
        {showAvatar && (
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        )}
        <div className={`flex flex-col ${isCurrentUser ? 'items-end mr-2' : 'items-start ml-2'}`}>
          {showAvatar && (
            <span className={`text-xs font-medium text-gray-600 mb-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
              {user.name}
            </span>
          )}
          <div
            className={`rounded-lg py-2 px-3 ${
              isCurrentUser ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'
            } shadow-sm max-w-[75%]`}
          >
            {message.content}
          </div>
          <span className="text-xs text-gray-400 mt-1">
            {format(message.timestamp, 'HH:mm')}
          </span>
        </div>
      </div>
    </div>
  )
}

