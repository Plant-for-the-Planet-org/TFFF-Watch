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

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const _results = await api<ForestChangeForCountry[]>({
  //         url: urls.forestChangeAll,
  //         method: "GET",
  //         token: "",
  //       });
  //       // console.log(_results);
  //       setForestCoverChangeData(_results);
  //     } catch (error) {
  //       console.error("Error fetching news:", error);
  //     }
  //   })();
  // }, [setForestCoverChangeData]);

  // useEffect(() => {
  //   if (!window) return;
  //   window.addEventListener(
  //     "map-country-click",
  //     (event: CustomEventInit<MapCountryClickEvent>) => {
  //       const e = event.detail!;
  //       setCountry(e.country);
  //       setPoint(e.point);
  //     }
  //   );
  // }, [setCountry]);

  return (
    <div
      className="absolute "
      // className="fixed top-0 left-0  text-4xl z-50"
      style={{
        // left: 0,
        // top: 0,
        left: point?.x,
        top: point?.y,
        transform: `translate(-50%, -100%)`,
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
