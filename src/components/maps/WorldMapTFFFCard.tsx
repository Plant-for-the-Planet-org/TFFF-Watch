"use client";

import { useForestCoverChangeData, useWorldMap } from "@/utils/store";
import { memo } from "react";
// import { api, urls } from "@/utils/axios-helper";
// import { ForestChangeForCountry } from "@/utils/types";
import { getCountryDetails } from "@/utils/country-helper";
import CountryTFFFCard from "./CountryTFFFCard";

export function WorldMapTFFFCard_() {
  const { isTFFF, year, country, countrySlug, point } = useWorldMap();

  // const forestCoverChangeData = useForestCoverChangeData(
  //   (state) => state.forestCoverChangeData
  // );
  const forestCoverChangeDataByYear = useForestCoverChangeData(
    (state) => state.forestCoverChangeDataByYear
  );

  const details = getCountryDetails({ country: country, slug: countrySlug });
  // console.log({ details });

  if (!country) return null;
  if (!isTFFF) return null;
  return (
    <div
      className="absolute z-50"
      style={{
        left: point?.x,
        top: point?.y,
        transform: `translate(-20%, -120%)`,
      }}
    >
      <CountryTFFFCard
        year={year}
        countrySlug={countrySlug}
        iso2={details.iso2}
        name={details.name}
        flagImgUrl={details.flagImgUrl}
        CTA={true}
        countryData={forestCoverChangeDataByYear.find(
          (el) => el["country-iso2"] === details.iso2
        )}
      />
      {/* <pre>
        {JSON.stringify(
          forestCoverChangeData.find((el) => el.country === country),
          null,
          2
        )}
      </pre> */}
    </div>
  );
}

const WorldMapTFFFCard = memo(WorldMapTFFFCard_);
export default WorldMapTFFFCard;
