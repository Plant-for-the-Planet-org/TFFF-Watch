"use client";

import { twMerge } from "tailwind-merge";
import { DatasetTabsProps, DatasetType } from "./types";

export default function DatasetTabs({
  selectedDataset,
  onDatasetChange,
  tabsClassName,
  activeTabClassName,
  inactiveTabClassName,
  disabled = false,
}: DatasetTabsProps) {
  const datasets: { key: DatasetType; label: string; description: string }[] = [
    { key: "GFW", label: "GFW", description: "Global Forest Watch data" },
    { key: "JRC", label: "JRC", description: "Joint Research Centre data" },
  ];

  const baseTabClasses =
    "px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer";
  const defaultActiveClasses = "bg-white text-primary shadow-sm";
  const defaultInactiveClasses =
    "bg-transparent text-primary-dark hover:bg-white/50";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  const handleTabClick = (dataset: DatasetType) => {
    if (!disabled) {
      onDatasetChange(dataset);
    }
  };

  return (
    <div
      className={twMerge(
        "flex gap-1 p-1 bg-primary-light/50 rounded-xl border border-primary-light",
        tabsClassName
      )}
    >
      {datasets.map(({ key, label, description }) => {
        const isActive = selectedDataset === key;

        return (
          <button
            key={key}
            onClick={() => handleTabClick(key)}
            disabled={disabled}
            title={description}
            className={twMerge(
              baseTabClasses,
              isActive
                ? twMerge(defaultActiveClasses, activeTabClassName)
                : twMerge(defaultInactiveClasses, inactiveTabClassName),
              disabled && disabledClasses
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
