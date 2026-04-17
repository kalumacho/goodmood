import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-xs font-black uppercase tracking-widest text-navy/60 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-xl border-2 border-navy/20 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:border-coral focus:shadow-[0_0_0_3px_rgba(232,114,74,0.15)] transition-all text-sm font-medium",
            error && "border-red-400 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500 font-bold uppercase tracking-wider">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
