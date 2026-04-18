"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-card transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-coral/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
      primary:
        "bg-coral text-white hover:bg-coral-dark shadow-[0_6px_20px_-4px_rgba(232,114,74,0.45)] hover:shadow-[0_10px_30px_-4px_rgba(232,114,74,0.55)] hover:-translate-y-0.5",
      secondary:
        "bg-sage text-white hover:bg-sage-dark shadow-[0_6px_20px_-4px_rgba(139,175,139,0.45)] hover:shadow-[0_10px_30px_-4px_rgba(139,175,139,0.55)] hover:-translate-y-0.5",
      outline:
        "border-2 border-coral text-coral hover:bg-coral hover:text-white",
      ghost: "text-navy hover:bg-navy/5",
      dark: "bg-navy text-white hover:bg-navy-50 shadow-md hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
