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
} from "@vis.gl/react-maplibre";
import type { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import countries from "./ne_50m_admin_0_countries.geo.json";
import WorldMapTFFFCard from "./WorldMapTFFFCard";
// import countries from "./worldboundrycorrected.geo.json";

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
    if (!forestCoverChangeDataByYear.length) {
      return { type: "FeatureCollection", features: [] };
    } else {
      const transformedForestCoverChangeAll = transformAllForestCoverChangeData(
        forestCoverChangeDataByYear
      );
      // console.log({ transformedForestCoverChangeAll });

      // Create a new array of features with updated properties
      const updatedFeatures = countries.features.map((country) => {
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

        // Return a new feature object with updated properties
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
  }, [forestCoverChangeDataByYear]);

  // const onMove = useCallback(({ viewState }: ViewStateChangeEvent) => {
  //   const newCenter = [viewState.longitude, viewState.latitude];
  //   if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
  //     setViewState({
  //       zoom: viewState.zoom,
  //       longitude: newCenter[0],
  //       latitude: newCenter[1],
  //     });
  //   }
  // }, []);

  const onClick = (event: maplibregl.MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    const features = map?.queryRenderedFeatures(event.point, {
      layers: ["country-fill"],
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
          // onMove={onMove}
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
            data={allCountries as GeoJSON<Geometry, GeoJsonProperties>}
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
