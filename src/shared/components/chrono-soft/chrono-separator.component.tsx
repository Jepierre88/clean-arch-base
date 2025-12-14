import { ComponentProps } from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/src/lib/utils";

export type ChronoSeparatorProps = ComponentProps<typeof Separator> & {
  muted?: boolean;
};

export function ChronoSeparator({ className, muted = false, ...props }: ChronoSeparatorProps) {
  return (
    <Separator
      className={cn(
        "chrono-separator",
        muted ? "bg-border/40" : "bg-border",
        className
      )}
      {...props}
    />
  );
}
