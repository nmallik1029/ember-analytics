import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-3xl border border-white/40 bg-white/70 p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.5)] backdrop-blur",
      className
    )}
    {...props}
  />
);
