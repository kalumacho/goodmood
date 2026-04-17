import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "sage" | "coral" | "navy" | "gray";
}

export function Badge({ className, variant = "sage", ...props }: BadgeProps) {
  const variants = {
    sage: "bg-sage/15 text-sage-dark",
    coral: "bg-coral/15 text-coral-dark",
    navy: "bg-navy/10 text-navy",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
