import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { mockChats, truncateMessage } from "@/lib/utils";

export function NavChats({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props} className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        <span className="text-sm font-semibold">Chats</span>
      </SidebarGroupLabel>
      <SidebarGroupAction title="Create Chat">
        <MessageCircle className="h-4 w-4" />
        <span className="sr-only">Create Chat</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {mockChats.map((chat, index) => (
            <React.Fragment key={chat.id}>
              {index > 0 && <Separator className="my-2 opacity-50" />}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage
                        className="object-cover"
                        src={chat.imageUrl}
                        alt={chat.name}
                      />
                      <AvatarFallback className="text-sm font-medium">
                        {chat.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 overflow-hidden">
                      <span className="text-xs font-semibold leading-normal truncate">
                        {chat.name}
                      </span>
                      <span className="text-xs text-gray-600 truncate">
                        {truncateMessage(chat.message, 40)}
                      </span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
