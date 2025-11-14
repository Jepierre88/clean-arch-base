"use client";

import { forwardRef, useEffect, useRef, useState, type ComponentProps } from "react";
import { QrCode } from "lucide-react";
import { Input } from "@/src/shared/components/ui/input";
import { cn } from "@/src/lib/utils";

type QrScannerInputProps = ComponentProps<typeof Input> & {
  /** Minimum characters to trigger the scan flash animation */
  minScanLength?: number;
};

const QrScannerInput = forwardRef<HTMLInputElement, QrScannerInputProps>(function QrScannerInput(
{
  className,
  value,
  onChange,
  minScanLength = 4,
  ...props
},
ref
) {
  const [flash, setFlash] = useState(false);
  const timerRef = useRef<number | null>(null);

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

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border bg-card px-4 py-3 shadow-sm transition-colors",
        flash && "ring-2 ring-green-400/70",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <QrCode className="h-6 w-6" />
      </div>

      <Input
        ref={ref}
        {...props}
        value={value}
        onChange={handleChange}
        className={cn(
          "border-0 bg-transparent px-0 text-lg font-medium tracking-wide focus-visible:ring-0",
          props.readOnly && "text-muted-foreground"
        )}
      />
    </div>
  );
});

export default QrScannerInput;
