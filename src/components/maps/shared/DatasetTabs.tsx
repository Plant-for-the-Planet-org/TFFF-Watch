"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { api, urls } from "@/utils/axios-helper";
import { useWorldMapStore } from "@/stores/mapStore";
import { TFFFData } from "./types";
import { DatasetType } from "./types";

interface DatasetTabsProps {
  tabsClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  disabled?: boolean;
  defaultDataset?: DatasetType;
}

export default function DatasetTabs({
  tabsClassName,
  activeTabClassName,
  inactiveTabClassName,
  disabled = false,
  defaultDataset = "JRC",
}: DatasetTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setForestData, setIsLoading, setSelectedDataset, forestData } =
    useWorldMapStore();

  // Get current dataset from URL or use default
  const selectedDataset =
    (searchParams.get("dataset") as DatasetType) || defaultDataset;

  // Fetch data for a specific dataset
  const fetchDatasetData = useCallback(
    async (dataset: DatasetType) => {
      // Check if we already have data for this dataset
      if (forestData[dataset].length > 0) {
        return;
      }

      try {
        setIsLoading(true);
        const data = await api<TFFFData[]>({
          url: urls.forestChangeAll,
          method: "GET",
          token: "",
          query: {
            source: dataset === "GFW" ? "GFW" : "JRC",
          },
        });

        setForestData(dataset, data);
      } catch (error) {
        console.error(`Error fetching ${dataset} data:`, error);
      } finally {
        setIsLoading(false);
      }
    },
    [forestData, setForestData, setIsLoading]
  );

  // Update store when URL dataset changes
  useEffect(() => {
    setSelectedDataset(selectedDataset);
    fetchDatasetData(selectedDataset);
  }, [selectedDataset, setSelectedDataset, fetchDatasetData]);
  const datasets: { key: DatasetType; label: string; description: string }[] = [
    {
      key: "JRC",
      label: "Standard Estimate (JRC)",
      description: "Joint Research Centre data",
    },
    {
      key: "GFW",
      label: "Conservative Estimate (GFW)",
      description: "Global Forest Watch data",
    },
  ];

  const baseTabClasses =
    "px-4 py-2 typo-p font-medium rounded-lg transition-colors duration-200 cursor-pointer";
  const defaultActiveClasses = "bg-white text-[#333333] shadow-sm";
  const defaultInactiveClasses =
    "bg-transparent text-[#828282] hover:bg-[#E4F6EB]/50";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  const handleTabClick = useCallback(
    (dataset: DatasetType) => {
      if (!disabled) {
        // Fetch data for the new dataset if we don't have it
        fetchDatasetData(dataset);

        const params = new URLSearchParams(searchParams.toString());
        params.set("dataset", dataset);
        router.push(`?${params.toString()}`, { scroll: false });
      }
    },
    [disabled, router, searchParams, fetchDatasetData]
  );

  return (
    <div
      className={twMerge(
        "flex gap-1 p-1 bg-[#E4F6EB] rounded-xl border border-primary-light",
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
