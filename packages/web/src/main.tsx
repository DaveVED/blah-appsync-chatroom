import { StrictMode } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { HomeComponent } from "@/routes/home";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "./components/auth-provider";
import { AppSidebar } from "@/components/app-sidebar";

const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
    </SidebarProvider>
    </AuthProvider>
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
