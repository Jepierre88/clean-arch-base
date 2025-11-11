"use client";

import { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function YesNoFormComponent({
  yesText = "Sí",
  noText = "No",
  onYes,
  onNo,
  requiresReloadOnYes = false,
  isLoading,
}: {
  yesText?: string;
  noText?: string;
  onYes?: () => void | Promise<void>;
  onNo?: () => void | Promise<void>;
  isLoading?: boolean;
  requiresReloadOnYes?: boolean;
}) {
  const [pending, setPending] = useState(false);
  const {refresh} = useRouter()

  const handleYes = useCallback(async () => {
    if (!onYes) return;
    const maybePromise = onYes();
    if (
      maybePromise &&
      typeof (maybePromise as Promise<void>).then === "function"
    ) {
      try {
        setPending(true);
        await (maybePromise as Promise<void>);
      } finally {
        setPending(false);
        if(requiresReloadOnYes){
          refresh()
        }
      }
    }
  }, [onYes, refresh, requiresReloadOnYes]);

  const handleNo = useCallback(async () => {
    if (!onNo) return;
    const maybePromise = onNo();
    if (
      maybePromise &&
      typeof (maybePromise as Promise<void>).then === "function"
    ) {
      try {
        setPending(true);
        await (maybePromise as Promise<void>);
      } finally {
        setPending(false);
      }
    }
  }, [onNo]);

  return (
    <form>
      <div className="flex items-center justify-end gap-2 mt-4">
        <Button
          type="button"
          className="flex-1"
          onClick={handleYes}
          disabled={pending || Boolean(isLoading)}
          isLoading={isLoading}
          icon={<Check />}
        >
          {yesText}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={handleNo}
          icon={<X/>}
          disabled={pending || Boolean(isLoading)}
        >
          {noText}
        </Button>
      </div>
    </form>
  );
}
