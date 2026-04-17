import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: "default" | "coral" | "navy" | "panel";
}

export function Card({ className, hover = false, variant = "default", ...props }: CardProps) {
  const variants = {
    default: "bg-white border-2 border-navy",
    coral: "bg-white border-2 border-coral",
    navy: "bg-navy text-white border-2 border-navy",
    panel: "bg-paper border-2 border-navy screen-tone",
  };

  const shadows = {
    default: "shadow-[4px_4px_0px_#0D1B2A]",
    coral: "shadow-[4px_4px_0px_#E8724A]",
    navy: "shadow-[4px_4px_0px_rgba(13,27,42,0.3)]",
    panel: "shadow-[4px_4px_0px_#0D1B2A]",
  };

  return (
    <div
      className={cn(
        "rounded-card p-5 transition-all duration-150",
        variants[variant],
        shadows[variant],
        hover && "cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0D1B2A]",
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
  return <h3 className={cn("text-sm font-black uppercase tracking-wider text-navy", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}
