"use client";

import { BRAZIL_DEFAULT_COUNTRY, useWorldMapStore } from "@/stores/mapStore";
import { transformAllForestCoverChangeData } from "@/utils/country-helper";
import { downloadGeoJsonAsSvg } from "@/utils/download-map";
import { updateFeaturesWithColorKeys } from "@/utils/map-colors";
import { useForestCoverChangeData, useWorldMap } from "@/utils/store";
import { NaturalEarthCountryFeatureCollection } from "@/utils/types";
import * as turf from "@turf/turf";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Layer,
  Map,
  MapRef,
  Source,
  ViewStateChangeEvent,
} from "@vis.gl/react-maplibre";
import type { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import countries from "../countries-optimized.geo.json";
import { WorldMapProps } from "../shared/types";
import WorldMapCard from "./WorldMapCard";

export const GEOFENCE = turf.polygon([
  [
    [-180, 64],
    [180, 64],
    [180, -48],
    [-180, -48],
    [-180, 64],
  ],
]);

export default function WorldMap({
  defaultSelectedCountry,
  onCountryClick,
}: WorldMapProps = {}) {
  const { width } = useWindowSize();
  const forestCoverChangeDataByYear = useForestCoverChangeData(
    (state) => state.forestCoverChangeDataByYear
  );
  const { setPoint, setCountry, setCountrySlug, setCountryISO2, setIsTFFF } =
    useWorldMap();

  // New store integration
  const {
    selectedCountry,
    selectedDataset,
    getCurrentForestData,
    setSelectedCountry,
    setClickPosition,
    defaultCountryLoaded,
    setDefaultCountryLoaded,
    isLoading,
  } = useWorldMapStore();

  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useState({
    latitude: 24,
    longitude: 0,
    zoom: 0.5,
  });

  useEffect(() => {
    if (!width) return;
    if (width > 1024) {
      setViewState((prev) => ({ ...prev, zoom: 0.5 }));
    } else if (width > 768) {
      setViewState((prev) => ({ ...prev, zoom: 0 }));
    } else {
      setViewState((prev) => ({ ...prev, zoom: -1 }));
    }
  }, [width]);

  // Initialize Brazil default selection
  useEffect(() => {
    if (
      defaultSelectedCountry === "BR" &&
      !defaultCountryLoaded &&
      !selectedCountry
    ) {
      setSelectedCountry(BRAZIL_DEFAULT_COUNTRY);
      setDefaultCountryLoaded(true);
    }
  }, [
    defaultSelectedCountry,
    defaultCountryLoaded,
    selectedCountry,
    setSelectedCountry,
    setDefaultCountryLoaded,
  ]);

  const allCountries = useMemo(() => {
    // Use current forest data from store, fallback to legacy data for both datasets
    const currentData = getCurrentForestData();
    const dataToUse =
      currentData.length > 0 ? currentData : forestCoverChangeDataByYear;

    const countriesData = countries as unknown as {
      features: Array<{
        properties: { iso_a2: string; [key: string]: unknown };
        [key: string]: unknown;
      }>;
    };

    if (!dataToUse.length) {
      // No data available - render countries with default colors
      const defaultFeatures = countriesData.features.map((country) => ({
        ...country,
        properties: {
          ...country.properties,
          colorKey: "#E1EBE5", // Default gray color
          JRCColorKey: "#E1EBE5",
          GFWColorKey: "#E1EBE5",
          countrySlug: "",
        },
      }));

      return {
        ...countries,
        features: defaultFeatures,
      };
    } else {
      const transformedForestCoverChangeAll =
        transformAllForestCoverChangeData(dataToUse);

      const updatedFeatures = updateFeaturesWithColorKeys(
        countriesData.features,
        transformedForestCoverChangeAll,
        selectedDataset
      );

      return {
        ...countries,
        features: updatedFeatures,
      };
    }
  }, [forestCoverChangeDataByYear, getCurrentForestData, selectedDataset]);

  const onMove = useCallback(({ viewState }: ViewStateChangeEvent) => {
    const newCenter = [viewState.longitude, viewState.latitude];
    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
      setViewState({
        zoom: viewState.zoom,
        longitude: newCenter[0],
        latitude: newCenter[1],
      });
    }
  }, []);

  const onClick = (event: maplibregl.MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    const features = map?.queryRenderedFeatures(event.point, {
      layers: ["country-fill-jrc", "country-fill-gfw"],
    });
    const { point } = event;
    const country = features?.[0]?.properties?.name_long;
    const countrySlug = features?.[0]?.properties?.countrySlug;
    const countryISO2 = features?.[0]?.properties?.["iso_a2"];

    // Update old store (for backward compatibility)
    setPoint(point);
    setCountry(country);
    setCountrySlug(countrySlug);
    setCountryISO2(countryISO2);

    const currentData = getCurrentForestData();
    const dataToUse =
      currentData.length > 0
        ? currentData
        : selectedDataset === "GFW"
        ? forestCoverChangeDataByYear
        : [];
    const isTFFF = dataToUse.find(
      (el) => el["country-iso2"] === countryISO2 || el.country === country
    );
    if (isTFFF) setIsTFFF(true);
    else setIsTFFF(false);

    // Update new store
    if (country && countryISO2) {
      const countryData = {
        iso2: countryISO2,
        iso3: "", // We don't have ISO3 in the current data
        name: country,
        slug: countrySlug || "",
        flagImgUrl: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryISO2}.svg`,
      };

      setSelectedCountry(countryData);
      setClickPosition({ x: point.x, y: point.y });

      // Call external callback if provided
      if (onCountryClick) {
        onCountryClick(countryData);
      }
    }
  };

  // Show loading state if no data is available and we're loading
  const hasAnyData =
    getCurrentForestData().length > 0 || forestCoverChangeDataByYear.length > 0;

  if (!hasAnyData && isLoading) {
    return (
      <>
        <div className="aspect-[1.75] w-full -translate-y-12 -z-10 flex items-center justify-center bg-gray-100 rounded">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map data...</p>
          </div>
        </div>
        <WorldMapCard />
      </>
    );
  }

  return (
    <>
      <div className="aspect-[1.75] w-full -translate-y-12 -z-10">
        <Map
          ref={mapRef}
          {...viewState}
          cursor="default"
          keyboard={false}
          scrollZoom={false}
          dragPan={true}
          dragRotate={false}
          touchPitch={false}
          touchZoomRotate={false}
          doubleClickZoom={false}
          interactive={true}
          attributionControl={false}
          renderWorldCopies={false}
          onMove={onMove}
          onClick={onClick}
          onLoad={() => {
            const map = mapRef.current?.getMap();
            map?.addControl(
              new maplibregl.AttributionControl({ compact: true })
            );
          }}
        >
          <Source
            id="country"
            type="geojson"
            data={
              allCountries as unknown as GeoJSON<Geometry, GeoJsonProperties>
            }
          >
            {/* JRC Layer */}
            <Layer
              id="country-fill-jrc"
              type="fill"
              paint={{
                "fill-color": ["get", "JRCColorKey"],
                "fill-opacity": selectedDataset === "JRC" ? 1 : 0,
              }}
            />
            {/* GFW Layer */}
            <Layer
              id="country-fill-gfw"
              type="fill"
              paint={{
                "fill-color": ["get", "GFWColorKey"],
                "fill-opacity": selectedDataset === "GFW" ? 1 : 0,
              }}
            />
            <Layer
              id="country-line"
              type="line"
              paint={{
                "line-color": "#FFFFFF",
                "line-width": 1,
              }}
            />
          </Source>
          {/* <NavigationControl position="bottom-right" showCompass={false} /> */}
        </Map>
      </div>
      <WorldMapCard />

      <div className="absolute right-0 top-0">
        <div className="relative group">
          <button
            className="bg-white p-2 rounded-lg cursor-pointer"
            onClick={() => {}}
          >
            <Image width={24} height={24} src="/assets/finger-tap.svg" alt="" />
          </button>

          {/* Tooltip */}
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
            <div className="bg-background text-base-text text-sm px-3 py-2 rounded-full whitespace-nowrap shadow-lg">
              Click on a country for more data
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 text-xs flex items-end-safe">
        <div className="text mr-2 pb-0.5">
          Please cite data as{" "}
          <Link className="text-primary italic" href="">
            tfffwatch.org
          </Link>{" "}
          by Plant-for-the-Planet
        </div>
        <button
          className="bg-white p-2 rounded-lg cursor-pointer"
          onClick={() => {
            downloadGeoJsonAsSvg(
              allCountries as unknown as NaturalEarthCountryFeatureCollection,
              {
                width: 800,
                height: 800,
                filename: "tfff-world-map.svg",
                backgroundColor: "#F0FAF4",
                strokeWidth: 1,
              }
            );
          }}
        >
          <Image width={24} height={24} src="/assets/download-map.svg" alt="" />
        </button>
      </div>
    </>
  );
}
