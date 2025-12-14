import { ClassNameValue } from "tailwind-merge";

export default function EmptyState({
    icon,
    title,
    description,
    className
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: ClassNameValue;
}) {
  return (
    <div className={`col-span-full flex flex-col items-center justify-center py-20 ${className ?? ""}`}>
      {icon}
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
