import * as React from "react";
import { MessageSquare } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const NavBanner: React.FC = ({
  ...props
}: React.ComponentProps<typeof SidebarMenu>): JSX.Element => {
  return (
    <SidebarMenu {...props}>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <a href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <MessageSquare className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Blah Communication</span>
              <span className="">v1.0.0-beta.1</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
