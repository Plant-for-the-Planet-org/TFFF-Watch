"use client";

import { useForestCoverChangeData, useWorldMap } from "@/utils/store";
import { memo } from "react";
// import { api, urls } from "@/utils/axios-helper";
// import { ForestChangeForCountry } from "@/utils/types";
import { getCountryDetails } from "@/utils/country-helper";
import CountryTFFFCard from "./CountryTFFFCard";

export function WorldMapTFFFCard_() {
  const { year, country, point } = useWorldMap();
  const forestCoverChangeData = useForestCoverChangeData(
    (state) => state.forestCoverChangeData
  );

  // const popup = usePopupStore((state) => state.popup);

  const details = getCountryDetails(country);

  return (
    <div
      className="absolute"
      style={{
        // left: 0,
        // top: 0,
        left: point?.x,
        top: point?.y,
        transform: `translate(-50%, -105%)`,
      }}
    >
      <CountryTFFFCard
        year={year}
        iso2={details.iso2}
        name={details.name}
        flagImgUrl={details.flagImgUrl}
        CTA={true}
        countryData={forestCoverChangeData.find((el) => el.country === country)}
      />
    </div>
  );
}

const WorldMapTFFFCard = memo(WorldMapTFFFCard_);
export default WorldMapTFFFCard;
