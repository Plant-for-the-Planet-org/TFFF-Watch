import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function ResponsiveContainer({
  children,
  cn = "",
}: {
  children: ReactNode;
  cn?: string;
}) {
  return <div className={twMerge("", cn)}>{children}</div>;
}
