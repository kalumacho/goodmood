import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  accent?: "coral" | "sage" | "navy";
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  accent = "coral",
  children,
  className,
}: PageHeaderProps) {
  const accentClasses = {
    coral: "from-coral/10 via-transparent text-coral",
    sage: "from-sage/15 via-transparent text-sage-dark",
    navy: "from-navy/10 via-transparent text-navy",
  };
  const badgeClasses = {
    coral: "bg-coral/10 text-coral",
    sage: "bg-sage/15 text-sage-dark",
    navy: "bg-navy/10 text-navy",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card-lg bg-white border border-navy/5 p-6 md:p-7 mb-6 flex items-center justify-between gap-4 flex-wrap",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br pointer-events-none opacity-80",
          accentClasses[accent]
        )}
      />
      <div className="relative flex items-center gap-4">
        {Icon && (
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", badgeClasses[accent])}>
            <Icon size={26} />
          </div>
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-navy leading-tight">{title}</h1>
          {subtitle && <p className="text-navy/60 mt-1 text-sm md:text-base">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="relative">{children}</div>}
    </div>
  );
}
