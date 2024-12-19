import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

export interface RootRouterContext {
  blah: string;
}

export const rootRoute = createRootRouteWithContext<RootRouterContext>()({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <Outlet />
    </SidebarProvider>
  ),
});
