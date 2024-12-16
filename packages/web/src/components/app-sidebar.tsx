import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
  import { LoginForm } from "./login-form"
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter className="p-4">
        <div className="mt-auto p-4">
        <LoginForm isSidebar={true} />
      </div>
        </SidebarFooter>
      </Sidebar>
    )
  }
  
  