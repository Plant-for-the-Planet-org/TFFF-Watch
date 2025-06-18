"use client";

import { transformAllForestCoverChangeData } from "@/utils/country-helper";
import { downloadGeoJsonAsSvg } from "@/utils/download-map";
import { useForestCoverChangeData, useWorldMap } from "@/utils/store";
import { NaturalEarthCountryFeatureCollection } from "@/utils/types";
import { useWindowSize } from "@uidotdev/usehooks";
import { Layer, Map, MapRef, Source } from "@vis.gl/react-maplibre";
import type { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import countries from "./ne_110m_admin_0_countries.geo.json";
import WorldMapTFFFCard from "./WorldMapTFFFCard";

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
  const forestCoverChangeData = useForestCoverChangeData(
    (state) => state.forestCoverChangeData
  );
  const setPoint = useWorldMap((state) => state.setPoint);
  const setCountry = useWorldMap((state) => state.setCountry);

  const mapRef = useRef<MapRef>(null);

  const [zoom, setZoom] = useState(0.5);
  const [latitude] = useState(42);

  // const [popup, setPopup] = useState(0);

  useEffect(() => {
    if (!width) return;
    if (width > 1024) {
      setZoom(0.5);
    } else if (width > 768) {
      setZoom(0);
    } else {
      setZoom(-1);
    }
  }, [width]);

  const allCountries = useMemo(() => {
    if (!forestCoverChangeData.length) {
      return { type: "FeatureCollection", features: [] };
    } else {
      // console.log({ forestCoverChangeData });
      const forestCoverChangeAll = transformAllForestCoverChangeData(
        forestCoverChangeData
      );
      // console.log("Modify", forestCoverChangeAll);
      countries.features.forEach((country) => {
        const countryName = country.properties.name_long;
        const changeValue = forestCoverChangeAll[countryName];

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

        // country.properties.colorKey = colorKey;
        (
          country.properties as typeof country.properties & { colorKey: string }
        ).colorKey = colorKey;
      });

      return countries;
    }
  }, [forestCoverChangeData]);

  const onClick = (event: maplibregl.MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    const features = map?.queryRenderedFeatures(event.point, {
      layers: ["country-fill"],
    });
    const { point } = event;
    const country = features?.[0]?.properties?.name_long;
    setPoint(point);
    setCountry(country);
  };

  return (
    <>
      <div className="h-full w-full relative">
        <Map
          ref={mapRef}
          zoom={zoom}
          latitude={latitude}
          cursor="default"
          mapStyle={{
            version: 8,
            glyphs:
              "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
            sources: {},
            layers: [
              {
                id: "background",
                type: "background",
                paint: { "background-color": "#F0FAF4" },
              },
            ],
          }}
          keyboard={false}
          scrollZoom={false}
          dragPan={false}
          dragRotate={false}
          touchPitch={false}
          touchZoomRotate={false}
          attributionControl={false}
          renderWorldCopies={false}
          onClick={onClick}
          onMouseMove={onClick}
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
                "fill-outline-color": "#FFFFFF",
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
          {/* <AttributionControl compact={false} /> */}
        </Map>
        <WorldMapTFFFCard />
      </div>
      <div className="absolute right-3 bottom-3">
        <button
          className="bg-white p-2 rounded-lg cursor-pointer"
          onClick={() => {
            downloadGeoJsonAsSvg(
              allCountries as NaturalEarthCountryFeatureCollection,
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
