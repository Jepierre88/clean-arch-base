import { ComponentProps } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "../ui/card";
import { cn } from "@/src/lib/utils";

export type ChronoCardProps = ComponentProps<typeof Card> & {
  elevated?: boolean;
};

export function ChronoCard({ className, ...props }: ChronoCardProps) {
  return (
    <Card
      className={cn(
        "chrono-card",
        className
      )}
      {...props}
    />
  );
}

export function ChronoCardHeader({ className, ...props }: ComponentProps<typeof CardHeader>) {
  return <CardHeader className={cn("chrono-card__header", className)} {...props} />;
}

export function ChronoCardFooter({ className, ...props }: ComponentProps<typeof CardFooter>) {
  return <CardFooter className={cn("chrono-card__footer", className)} {...props} />;
}

export function ChronoCardTitle({ className, ...props }: ComponentProps<typeof CardTitle>) {
  return <CardTitle className={cn("chrono-card__title tracking-tight", className)} {...props} />;
}

export function ChronoCardAction({ className, ...props }: ComponentProps<typeof CardAction>) {
  return <CardAction className={cn("chrono-card__action", className)} {...props} />;
}

export function ChronoCardDescription({ className, ...props }: ComponentProps<typeof CardDescription>) {
  return <CardDescription className={cn("chrono-card__description", className)} {...props} />;
}

export function ChronoCardContent({ className, ...props }: ComponentProps<typeof CardContent>) {
  return <CardContent className={cn("chrono-card__content", className)} {...props} />;
}
