
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppSidebarSearchForm } from "./app-sidebar-search-form";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import { AppSidebarUserNav } from "@/components/app-sidebar-user-nav";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { AppSidebarGroupChats } from "@/components/app-sidebar-group-chats";
import { AppSidebarChats } from "@/components/app-sidebar-chats";

const data = {
  user: {
    name: "dave",
    email: "me@davedennis.dev",
    avatar: "/dave-cave-icon.png",
  },
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
        {
          name: "Health & Wellness Tracker",
          url: "#",
          emoji: "🍏",
        },
        {
          name: "Personal Growth & Learning Goals",
          url: "#",
          emoji: "🌟",
        },
      ],

    }
  ],
  groupChats: [
    {
      name: "Global",
      url: "#",
      emoji: "🌐",
    },
  ],
  personalChats: [
    {
      name: "Me",
      url: "#",
      emoji: "🌐",
    }
  ]
}

/**
 * The left hand side bar for the application. 
 * 
 * Documentaton used: https://ui.shadcn.com/blocks/sidebar.
 * @param param0 
 * @returns 
 */
export const AppSidebar: React.FC = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <AppSidebarHeader />
      <DropdownMenuSeparator />
      <AppSidebarSearchForm />
      <SidebarContent>
      <AppSidebarChats chats={data.personalChats} />
          <AppSidebarGroupChats groupChats={data.groupChats} />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarUserNav user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

