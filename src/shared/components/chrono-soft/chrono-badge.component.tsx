import { ComponentProps } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/src/lib/utils";

export type ChronoBadgeProps = ComponentProps<typeof Badge> & {
	tone?: "default" | "soft" | "outline";
};

export function ChronoBadge({ className, tone = "default", ...props }: ChronoBadgeProps) {
	return (
		<Badge
			className={cn(
				"chrono-badge",
				tone === "soft" && "border-primary/20 bg-primary/5 text-primary",
				tone === "outline" && "border-border/70 bg-background/80 text-foreground",
				className
			)}
			{...props}
		/>
	);
}
