import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavBanner } from "@/components/nav-banner";
import { Inbox, Bell } from "lucide-react";
import { NavCommon } from "@/components/nav-common";
import { NavChats } from "@/components/nav-chats";
import { NavUser } from "@/components/nav-user";
import { Separator } from "@/components/ui/separator";
import { NavLoggedOut } from "@/components/nav-logged-out";
import { AuthForm } from "./auth-form";
import { useAuth } from "./auth-provider";

const navData = {
  user: {
    name: "dave",
    email: "m@davedennis.com",
    avatar: "/dave-cave-icon.png",
  },
  navCore: [
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "3",
    },
    {
      title: "Notifications",
      url: "#",
      icon: Bell,
      badge: "5",
    },
  ],
};

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element => {
  const { isAuthenticated } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavBanner />
      </SidebarHeader>
      {isAuthenticated ? (
        <>
          <SidebarContent>
            <NavCommon items={navData.navCore} />
            <NavChats />
          </SidebarContent>
          <SidebarFooter>
            <Separator />
            <NavUser user={navData.user} />
          </SidebarFooter>
        </>
      ) : (
        <>
          <SidebarContent className="flex flex-col items-center justify-center flex-grow p-4">
            <NavLoggedOut />
          </SidebarContent>
          <SidebarFooter>
            <Separator className="my-2" />
            <AuthForm />
          </SidebarFooter>
        </>
      )}
      <SidebarRail />
    </Sidebar>
  );
};
