"use client"

import { MessageCircle } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export const SidebarChats = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarMenu>

            <SidebarMenuItem>
            <SidebarMenuButton tooltip={"Chats"}>
                  {true && <MessageCircle />}
                  <span>{"@some user"}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

