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
    const base = "relative inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden";

    const variants = {
      primary: "bg-orange text-void hover:bg-orange-light shadow-orange hover:shadow-[0_0_40px_rgba(255,107,0,0.7)] border border-orange/50",
      secondary: "bg-chakra text-void hover:bg-chakra-light shadow-chakra border border-chakra/50",
      outline: "border border-orange/50 text-orange hover:bg-orange/10 hover:border-orange hover:glow-orange",
      ghost: "text-white-dim hover:text-white hover:bg-white/5",
      danger: "bg-red text-white hover:bg-red-light border border-red/50",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs rounded",
      md: "px-6 py-3 text-sm rounded",
      lg: "px-8 py-4 text-base rounded",
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
        {/* Shine effect */}
        <span className="absolute inset-0 overflow-hidden rounded">
          <span className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
