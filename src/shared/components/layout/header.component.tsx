"use client";

import { useCallback, useEffect, useState } from "react";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import BreadcrumbComponent from "./breadcrumb.component";
import SearchComponent from "./search.component";
import { Button } from "../ui/button";
import { motion, MotionProps } from "framer-motion";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeaderComponent() {
  const { open, isMobile } = useSidebar();
  return (
    <header
      className="fixed z-10 top-0 transition-all duration-200 ease-linear"
      style={{
        left:
          open && !isMobile
            ? "var(--sidebar-width)"
            : isMobile
            ? "0px"
            : "var(--sidebar-width-icon)",
        width:
          open && !isMobile
            ? "calc(100% - var(--sidebar-width))"
            : isMobile
            ? "100%"
            : "calc(100% - var(--sidebar-width-icon))",
      }}
    >
      <div
        className={`flex items-center justify-between transition-colors duration-200 ease-linear hover:bg-muted ${
          isMobile ? "bg-muted" : "bg-muted/50"
        } px-4 py-1 rounded h-14`}
      >
        <DateRangeComponent />
        <div className="flex items-center gap-3">
          <SidebarTrigger className="shrink-0" />
          <BreadcrumbComponent hideRoot />
        </div>
        <SearchComponent />
      </div>
    </header>
  );
}

function DateRangeComponent() {

  const {replace} = useRouter()

  const [currentDate, setCurrentdate] = useState<Date | null>(null);
  const [currentMotion, setCurrentMotion] = useState<"left" | "right">("right");

  const operateMonth = (offset: number) => {
    setCurrentMotion(offset > 0 ? "right" : "left");
    setCurrentdate((prevDate) => {
      const date = prevDate ? new Date(prevDate) : new Date();
      date.setMonth(date.getMonth() + offset);
      return date;
    });
  };

  const operateDay = (offset: number) => {
    setCurrentdate((prevDate) => {
      const date = prevDate ? new Date(prevDate) : new Date();
      date.setDate(date.getDate() + offset);
      return date;
    });
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
        <ArrowBigLeft />
      </Button>
      <div className="min-w-[300px] flex justify-center relative items-center h-6 overflow-hidden">
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
      </div>
      <Button
        variant={"ghost"}
        onClick={() => {
          operateDay(1);
        }}
      >
        <ArrowBigRight />
      </Button>
    </div>
  );
}
