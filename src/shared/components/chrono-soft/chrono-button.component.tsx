import { ComponentProps, ReactNode } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/src/lib/utils";

export type ChronoButtonProps = ComponentProps<typeof Button> & {
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
};

export { buttonVariants };

export default function ChronoButton({
    children,
    loading,
    icon,
    iconPosition = "left",
    disabled,
    asChild,
    ...buttonProps
}: ChronoButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <Button {...buttonProps} asChild={asChild} disabled={isDisabled}>
            {asChild ? (
                children
            ) : (
                <>
                    {icon && iconPosition === "left" && (
                       icon
                    )}
                    {children}
                    {icon && iconPosition === "right" && (
                       icon
                    )}
                </>
            )}
        </Button>
    );
}