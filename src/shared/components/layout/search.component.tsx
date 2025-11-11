"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { ENVIRONMENT } from "../../constants/environment";

export default function SearchComponent() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { isMobile } = useSidebar();

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  const [debouncedSearchTerm] = useDebounce(searchTerm, ENVIRONMENT.DEBOUNCE_TIME);

  useEffect(() => {
    const setUrlParam = (value: string) => {
      const currentUrl = pathname + window.location.search;
      const url = new URL(window.location.href);
      const normalizedValue = value.trim();

      if (!normalizedValue) {
        if (!url.searchParams.has("search")) {
          return;
        }
        url.searchParams.delete("search");
      } else {
        const currentSearch = url.searchParams.get("search") ?? "";
        if (currentSearch === normalizedValue) {
          return;
        }
        url.searchParams.set("search", normalizedValue);
        url.searchParams.delete("page");
      }

      const nextUrl = url.pathname + url.search;
      if (nextUrl !== currentUrl) {
        replace(nextUrl);
      }
    };

    setUrlParam(debouncedSearchTerm);
  }, [debouncedSearchTerm, pathname, replace]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (isMobile) {
    return (
      <div className="flex items-center justify-end gap-2 w-full">
        {!isOpen ? (
          <Button
            variant="outline"
            aria-label="Abrir búsqueda"
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md hover:bg-accent text-muted-foreground"
          >
            <Search className="w-5 h-5" />
          </Button>
        ) : (
          <div className="flex items-center gap-2 w-full">
            <Search className="w-4 h-4 ml-2 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full"
            />
            <button
              type="button"
              aria-label="Cerrar búsqueda"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-accent text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <Search className="w-4 h-4 ml-3 text-muted-foreground" />
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar..."
        className="max-w-sm"
      />
    </div>
  );
}
