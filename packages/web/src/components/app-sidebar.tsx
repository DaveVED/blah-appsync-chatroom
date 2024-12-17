import * as React from "react";
import { User, Settings, LogOut, Plus, Search, MessageCircle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { LoginForm } from "@/components/login-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/auth-provider";
import { onlineUsers, chats} from "@/components/types";

export const AppSidebar: React.FC = (): JSX.Element => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Sidebar>
<SidebarHeader className="p-4">
  <div className="flex items-center justify-center">
    <img
      src="/me.png"
      alt="Chat Logo"
      className="w-20 h-20 rounded-full object-contain"
    />
  </div>
</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Online</SidebarGroupLabel>
          <SidebarGroupAction title="Search People">
            <Search /> <span className="sr-only">Search People</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            {onlineUsers.map((user) => (
              <SidebarMenuItem key={user.name}>
                <SidebarMenuButton>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>24</SidebarMenuBadge>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupAction title="New Chat">
            <MessageCircle /> <span className="sr-only">New Chat</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            {chats.map((chat) => (
              <SidebarMenuItem key={chat.name}>
                <SidebarMenuButton>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>
                      {chat.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{chat.name}</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>24</SidebarMenuBadge>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {!isLoggedIn ? (
          <>
            <Separator />
            <LoginForm />
          </>
        ) : (
          <>
            <Separator />
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src="/placeholder-avatar.jpg"
                          alt="@username"
                        />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start flex-grow">
                        <span className="font-medium">John Doe</span>
                        <span className="text-xs text-muted-foreground">
                          john@example.com
                        </span>
                      </div>
                      <Settings className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="start"
                    className="w-[--radix-dropdown-menu-trigger-width]"
                  >
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

