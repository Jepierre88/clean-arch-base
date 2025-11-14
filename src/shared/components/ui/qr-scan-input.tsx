import { useState } from "react";
import { Field, FieldError, FieldLabel } from "@/src/shared/components/ui/field";
import { QrCode } from "lucide-react";
import { Input } from "./input";

export function QrScanInput({ field, fieldState }) {
  const [flash, setFlash] = useState(false);

  const onScan = (value) => {
    field.onChange(value);
    if (value?.length > 3) {
      setFlash(true);
      setTimeout(() => setFlash(false), 300);
    }
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel>Leer QR</FieldLabel>
      <div className="flex items-center gap-3">
        <QrCode className="w-6 h-6 text-primary" />
        <Input
          {...field}
          onChange={(e) => onScan(e.target.value)}
          placeholder="Escanea el QR de ingreso"
          className={cn(
            "border-0 border-b-2 rounded-none focus-visible:ring-0 text-lg px-0 bg-transparent",
            flash && "animate-pulse border-b-green-500"
          )}
        />
      </div>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}