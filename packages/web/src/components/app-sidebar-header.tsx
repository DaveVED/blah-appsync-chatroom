import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export const  AppSidebarHeader: React.FC = ({ ...props }: React.ComponentProps<typeof SidebarHeader>) => {
  return (
    <SidebarHeader {...props}>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <a href="#">

              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <img
                  src="/blah-icon.jpg"
                  alt="Blah Icon"
                  className="w-full h-full object-cover"
                />              </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Blah</span>
              <span className="">v0.0.0-beta.1</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
  )
}

