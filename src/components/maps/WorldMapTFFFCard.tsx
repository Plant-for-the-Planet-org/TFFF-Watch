"use client";

import { useEffect } from "react";
import { MapCountryClickEvent } from "./WorldMapView";
import { useWorldMap } from "@/utils/store";
import { api, urls } from "@/utils/axios-helper";
import { ForestChangeForCountry } from "@/utils/types";

export default function WorldMapTFFFCard() {
  const { year, country, setCountry, setForestCoverChangeData } = useWorldMap();

  useEffect(() => {
    (async () => {
      try {
        const _results = await api<ForestChangeForCountry[]>({
          url: urls.forestChangeAll,
          method: "GET",
          token: "",
        });
        console.log(_results);
        setForestCoverChangeData(_results);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!window) return;
    window.addEventListener(
      "map-country-click",
      (event: CustomEventInit<MapCountryClickEvent>) => {
        const e = event.detail!;
        setCountry(e?.country);
        console.log(country, year, e);
      }
    );
  }, []);

  return <div></div>;
}
