
import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
          variant === "default"
            ? "bg-purple-700 text-white"
            : "border border-purple-700 text-purple-700 bg-white",
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export default Badge;
