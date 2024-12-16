'use client'

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Send, Plus, Settings, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock Data
const users = [
  { id: 1, name: 'Alice', avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Alice' },
  { id: 2, name: 'Bob', avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Bob' },
  { id: 3, name: 'Charlie', avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Charlie' },
  { id: 4, name: 'David', avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=David' },
  { id: 5, name: 'Eve', avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Eve' },
]

const initialMessages = [
  { id: '1', content: 'Hello everyone!', userId: 1, timestamp: new Date(2023, 5, 1, 9, 0) },
  { id: '2', content: 'Hi Alice, how are you?', userId: 2, timestamp: new Date(2023, 5, 1, 9, 5) },
  { id: '3', content: 'I\'m doing great, thanks for asking!', userId: 1, timestamp: new Date(2023, 5, 1, 9, 10) },
]

export const HomeComponent = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [currentUser, setCurrentUser] = useState(users[0])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const newMessage = {
        id: crypto.randomUUID(),
        content: input.trim(),
        userId: currentUser.id,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      setInput("")
    }
  }

  const handleSettings = () => {
    console.log("Settings clicked")
  }

  const handleCleanupChat = () => {
    console.log("Clean up chat clicked")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50 w-full">
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-4 overflow-y-auto">
          {messages.map((message, index) => {
            const user = users.find(u => u.id === message.userId)!
            const isCurrentUser = user.id === currentUser.id
            const showAvatar = index === 0 || messages[index - 1].userId !== message.userId

            return (
              <div key={message.id} className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
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
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
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
              <DropdownMenuItem onClick={handleSettings}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCleanupChat}>
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
      </div>
    </div>
  )
}

