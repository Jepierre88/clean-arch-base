import { ComponentProps } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../ui/breadcrumb";
import { cn } from "@/src/lib/utils";

export function ChronoBreadcrumb(props: ComponentProps<typeof Breadcrumb>) {
  return <Breadcrumb {...props} />;
}

export function ChronoBreadcrumbList({ className, ...props }: ComponentProps<typeof BreadcrumbList>) {
  return <BreadcrumbList className={cn("chrono-breadcrumb__list", className)} {...props} />;
}

export function ChronoBreadcrumbItem({ className, ...props }: ComponentProps<typeof BreadcrumbItem>) {
  return <BreadcrumbItem className={cn("chrono-breadcrumb__item", className)} {...props} />;
}

export function ChronoBreadcrumbLink({ className, ...props }: ComponentProps<typeof BreadcrumbLink>) {
  return <BreadcrumbLink className={cn("chrono-breadcrumb__link", className)} {...props} />;
}

export function ChronoBreadcrumbPage({ className, ...props }: ComponentProps<typeof BreadcrumbPage>) {
  return <BreadcrumbPage className={cn("chrono-breadcrumb__page", className)} {...props} />;
}

export function ChronoBreadcrumbSeparator(props: ComponentProps<typeof BreadcrumbSeparator>) {
  return <BreadcrumbSeparator {...props} />;
}

export function ChronoBreadcrumbEllipsis(props: ComponentProps<typeof BreadcrumbEllipsis>) {
  return <BreadcrumbEllipsis {...props} />;
}
