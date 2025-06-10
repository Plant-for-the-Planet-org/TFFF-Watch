"use client";

import { useEffect, useState } from "react";
import { MapCountryClickEvent } from "./WorldMapView";
import { useWorldMap } from "@/utils/store";
import { api, urls } from "@/utils/axios-helper";
import { ForestChangeForCountry } from "@/utils/types";
import CountryTFFFCard from "./CountryTFFFCard";
import { getCountryDetails } from "@/utils/country-helper";

export default function WorldMapTFFFCard() {
  const {
    year,
    country,
    setCountry,
    forestCoverChangeData,
    setForestCoverChangeData,
  } = useWorldMap();

  const [point, setPoint] = useState<maplibregl.MapLayerMouseEvent["point"]>();
  const details = getCountryDetails(country);

  useEffect(() => {
    (async () => {
      try {
        const _results = await api<ForestChangeForCountry[]>({
          url: urls.forestChangeAll,
          method: "GET",
          token: "",
        });
        // console.log(_results);
        setForestCoverChangeData(_results);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    })();
  }, [setForestCoverChangeData]);

  useEffect(() => {
    if (!window) return;
    window.addEventListener(
      "map-country-click",
      (event: CustomEventInit<MapCountryClickEvent>) => {
        const e = event.detail!;
        setCountry(e.country);
        setPoint(e.point);
      }
    );
  }, [setCountry]);

  return (
    <div
      className="absolute"
      style={{
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
