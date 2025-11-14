import { ClassNameValue } from "tailwind-merge";

export default function Title({ children, className, type }: { children: React.ReactNode, className?: ClassNameValue, type?: 'h1' | 'h2' | 'h3' } ) {
  const Tag = type || 'h1';
  return <Tag className={`text-2xl font-bold tracking-tight ${className}`}>{children}</Tag>;
}