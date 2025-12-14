import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";
import { cn } from "@/src/lib/utils";

export function ChronoPagination(props: React.ComponentProps<typeof Pagination>) {
  return <Pagination className={cn("chrono-pagination", props.className)} {...props} />;
}

export function ChronoPaginationContent(props: React.ComponentProps<typeof PaginationContent>) {
  return <PaginationContent className={cn("chrono-pagination__content", props.className)} {...props} />;
}

export function ChronoPaginationItem(props: React.ComponentProps<typeof PaginationItem>) {
  return <PaginationItem {...props} />;
}

export function ChronoPaginationLink(props: React.ComponentProps<typeof PaginationLink>) {
  return <PaginationLink {...props} />;
}

export function ChronoPaginationPrevious(props: React.ComponentProps<typeof PaginationPrevious>) {
  return <PaginationPrevious {...props} />;
}

export function ChronoPaginationNext(props: React.ComponentProps<typeof PaginationNext>) {
  return <PaginationNext {...props} />;
}

export function ChronoPaginationEllipsis(props: React.ComponentProps<typeof PaginationEllipsis>) {
  return <PaginationEllipsis {...props} />;
}
