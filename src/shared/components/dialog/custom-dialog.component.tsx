"use client";

import { useEffect } from "react";
import { UseDialogContext } from "../../context/dialog.context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function CustomDialog() {
  const { isOpen, title, renderContent, renderFooter, description, setIsOpen } =
    UseDialogContext();
  useEffect(() => {
    console.log("isOpen", isOpen);
    console.log("title", title);
  }, [isOpen, title]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
