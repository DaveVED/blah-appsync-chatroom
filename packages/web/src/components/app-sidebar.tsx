import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
  import { Button } from "@/components/ui/button"
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Button 
            variant="outline" 
            className="w-full transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Login
          </Button>
        </SidebarFooter>
      </Sidebar>
    )
  }
  
  