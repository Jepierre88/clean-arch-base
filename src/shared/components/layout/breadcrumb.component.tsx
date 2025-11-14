'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/shared/components/ui/breadcrumb";

type Props = {
  rootHref?: string;
  rootLabel?: string;
  /** Optional mapping to override segment labels, e.g. { products: 'Productos' } */
  segmentLabels?: Record<string, string>;
  /** Hide the root crumb */
  hideRoot?: boolean;
  /** Optional base path to strip from the URL (e.g., "/admin") */
  basePath?: string;
};

function toTitle(segment: string) {
  const text = decodeURIComponent(segment.replace(/-/g, " "));
  return text.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BreadcrumbComponent({
  rootHref = "/",
  rootLabel = "Inicio",
  segmentLabels,
  hideRoot,
  basePath,
}: Props) {
  const fullPath = usePathname() || "/";
  let pathname = fullPath;
  if (basePath && pathname.startsWith(basePath)) {
    const trimmed = pathname.slice(basePath.length) || "/";
    pathname = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  }
  const parts = pathname.split("/").filter(Boolean);

  // Build cumulative hrefs for each segment
  const crumbs = parts.map((seg, idx) => {
    const href = "/" + parts.slice(0, idx + 1).join("/");
    const label = segmentLabels?.[seg] ?? toTitle(seg);
    const isLast = idx === parts.length - 1;
    return { href, label, isLast };
  });

  // If at root, show only root crumb (unless hidden)
  const showRootOnly = crumbs.length === 0;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {!hideRoot && (
          <BreadcrumbItem>
            {showRootOnly ? (
              <BreadcrumbPage>{rootLabel}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={rootHref}>{rootLabel}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        )}

        {!hideRoot && crumbs.length > 0 && <BreadcrumbSeparator />}

        {crumbs.map(({ href, label, isLast }) => (
          <React.Fragment key={href}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
