"use client";

import { useCallback } from "react";

import { UseDialogContext } from "../../context/dialog.context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ChronoCustomDialog() {
  const { isOpen, title, renderContent, renderFooter, description, setIsOpen, closeDialog } =
    UseDialogContext();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setIsOpen(true);
        return;
      }
      closeDialog();
    },
    [closeDialog, setIsOpen],
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        {renderContent}
      </DialogContent>
      <DialogFooter>{renderFooter}</DialogFooter>
    </Dialog>
  );
}
