import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "orange" | "red" | "chakra" | "gray";
}

export function Badge({ className, variant = "orange", ...props }: BadgeProps) {
  const variants = {
    orange: "bg-orange/20 text-orange border border-orange/30",
    red: "bg-red/20 text-red-light border border-red/30",
    chakra: "bg-chakra/20 text-chakra border border-chakra/30",
    gray: "bg-white/5 text-white-dim border border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-black uppercase tracking-widest",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
