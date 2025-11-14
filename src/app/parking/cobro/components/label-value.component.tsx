"use client";

import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

const sizeConfig = {
    regular: {
        padding: "px-5 py-4",
        value: "text-2xl",
        icon: "h-10 w-10",
        label: "text-xs",
        helper: "text-xs",
    },
    compact: {
        padding: "px-4 py-3",
        value: "text-xl",
        icon: "h-9 w-9",
        label: "text-[11px]",
        helper: "text-[11px]",
    },
    mini: {
        padding: "px-3 py-2",
        value: "text-lg",
        icon: "h-8 w-8",
        label: "text-[10px]",
        helper: "text-[10px]",
    },
} as const;

interface LabelValueProps {
    label: string;
    value: ReactNode;
    helper?: string;
    icon?: ReactNode;
    accent?: boolean;
    size?: keyof typeof sizeConfig;
}

export default function LabelValueComponent({
    label,
    value,
    helper,
    icon,
    accent,
    size = "compact",
}: LabelValueProps) {
    const config = sizeConfig[size];

    return (
        <div
            className={cn(
                "rounded-2xl border bg-card/70 shadow-sm",
                config.padding,
                "transition-all duration-200",
                accent && "border-primary/40 bg-primary/5 shadow-primary/10"
            )}
        >
            <div className="flex items-center gap-3">
                {icon && (
                    <span
                        className={cn(
                            "flex items-center justify-center rounded-xl bg-background text-primary shadow-inner",
                            config.icon
                        )}
                    >
                        {icon}
                    </span>
                )}

                <div className="flex flex-col">
                    <span
                        className={cn(
                            "font-semibold uppercase tracking-[0.2em] text-muted-foreground",
                            config.label
                        )}
                    >
                        {label}
                    </span>
                    {helper && (
                        <span className={cn(config.helper, "text-muted-foreground/80")}>{helper}</span>
                    )}
                </div>
            </div>

            <div className={cn("mt-3 font-semibold leading-tight text-foreground", config.value)}>
                {value}
            </div>
        </div>
    );
}