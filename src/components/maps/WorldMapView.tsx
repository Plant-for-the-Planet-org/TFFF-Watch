"use client";

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
  NavigationControl,
  Source,
  ViewStateChangeEvent,
} from "@vis.gl/react-maplibre";
import type { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import countries from "./ne_50m_admin_0_countries.geo.json";
import countries from "./countries-optimized.geo.json";
import { useWorldMapStore } from "@/stores/mapStore";
import WorldMapTFFFCard from "./WorldMapTFFFCard";

export const GEOFENCE = turf.polygon([
  [
    [-180, 64],
    [180, 64],
    [180, -48],
    [-180, -48],
    [-180, 64],
  ],
]);

export type MapCountryClickEvent = {
  features: maplibregl.MapLayerMouseEvent["features"];
  point: maplibregl.MapLayerMouseEvent["point"];
  lngLat: maplibregl.MapLayerMouseEvent["lngLat"];
  lng: maplibregl.MapLayerMouseEvent["lngLat"]["lng"];
  lat: maplibregl.MapLayerMouseEvent["lngLat"]["lat"];
  country: string;
};

export default function WorldMapView() {
  const { width } = useWindowSize();
  const forestCoverChangeDataByYear = useForestCoverChangeData(
    (state) => state.forestCoverChangeDataByYear
  );
  const { setPoint, setCountry, setCountrySlug, setCountryISO2, setIsTFFF } =
    useWorldMap();
  const { selectedDataset, getCurrentForestData } = useWorldMapStore();

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

    setPoint(point);
    setCountry(country);
    setCountrySlug(countrySlug);
    setCountryISO2(countryISO2);

    const isTFFF = forestCoverChangeDataByYear.find(
      (el) => el["country-iso2"] === countryISO2 || el.country === country
    );
    // console.log({ isTFFF });
    if (isTFFF) setIsTFFF(true);
    else setIsTFFF(false);
  };

  return (
    <>
      <div className="aspect-[1.75] w-full -translate-y-12 -z-10">
        {/* <pre>{JSON.stringify(viewState, null, 2)}</pre> */}
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
          <NavigationControl position="bottom-right" showCompass={false} />
          {/* <AttributionControl compact={false} /> */}
        </Map>
      </div>
      <WorldMapTFFFCard />

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
