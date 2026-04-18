import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: "default" | "bordered" | "flat" | "dark";
}

export function Card({ className, hover = false, variant = "default", ...props }: CardProps) {
  const variants = {
    default: "bg-white shadow-card",
    bordered: "bg-white border border-navy/8",
    flat: "bg-cream",
    dark: "bg-navy text-white shadow-card",
  };
  return (
    <div
      className={cn(
        "rounded-card p-6 transition-all duration-200",
        variants[variant],
        hover && "hover:shadow-card-hover hover:-translate-y-1 cursor-pointer group",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-bold text-navy", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}
