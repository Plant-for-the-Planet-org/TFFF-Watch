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
  } = useWorldMapStore();

  const tfffData = useMemo(() => {
    if (!selectedCountry || !forestData[selectedDataset].length) return null;

    return (
      forestData[selectedDataset].find(
        (data) => data["country-iso2"] === selectedCountry.iso2
      ) || null
    );
  }, [selectedCountry, forestData, selectedDataset]);

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
