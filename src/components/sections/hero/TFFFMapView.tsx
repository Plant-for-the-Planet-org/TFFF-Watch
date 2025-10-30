"use client";

import type { Props as CountryMapViewProps } from "@/components/maps/CountryMapView";
import CountryMapView from "@/components/maps/CountryMapView";
import CountryTFFFCard from "@/components/maps/CountryTFFFCard";
import {
  CountryMapLegends,
  LegendForDegradedOrDeforested,
} from "@/components/maps/MapLegends";
import {
  WorldMap,
  CountryMap,
  DatasetTabs,
  MapContainer,
  useWorldMapStore,
  BRAZIL_DEFAULT_COUNTRY,
  initializeBrazilDefault,
} from "@/components/maps";
import CountryMapCard from "@/components/maps/country/CountryMapCard";
import {
  CountryMapHeaderContent,
  WorldMapHeaderContent,
} from "@/components/sections/hero/TFFFMapViewContent";
import Br from "@/components/ui/Br";
import { CountryDetails } from "@/utils/country-helper";
import { env } from "@/utils/env";
import { fetchForestCoverChangeDataV2 } from "@/utils/forestChange.store";
// import { forestChangeData } from "@/utils/forestChange.store";
import { useForestCoverChangeData, useWorldMap } from "@/utils/store";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function TFFFWorldMapView() {
  const { forestCoverChangeData, setForestCoverChangeDataByYear } =
    useForestCoverChangeData();
  const { year } = useWorldMap();

  // New map store integration
  const {
    selectedDataset,
    setSelectedDataset,
    setForestData,
    setSelectedYear,
    selectedCountry,
  } = useWorldMapStore();

  useEffect(() => {
    fetchForestCoverChangeDataV2({});
  }, []);

  useEffect(() => {
    const _yearWise = forestCoverChangeData.filter((el) => el.year == year);
    setForestCoverChangeDataByYear(_yearWise);

    // Update new store with forest data
    setForestData("GFW", _yearWise);
    setSelectedYear(year);
  }, [
    forestCoverChangeData,
    year,
    setForestCoverChangeDataByYear,
    setForestData,
    setSelectedYear,
  ]);

  // Initialize Brazil default selection
  useEffect(() => {
    initializeBrazilDefault(useWorldMapStore.getState());
  }, []);

  return (
    <WorldMapViewContainer>
      <div className="h-full flex flex-col">
        <BetaChip />

        {/* Dataset Tabs */}
        <div className="flex justify-center mb-4">
          <DatasetTabs
            selectedDataset={selectedDataset}
            onDatasetChange={setSelectedDataset}
          />
        </div>

        <Br />
        <div className="relative z-10">
          <div className="bg-primary-light">
            <WorldMapHeaderContent />
          </div>
          <div className="bg-gradient-to-b from-primary-light to-transparent">
            <Br />
            <Br />
          </div>
        </div>

        <div className="grow relative flex flex-col">
          <div className="mx-auto aspect-[2] w-full h-full max-w-full max-h-full md:w-3/4 md:h-3/4 object-contain">
            <WorldMap
              selectedYear={year}
              dataset={selectedDataset}
              defaultSelectedCountry="BR"
              variant="hero"
            />
          </div>
          <div className="md:absolute left-0 bottom-0 min-w-48 max-w-fit mx-auto">
            <Br cn="md:hidden" />
            <LegendForDegradedOrDeforested />
            <Br />
          </div>
          <p className="text-xs text-center flex justify-center items-center gap-2">
            <Image
              width={12}
              height={12}
              src="/assets/cursor.svg"
              alt="Click on a country for more data"
            />
            Click on a country for more data
          </p>
        </div>
      </div>
    </WorldMapViewContainer>
  );
}

type TFFFCountryMapViewProps = CountryDetails & {
  year: string;
  dataset?: "GFW" | "JRC";
};

export function TFFFCountryMapView(props: TFFFCountryMapViewProps) {
  const { push } = useRouter();
  const { country } = useParams();
  const { year } = useWorldMap();

  // Local state for dataset to avoid store loops
  const [selectedDataset, setSelectedDataset] = useState<"GFW" | "JRC">(
    props.dataset || "GFW"
  );

  useEffect(() => {
    if (props.name)
      fetchForestCoverChangeDataV2({ country: props.name, iso2: props.iso2 });
  }, [props.name, props.iso2]);

  // Removed problematic navigation that was causing 404 redirects

  // Convert props to CountryData format
  const countryData = {
    iso2: props.iso2,
    iso3: props.iso3,
    name: props.name,
    slug: country as string,
    flagImgUrl: props.flagImgUrl,
  };

  // Debug logging
  console.log("TFFFCountryMapView Debug:", {
    props,
    countryData,
    selectedDataset,
  });

  return (
    <div>
      <div className="flex justify-center">
        {/* Dataset Tabs */}
        <DatasetTabs
          selectedDataset={selectedDataset}
          onDatasetChange={setSelectedDataset}
        />
      </div>
      <Br />

      <CountryMapViewContainer>
        <div className="h-full flex flex-col">
          <Br />
          <CountryMapHeaderContent year={props.year} />
          <Br />

          <div className="grow grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-60 md:h-full">
              <div className="absolute bottom-0 z-20">
                <CountryMapLegends />
              </div>
              <CountryMap
                country={countryData}
                year={props.year}
                dataset={selectedDataset}
              />
            </div>
            <CountryMapCard country={countryData} dataset={selectedDataset} />
          </div>
        </div>
      </CountryMapViewContainer>
    </div>
  );
}

function WorldMapViewContainer({ children }: { children: React.ReactNode }) {
  return (
    // <div className="bg-primary-light outer-rounding outer-padding-3 h-[90vh] md:h-[85vh] lg:h-[80vh] xl:h-[75vh] min-h-fit">
    <div className="bg-primary-light outer-rounding outer-padding-3 max-h-full">
      {children}
    </div>
  );
}

function CountryMapViewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary-light outer-rounding outer-padding-3 h-[90vh] md:h-[85vh] lg:h-[80vh] xl:h-[75vh] min-h-fit">
      {/* <div className="bg-primary-light outer-rounding outer-padding-3 max-h-full"> */}
      {children}
    </div>
  );
}

export function BetaChip() {
  const mapVersion = env.mapVersion;
  return (
    <div className="z-20 self-start bg-white text-primary text-xs py-0.5 px-2 rounded-full shadow-xl">
      {/* BETA */}
      Version {mapVersion}
    </div>
  );
}
