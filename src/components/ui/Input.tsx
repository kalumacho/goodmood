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
          <label htmlFor={id} className="block text-xs font-black uppercase tracking-widest text-white-dim mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded bg-shadow-light border border-orange/20 text-white placeholder:text-white/20 focus:outline-none focus:border-orange focus:shadow-orange transition-all text-sm",
            error && "border-red/50 focus:border-red",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-light font-bold uppercase tracking-wider">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
