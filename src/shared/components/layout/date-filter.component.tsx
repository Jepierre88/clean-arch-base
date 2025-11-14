"use client";

import { MotionProps, motion } from "framer-motion";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

export function DateRangeComponent() {

  const {replace} = useRouter()

  const [currentDate, setCurrentdate] = useState<Date | null>(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get("date");
    if (!dateParam) return null;
    const parsedDate = new Date(dateParam);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  });
  const [currentMotion, setCurrentMotion] = useState<"left" | "right">("right");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const operateDay = (offset: number) => {
    setCurrentdate((prevDate) => {
      const date = prevDate ? new Date(prevDate) : new Date();
      date.setDate(date.getDate() + offset);
      return date;
    });
    setCurrentMotion(offset > 0 ? "right" : "left");
    setIsPickerOpen(false);
  };

  const handleSelectDate = (date?: Date | null) => {
    if (!date) return;
    setCurrentdate((prevDate) => {
      if (prevDate) {
        setCurrentMotion(date > prevDate ? "right" : "left");
      } else {
        setCurrentMotion("right");
      }
      return date;
    });
    setIsPickerOpen(false);
  };

  const updateUrlParams = useCallback((date: Date | null) => {
    const params = new URLSearchParams(window.location.search);
    if (date) {
      params.set("date", date.toISOString().split("T")[0]);
    } else {
      params.delete("date");
    }
    const newUrl =
      window.location.pathname + "?" + params.toString() + window.location.hash;
    replace(newUrl);
  }, [replace]);


  useEffect(() => {
      updateUrlParams(currentDate);
  }, [currentDate, updateUrlParams]);

  const motionFromRight: MotionProps = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
    transition: { duration: 0.25 },
  };

  const motionFromLeft: MotionProps = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
    transition: { duration: 0.25 },
  };

  const motionProps =
    currentMotion === "right" ? motionFromRight : motionFromLeft;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={"ghost"}
        onClick={() => {
          operateDay(-1);
        }}
      >
        <ArrowLeftToLine />
      </Button>
      <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="min-w-[300px] h-9 relative overflow-hidden justify-center z-20"
          >
            <motion.div
              key={currentDate ? currentDate.toDateString() : "today"}
              {...motionProps}
              className="font-medium absolute"
            >
              {currentDate
                ? currentDate.toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : new Date().toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                  })}
            </motion.div>
            <span className="sr-only">Seleccionar fecha</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={currentDate ?? undefined}
            defaultMonth={currentDate ?? new Date()}
            onSelect={(date) => handleSelectDate(date ?? null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        variant={"ghost"}
        onClick={() => {
          operateDay(1);
        }}
      >
        <ArrowRightToLine />
      </Button>
    </div>
  );
}