import { StrictMode } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { HomeComponent } from "@/routes/home";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Button } from "@/components/ui/button";

const rootRoute = createRootRoute({
  component: () => (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1 flex justify-center">
              <h1 className="text-lg font-semibold text-gray-800">chat.davedennis.dev</h1>
            </div>
            <Button variant="outline" className="transition-colors hover:bg-primary hover:text-primary-foreground">
              Login
            </Button>
          </header>
          <main className="flex-1 overflow-hidden w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeComponent,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

