"use client";

import { useForestCoverChangeData } from "@/utils/store";
import TFFFCard from "../shared/TFFFCard";
import { CountryData, DatasetType } from "../shared/types";

interface CountryMapCardProps {
  country: CountryData;
  dataset?: DatasetType;
}

export default function CountryMapCard({
  country,
  dataset = "GFW",
}: CountryMapCardProps) {
  const { forestCoverChangeDataByCountry } = useForestCoverChangeData();

  // Find TFFF data for this country - use the country-specific data like the old component
  const tfffData = forestCoverChangeDataByCountry.find(
    (data) => +data.year === 2024 // Default to 2024 for now
  );

  if (!country || !tfffData) {
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      <TFFFCard
        country={country}
        data={tfffData}
        dataset={dataset}
        variant="standalone"
        showCTA={false}
        size="default"
      />
    </div>
  );
}
