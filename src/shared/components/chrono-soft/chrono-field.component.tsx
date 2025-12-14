import { ComponentProps } from "react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "../ui/field";
import { cn } from "@/src/lib/utils";

export type ChronoFieldProps = ComponentProps<typeof Field> & {
  highlight?: boolean;
};

export function ChronoField({ className, highlight = false, ...props }: ChronoFieldProps) {
  return (
    <Field
      className={cn("chrono-field", highlight && "rounded-xl border border-border/60 p-3", className)}
      {...props}
    />
  );
}

export function ChronoFieldLabel({ className, ...props }: ComponentProps<typeof FieldLabel>) {
  return <FieldLabel className={cn("chrono-field__label", className)} {...props} />;
}

export function ChronoFieldDescription({ className, ...props }: ComponentProps<typeof FieldDescription>) {
  return <FieldDescription className={cn("chrono-field__description", className)} {...props} />;
}

export function ChronoFieldError({ className, ...props }: ComponentProps<typeof FieldError>) {
  return <FieldError className={cn("chrono-field__error", className)} {...props} />;
}

export function ChronoFieldGroup({ className, ...props }: ComponentProps<typeof FieldGroup>) {
  return <FieldGroup className={cn("chrono-field__group", className)} {...props} />;
}

export function ChronoFieldLegend({ className, ...props }: ComponentProps<typeof FieldLegend>) {
  return <FieldLegend className={cn("chrono-field__legend", className)} {...props} />;
}

export function ChronoFieldSeparator({ className, ...props }: ComponentProps<typeof FieldSeparator>) {
  return <FieldSeparator className={cn("chrono-field__separator", className)} {...props} />;
}

export function ChronoFieldSet({ className, ...props }: ComponentProps<typeof FieldSet>) {
  return <FieldSet className={cn("chrono-field__set", className)} {...props} />;
}

export function ChronoFieldContent({ className, ...props }: ComponentProps<typeof FieldContent>) {
  return <FieldContent className={cn("chrono-field__content", className)} {...props} />;
}

export function ChronoFieldTitle({ className, ...props }: ComponentProps<typeof FieldTitle>) {
  return <FieldTitle className={cn("chrono-field__title", className)} {...props} />;
}
