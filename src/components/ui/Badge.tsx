import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "coral" | "navy" | "sage" | "gray" | "orange" | "red" | "chakra";
}

export function Badge({ className, variant = "coral", ...props }: BadgeProps) {
  const variants = {
    coral: "bg-coral text-white border-2 border-navy shadow-[2px_2px_0px_#0D1B2A]",
    orange: "bg-coral text-white border-2 border-navy shadow-[2px_2px_0px_#0D1B2A]",
    navy: "bg-navy text-white border-2 border-navy",
    sage: "bg-sage text-white border-2 border-navy shadow-[2px_2px_0px_#0D1B2A]",
    chakra: "bg-sage text-white border-2 border-navy shadow-[2px_2px_0px_#0D1B2A]",
    red: "bg-red-500 text-white border-2 border-navy shadow-[2px_2px_0px_#0D1B2A]",
    gray: "bg-navy/10 text-navy border-2 border-navy/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-black uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
