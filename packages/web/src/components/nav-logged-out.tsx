import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"

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
            <span className="border-b border-dotted border-muted-foreground">
            Login/Signup
            </span>{" "}
            to get started
        </p>
        </React.Fragment>

    )
}