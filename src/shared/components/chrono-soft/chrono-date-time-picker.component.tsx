"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import ChronoButton from "./chrono-button.component";
import { cn } from "@/src/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export type ChronoDateTimePickerProps = {
  date?: Date;
  setDate: (date: Date) => void;
};

export function ChronoDateTimePicker({ date, setDate }: ChronoDateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = React.useMemo(() => Array.from({ length: 12 }, (_, index) => index + 1), []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute" | "ampm", value: string) => {
    if (!date) return;

    const nextDate = new Date(date);

    if (type === "hour") {
      nextDate.setHours((parseInt(value, 10) % 12) + (nextDate.getHours() >= 12 ? 12 : 0));
    } else if (type === "minute") {
      nextDate.setMinutes(parseInt(value, 10));
    } else {
      const currentHours = nextDate.getHours();
      if (value === "PM" && currentHours < 12) {
        nextDate.setHours(currentHours + 12);
      } else if (value === "AM" && currentHours >= 12) {
        nextDate.setHours(currentHours - 12);
      }
    }

    setDate(nextDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ChronoButton
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MM/dd/yyyy hh:mm aa") : <span>MM/DD/YYYY hh:mm aa</span>}
        </ChronoButton>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} />
          <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex p-2 sm:flex-col">
                {[...hours].reverse().map((hour) => (
                  <ChronoButton
                    key={hour}
                    size="icon"
                    variant={date && date.getHours() % 12 === hour % 12 ? "default" : "ghost"}
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </ChronoButton>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex p-2 sm:flex-col">
                {Array.from({ length: 12 }, (_, index) => index * 5).map((minute) => (
                  <ChronoButton
                    key={minute}
                    size="icon"
                    variant={date && date.getMinutes() === minute ? "default" : "ghost"}
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("minute", minute.toString())}
                  >
                    {minute}
                  </ChronoButton>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea>
              <div className="flex p-2 sm:flex-col">
                {["AM", "PM"].map((ampm) => (
                  <ChronoButton
                    key={ampm}
                    size="icon"
                    variant={
                      date && ((ampm === "AM" && date.getHours() < 12) || (ampm === "PM" && date.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </ChronoButton>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
