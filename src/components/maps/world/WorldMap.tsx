"use client";

import { transformAllForestCoverChangeData } from "@/utils/country-helper";
import { downloadGeoJsonAsSvg } from "@/utils/download-map";
import { useForestCoverChangeData, useWorldMap } from "@/utils/store";
import { NaturalEarthCountryFeatureCollection } from "@/utils/types";
import * as turf from "@turf/turf";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Layer,
  Map,
  MapRef,
  NavigationControl,
  Source,
  ViewStateChangeEvent,
} from "@vis.gl/react-maplibre";
import type { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import countries from "../countries-optimized.geo.json";
import { useWorldMapStore, BRAZIL_DEFAULT_COUNTRY } from "@/stores/mapStore";
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
    getCurrentForestData,
    setSelectedCountry,
    setClickPosition,
    defaultCountryLoaded,
    setDefaultCountryLoaded,
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
    // Use current forest data from store, fallback to old data
    const currentData = getCurrentForestData();
    const dataToUse =
      currentData.length > 0 ? currentData : forestCoverChangeDataByYear;

    if (!dataToUse.length) {
      return { type: "FeatureCollection", features: [] };
    } else {
      const transformedForestCoverChangeAll =
        transformAllForestCoverChangeData(dataToUse);

      const countriesData = countries as unknown as {
        features: Array<{
          properties: { iso_a2: string; [key: string]: unknown };
          [key: string]: unknown;
        }>;
      };
      const updatedFeatures = countriesData.features.map((country) => {
        const countyISO2 = country.properties.iso_a2;
        const countySlug =
          transformedForestCoverChangeAll[countyISO2]?.countrySlug ?? "";
        const changeValue =
          transformedForestCoverChangeAll[countyISO2]?.forestChange ?? 0;

        let colorKey;
        switch (true) {
          case changeValue === undefined || isNaN(changeValue):
            colorKey = "#E1EBE5";
            break;
          case changeValue > 0 && changeValue < 0.2:
            colorKey = "#FEFCFB";
            break;
          case changeValue > 0.2 && changeValue < 0.4:
            colorKey = "#FADABE";
            break;
          case changeValue > 0.4 && changeValue < 0.6:
            colorKey = "#F7C08E";
            break;
          case changeValue > 0.6 && changeValue < 0.8:
            colorKey = "#F4A45E";
            break;
          case changeValue > 0.8 && changeValue < 1.0:
            colorKey = "#F08C4D";
            break;
          case changeValue > 1.0 && changeValue < 1.2:
            colorKey = "#EE7453";
            break;
          case changeValue > 1.2 && changeValue < 1.4:
            colorKey = "#EB5A57";
            break;
          case changeValue > 1.4 && changeValue < 1.6:
            colorKey = "#E24444";
            break;
          case changeValue > 1.6 && changeValue < 1.8:
            colorKey = "#D72E2E";
            break;
          case changeValue > 1.8:
            colorKey = "#CB1313";
            break;
          default:
            colorKey = "#E1EBE5";
        }

        return {
          ...country,
          properties: {
            ...country.properties,
            colorKey,
            countrySlug: countySlug,
          },
        };
      });

      return {
        ...countries,
        features: updatedFeatures,
      };
    }
  }, [forestCoverChangeDataByYear, getCurrentForestData]);

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
      layers: ["country-fill"],
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
      currentData.length > 0 ? currentData : forestCoverChangeDataByYear;
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
            <Layer
              id="country-fill"
              type="fill"
              paint={{
                "fill-color": ["get", "colorKey"],
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
          <NavigationControl position="bottom-right" showCompass={false} />
        </Map>
      </div>
      <WorldMapCard />

      <div className="absolute right-0 bottom-0">
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
