import { twMerge } from "tailwind-merge";

export default function Br({ cn = "" }: { cn?: string }) {
  return <div className={twMerge("block h-3 md:h-4 xl:h-5", cn)} />;
}
