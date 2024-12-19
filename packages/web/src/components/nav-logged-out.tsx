import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { AuthForm } from "@/components/auth-form";

export const NavLoggedOut = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col items-center space-y-4 w-full max-w-[250px]">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5 mx-auto" />
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="border-b border-dotted border-muted-foreground italic cursor-pointer hover:text-black transition-colors">
              Login/Signup
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[400px] p-0"
            align="center"
            sideOffset={4}
          >
            <AuthForm />
          </DropdownMenuContent>
        </DropdownMenu>{" "}
        to get started
      </p>
    </React.Fragment>
  );
};
