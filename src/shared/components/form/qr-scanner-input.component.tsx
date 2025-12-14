"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { QrCode, RefreshCcw } from "lucide-react";
import { Input } from "@/src/shared/components/ui/input";
import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";

type QrScannerInputProps = ComponentProps<typeof Input> & {
  /** Minimum characters to trigger the scan flash animation */
  minScanLength?: number;
  onClear?: () => void;
};

const QrScannerInput = forwardRef<HTMLInputElement, QrScannerInputProps>(function QrScannerInput(
{
  className,
  value,
  onChange,
  minScanLength = 4,
  onClear = ()=> {},
  ...props
},
ref
) {
  const [flash, setFlash] = useState(false);
  const [focused, setFocused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const assignRef = useCallback((instance: HTMLInputElement | null) => {
    inputRef.current = instance;

    if (typeof ref === "function") {
      ref(instance);
    } else if (ref) {
      ref.current = instance;
    }
  }, [ref]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const triggerFlash = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setFlash(true);
    timerRef.current = window.setTimeout(() => setFlash(false), 220);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);

    if (event.target.value.length >= minScanLength) {
      triggerFlash();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    props.onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    props.onBlur?.(event);
  };
  const clearAndFocus = () => {
    const target = inputRef.current;
    if (!target) return;

    target.value = "";
    const syntheticEvent = {
      target,
      currentTarget: target,
    } as React.ChangeEvent<HTMLInputElement>;

    onChange?.(syntheticEvent);
    target.focus();
    onClear();
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border bg-card px-4 py-2 shadow-sm transition-colors",
        focused && "border-primary ring-2 ring-primary/50 animate-pulse",
        flash && "ring-2 ring-green-400/70",
        className
      )}
    >
      <div className="flex h-10 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <QrCode className="h-6 w-6" />
      </div>
      
      <Input
        ref={assignRef}
        {...props}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "border-0 bg-transparent px-0 text-lg font-medium tracking-wide focus-visible:ring-0",
          props.readOnly && "text-muted-foreground"
        )}
      />
      <div>
        <Button type="button" onClick={()=>{
          clearAndFocus()
        }}>
          <RefreshCcw/>
        </Button>
      </div>
    </div>
  );
});

export default QrScannerInput;
