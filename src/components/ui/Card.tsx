import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: "default" | "orange" | "red" | "chakra";
}

export function Card({ className, hover = false, variant = "default", ...props }: CardProps) {
  const variants = {
    default: "bg-shadow border border-orange/10",
    orange: "bg-shadow border border-orange/40",
    red: "bg-shadow border border-red/40",
    chakra: "bg-shadow border border-chakra/40",
  };

  return (
    <div
      className={cn(
        "rounded p-6 transition-all duration-200",
        variants[variant],
        hover && "hover:border-orange/40 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer",
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
  return <h3 className={cn("text-base font-black uppercase tracking-wider text-white", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}
