"use client";

import { useWorldMapStore } from "@/stores/mapStore";
import TFFFCard from "../shared/TFFFCard";
import { CountryData, DatasetType } from "../shared/types";

interface CountryMapCardProps {
  country: CountryData;
  dataset?: DatasetType;
}

export default function CountryMapCard({
  country,
  dataset = "JRC",
}: CountryMapCardProps) {
  const { forestData, selectedDataset, selectedYear } = useWorldMapStore();

  // Use the dataset from props or fall back to store's selected dataset
  const activeDataset = dataset || selectedDataset;

  // Find TFFF data for this country using dataset-specific data, filtered by year
  const tfffData = forestData[activeDataset]?.find(
    (data) =>
      data["country-iso2"] === country.iso2 &&
      String(data.year) === String(selectedYear)
  );

  if (!country || !tfffData) {
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      <TFFFCard
        country={country}
        data={tfffData}
        dataset={activeDataset}
        variant="standalone"
        showCTA={false}
        size="default"
      />
    </div>
  );
}
