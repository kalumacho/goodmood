"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base = "relative inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-150 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed active:translate-y-0.5";

    const variants = {
      primary: "bg-coral text-white border-2 border-navy shadow-[3px_3px_0px_#0D1B2A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#0D1B2A] hover:bg-coral-light active:shadow-[1px_1px_0px_#0D1B2A]",
      secondary: "bg-navy text-white border-2 border-navy shadow-[3px_3px_0px_rgba(13,27,42,0.3)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(13,27,42,0.3)]",
      outline: "bg-white text-coral border-2 border-coral shadow-[3px_3px_0px_#E8724A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#E8724A] hover:bg-coral-50",
      ghost: "bg-transparent text-navy/60 hover:text-navy hover:bg-navy/5 border-2 border-transparent",
      danger: "bg-red-500 text-white border-2 border-red-700 shadow-[3px_3px_0px_#991b1b] hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs rounded-lg",
      md: "px-6 py-3 text-sm rounded-xl",
      lg: "px-8 py-4 text-base rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
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
