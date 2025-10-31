"use client";

import { twMerge } from "tailwind-merge";
import { MapContainerProps } from "./types";

export default function MapContainer({
  children,
  variant,
  wrapperClassName,
  backgroundClassName,
  height,
  padding = "medium",
}: MapContainerProps) {
  const baseClasses = "bg-primary-light outer-rounding";

  const variantClasses = {
    world: "max-h-full",
    country: "h-[90vh] md:h-[85vh] lg:h-[80vh] xl:h-[75vh] min-h-fit",
  };

  const paddingClasses = {
    none: "",
    small: "outer-padding-1",
    medium: "outer-padding-3",
    large: "outer-padding-5",
  };

  const backgroundClasses = backgroundClassName || "bg-primary-light";
  const heightStyle = height
    ? { height: typeof height === "number" ? `${height}px` : height }
    : {};

  return (
    <div
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        backgroundClasses,
        wrapperClassName
      )}
      style={heightStyle}
    >
      {children}
    </div>
  );
}
