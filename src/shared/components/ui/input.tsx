import * as React from "react"

import { cn } from "@/src/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-lg border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-colors",
        "placeholder:text-muted-foreground selection:bg-primary/10 selection:text-foreground",
        "focus-visible:outline-none focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/30",
        "disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "file:inline-flex file:h-8 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:text-xs file:font-semibold file:uppercase file:text-primary",
        className
      )}
      {...props}
    />
  )
}

export { Input }
