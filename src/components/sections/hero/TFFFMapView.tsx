"use client";

import {
  CountryMap,
  DatasetTabs,
  initializeBrazilDefault,
  useWorldMapStore,
  WorldMap,
} from "@/components/maps";
import CountryMapCard from "@/components/maps/country/CountryMapCard";
import {
  CountryMapLegends,
  LegendsForGFW,
  LegendsForJRC,
} from "@/components/maps/MapLegends";
import {
  CountryMapHeaderContent,
  WorldMapHeaderContent,
} from "@/components/sections/hero/TFFFMapViewContent";
import Br from "@/components/ui/Br";
import { CountryDetails } from "@/utils/country-helper";
import { env } from "@/utils/env";
import { useForestCoverChangeData } from "@/utils/store";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import RewardsChart from "../charts/RewardsChart";
import { fetchForestCoverChangeDataV2 } from "@/utils/forestChange.store";

export function TFFFWorldMapView() {
  const { forestCoverChangeData, setForestCoverChangeDataByYear } =
    useForestCoverChangeData();

  // New map store integration
  const { selectedDataset, setForestData, selectedYear, setSelectedYear } =
    useWorldMapStore();

  // useEffect(() => {
  //   fetchForestCoverChangeDataV2({});
  // }, []);

  useEffect(() => {
    const _yearWise = forestCoverChangeData.filter(
      (el) => el.year == selectedYear
    );
    setForestCoverChangeDataByYear(_yearWise);

    // Update new store with forest data for both datasets initially
    // This provides immediate data for map rendering, specific data will be fetched by DatasetTabs
    setForestData("GFW", _yearWise);
    setForestData("JRC", _yearWise); // Use as fallback until JRC-specific data is fetched
  }, [
    forestCoverChangeData,
    selectedYear,
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
        <VersionChip />

        {/* Dataset Tabs */}
        <div className="flex justify-center mb-4">
          <DatasetTabs />
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
              selectedYear={selectedYear}
              dataset={selectedDataset}
              defaultSelectedCountry="BR"
              variant="hero"
            />
          </div>
          <div className="md:absolute left-0 bottom-0 min-w-48 max-w-fit mx-auto pointer-events-none">
            <Br cn="md:hidden" />
            {selectedDataset === "JRC" ? <LegendsForJRC /> : <LegendsForGFW />}
            <Br />
          </div>
          {/* <p className="text-xs text-center flex justify-center items-center gap-2">
            <Image
              width={12}
              height={12}
              src="/assets/cursor.svg"
              alt="Click on a country for more data"
            />
            Click on a country for more data
          </p> */}
        </div>
      </div>
      <Br />
      <Br />
      <RewardsChart />
    </WorldMapViewContainer>
  );
}

type TFFFCountryMapViewProps = CountryDetails & {
  year: string;
  dataset?: "GFW" | "JRC";
};

function TFFFCountryMapViewInner(props: TFFFCountryMapViewProps) {
  const { country, year } = useParams();
  const searchParams = useSearchParams();

  // Get dataset from URL params, fallback to props or default
  const selectedDataset =
    (searchParams.get("dataset") as "GFW" | "JRC") || props.dataset || "JRC";

  useEffect(() => {
    if (props.name && props.iso2) {
      // Fetch country-specific data with the selected dataset
      fetchForestCoverChangeDataV2({
        year: year as string,
        country: props.name,
        iso2: props.iso2,
        source: selectedDataset,
      });
    }
  }, [year, props.name, props.iso2, selectedDataset]);

  // Removed problematic navigation that was causing 404 redirects

  // Convert props to CountryData format
  const countryData = {
    iso2: props.iso2,
    iso3: props.iso3,
    name: props.name,
    slug: country as string,
    flagImgUrl: props.flagImgUrl,
  };

  return (
    <div>
      <div className="flex justify-center">
        {/* Dataset Tabs */}
        <DatasetTabs />
      </div>
      <Br />

      <CountryMapViewContainer>
        <div className="h-full flex flex-col">
          <Br />
          <CountryMapHeaderContent year={props.year} />
          <Br />

          <div className="grow grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-60 md:h-full">
              <div className="absolute bottom-0 left-0 pointer-events-none">
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

function TFFFCountryMapViewFallback(props: TFFFCountryMapViewProps) {
  return (
    <div>
      <div className="flex justify-center">
        {/* Dataset Tabs Fallback */}
        <div className="flex gap-1 p-1 bg-[#E4F6EB] rounded-xl border border-primary-light">
          <div className="px-4 py-2 typo-p font-medium rounded-lg bg-white text-[#333333] shadow-sm">
            Standard Estimate (JRC + GFW)
          </div>
          <div className="px-4 py-2 typo-p font-medium rounded-lg bg-transparent text-[#828282]">
            Tree-cover-change Estimate (GFW)
          </div>
        </div>
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
              <div className="bg-gray-200 animate-pulse h-full w-full rounded"></div>
            </div>
            <div className="bg-gray-100 animate-pulse rounded"></div>
          </div>
        </div>
      </CountryMapViewContainer>
    </div>
  );
}

export function TFFFCountryMapView(props: TFFFCountryMapViewProps) {
  return (
    <Suspense fallback={<TFFFCountryMapViewFallback {...props} />}>
      <TFFFCountryMapViewInner {...props} />
    </Suspense>
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

export function VersionChip() {
  const mapVersion = env.mapVersion;
  return (
    <div className="z-20 self-start bg-white text-primary text-xs py-0.5 px-2 rounded-full shadow-xl">
      {mapVersion}
    </div>
  );
}
