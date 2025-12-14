import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { cn } from "@/src/lib/utils";

export const ChronoSheet = Sheet;
export const ChronoSheetTrigger = SheetTrigger;
export const ChronoSheetClose = SheetClose;

export function ChronoSheetContent({ className, ...props }: React.ComponentProps<typeof SheetContent>) {
  return (
    <SheetContent
      className={cn("chrono-sheet__content border-l border-border/40 bg-background/95 backdrop-blur", className)}
      {...props}
    />
  );
}

export function ChronoSheetHeader({ className, ...props }: React.ComponentProps<typeof SheetHeader>) {
  return <SheetHeader className={cn("chrono-sheet__header", className)} {...props} />;
}

export function ChronoSheetFooter({ className, ...props }: React.ComponentProps<typeof SheetFooter>) {
  return <SheetFooter className={cn("chrono-sheet__footer", className)} {...props} />;
}

export function ChronoSheetTitle({ className, ...props }: React.ComponentProps<typeof SheetTitle>) {
  return <SheetTitle className={cn("chrono-sheet__title", className)} {...props} />;
}

export function ChronoSheetDescription({ className, ...props }: React.ComponentProps<typeof SheetDescription>) {
  return <SheetDescription className={cn("chrono-sheet__description", className)} {...props} />;
}
