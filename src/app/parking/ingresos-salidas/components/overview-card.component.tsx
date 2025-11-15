
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/shared/components/ui/card";

interface InOutOverviewCardProps {
  lastRefreshLabel: string;
}

export function InOutOverviewCard({
  lastRefreshLabel,
}: InOutOverviewCardProps) {
  return (
    <Card className="border-border/60 bg-card/90 shadow-sm">
      <CardHeader className="gap-1.5 px-5 pb-3 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
          Resumen
        </p>
        <CardTitle className="text-2xl lg:text-3xl">Ingresos &amp; salidas</CardTitle>
        <CardDescription className="max-w-3xl text-sm">
          Visualiza en un mismo lugar el detalle de cada vehículo, su tarifa aplicada y el estado de ocupación del parqueadero.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-5 pb-3 pt-0 text-xs text-muted-foreground">
        Controla la operación diaria con métricas en vivo y prepara reportes históricos sin salir de este módulo.
      </CardContent>
    </Card>
  );
}
