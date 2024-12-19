import * as React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createRoute,
} from "@tanstack/react-router";

import "@/index.css";
import { Home } from "@/routes/home";
import { rootRoute } from "@/routes/__root";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({
  routeTree,
  context: { blah: "-1" },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
