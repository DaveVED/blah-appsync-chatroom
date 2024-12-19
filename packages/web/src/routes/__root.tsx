import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/components/auth-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

export interface RootRouterContext {
  blah: string;
}

export const rootRoute = createRootRouteWithContext<RootRouterContext>()({
  component: () => (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <Outlet />
      </SidebarProvider>
    </AuthProvider>
  ),
});
