"use client";

import turfBbox from "@turf/bbox";
import { useWindowSize } from "@uidotdev/usehooks";
import { Map, MapRef } from "@vis.gl/react-maplibre";
import type { FeatureCollection } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import countries from "./ne_50m_admin_0_countries.geojson.json";

export type Props = {
  iso2: string;
};

function getCountryGeoJSON(iso2: string) {
  return {
    type: "FeatureCollection",
    features: countries.features.filter((f) => f.properties?.iso_a2 === iso2),
  } as FeatureCollection;
}

export default function CountryMapView({ iso2 }: Props) {
  const { width = 0 } = useWindowSize();

  const mapRef = useRef<MapRef>(null);

  const [countryFeatureCollection] = useState<FeatureCollection>(
    getCountryGeoJSON(iso2)
  );

  function repositionMap() {
    if (!countryFeatureCollection) return;
    if (!width) return;

    const maplibre = mapRef.current!.getMap!();
    const [minX, minY, maxX, maxY] = turfBbox(countryFeatureCollection);
    const bounds: [[number, number], [number, number]] = [
      [minX, minY],
      [maxX, maxY],
    ];

    // if (width > 768) {
    //   // Desktop: pad the right heavily so geo sits in left half
    //   maplibre.fitBounds(bounds, {
    //     padding: {
    //       top: 20,
    //       bottom: 20,
    //       left: 20,
    //       right: width / 2 + 20,
    //     },
    //     maxZoom: 8,
    //   });
    // } else {
    //   // Mobile: center it as before
    //   maplibre.fitBounds(bounds, {
    //     padding: 20,
    //     maxZoom: 8,
    //   });
    // }

    maplibre.fitBounds(bounds, {
      padding: 24,
      maxZoom: 8,
    });
  }

  return (
    <Map
      ref={mapRef}
      initialViewState={{ longitude: 0, latitude: 0, zoom: 1 }}
      style={{ width: "100%", height: "100%" }}
      onLoad={() => {
        repositionMap();
      }}
      mapStyle={{
        version: 8,
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        sources: countryFeatureCollection
          ? { country: { type: "geojson", data: countryFeatureCollection } }
          : {},
        layers: countryFeatureCollection
          ? [
              {
                id: "background",
                type: "background",
                paint: { "background-color": "#F0FAF4" },
              },
              {
                id: "fill",
                type: "fill",
                source: "country",
                paint: {
                  "fill-color": "#FFFFFF",
                  "fill-outline-color": "#FFFFFF",
                },
              },
              {
                id: "line",
                type: "line",
                source: "country",
                paint: { "line-color": "#FFFFFF", "line-width": 1.5 },
                // paint: { "line-color": "#000000", "line-width": 1.5 },
              },
            ]
          : [],
      }}
      renderWorldCopies={false}
      interactive={false}
      attributionControl={false}
    />
  );
}
