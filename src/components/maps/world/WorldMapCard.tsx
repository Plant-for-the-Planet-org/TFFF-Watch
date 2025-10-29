"use client";

import { useWorldMapStore } from "@/stores/mapStore";
import { useMemo } from "react";
import TFFFCard from "../shared/TFFFCard";

export default function WorldMapCard() {
  const { selectedCountry, clickPosition, selectedDataset, forestData } =
    useWorldMapStore();

  const tfffData = useMemo(() => {
    if (!selectedCountry || !forestData[selectedDataset].length) return null;

    return (
      forestData[selectedDataset].find(
        (data) => data["country-iso2"] === selectedCountry.iso2
      ) || null
    );
  }, [selectedCountry, forestData, selectedDataset]);

  if (!selectedCountry || !tfffData || !clickPosition) {
    return null;
  }

  // Calculate position for popup
  const cardStyle = {
    position: "absolute" as const,
    left:
      clickPosition.x > window.innerWidth / 2 ? "auto" : clickPosition.x + 10,
    right:
      clickPosition.x > window.innerWidth / 2
        ? window.innerWidth - clickPosition.x + 10
        : "auto",
    top:
      clickPosition.y > window.innerHeight / 2 ? "auto" : clickPosition.y + 10,
    bottom:
      clickPosition.y > window.innerHeight / 2
        ? window.innerHeight - clickPosition.y + 10
        : "auto",
    zIndex: 50,
  };

  return (
    <div style={cardStyle}>
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
