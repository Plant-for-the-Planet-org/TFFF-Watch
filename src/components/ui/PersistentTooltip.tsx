"use client";

import { ReactNode, useState, useRef } from "react";

interface PersistentTooltipProps {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
  delay?: number;
}

export default function PersistentTooltip({
  trigger,
  content,
  className = "",
  delay = 100,
}: PersistentTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, delay);
  };

  return (
    <div className="relative">
      {/* Trigger element */}
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {/* Tooltip content */}
      {isVisible && (
        <div
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          className={`absolute z-50 top-full mt-2 right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 transition-opacity duration-200 ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
