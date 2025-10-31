"use client";

import { useWorldMapStore } from "@/stores/mapStore";
import { useMemo } from "react";
import TFFFCard from "../shared/TFFFCard";

export default function WorldMapCard() {
  const {
    selectedCountry,
    clickPosition,
    selectedDataset,
    forestData,
    isLoading,
    selectedYear,
  } = useWorldMapStore();

  const tfffData = useMemo(() => {
    if (!selectedCountry || !forestData[selectedDataset].length) return null;

    // Filter by both country and year (convert both to strings for comparison)
    const data = forestData[selectedDataset].find(
      (data) =>
        data["country-iso2"] === selectedCountry.iso2 &&
        String(data.year) === String(selectedYear)
    );

    // Debug logging
    if (!data) {
      console.log("WorldMapCard: No data found", {
        country: selectedCountry.iso2,
        selectedYear,
        selectedDataset,
        availableData: forestData[selectedDataset].slice(0, 3).map((d) => ({
          country: d["country-iso2"],
          year: d.year,
          yearType: typeof d.year,
        })),
      });
    }

    return data || null;
  }, [selectedCountry, forestData, selectedDataset, selectedYear]);

  if (!selectedCountry || !clickPosition) {
    return null;
  }

  // Show loading state if data is being fetched
  if (isLoading && !tfffData) {
    return (
      <div
        className="absolute z-50"
        style={{
          left: clickPosition.x,
          top: clickPosition.y,
          transform: "translate(-20%, -120%)",
        }}
      >
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!tfffData) {
    return null;
  }

  return (
    <div
      className="absolute z-50"
      style={{
        left: clickPosition.x,
        top: clickPosition.y,
        transform: "translate(-20%, -120%)",
      }}
    >
      <TFFFCard
        country={selectedCountry}
        data={tfffData}
        dataset={selectedDataset}
        variant="popup"
        showCTA={true}
        size="default"
      />
    </div>
  );
}
