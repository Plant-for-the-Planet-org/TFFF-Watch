"use client";

import turfBbox from "@turf/bbox";
import { useWindowSize } from "@uidotdev/usehooks";
import { Map, MapRef, StyleSpecification } from "@vis.gl/react-maplibre";
import type { FeatureCollection } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";

const style: StyleSpecification = {
  layers: [
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
        "fill-color": "#E1EBE5",
        "fill-outline-color": "#FFFFFF",
      },
    },
    {
      id: "line",
      type: "line",
      source: "country",
      paint: { "line-color": "#FFFFFF", "line-width": 1.5 },
    },
  ],
};

interface Props {
  iso2: string;
}

export default function CountryMapView({ iso2 }: Props) {
  const mapRef = useRef<MapRef>(null);
  const [countryFC, setCountrycountryFC] = useState<FeatureCollection | null>(
    null
  );
  const { width = 0 } = useWindowSize();

  useEffect(() => {
    fetch("/ne_50m_admin_0_countries.geojson")
      .then((r) => r.json())
      .then((data: FeatureCollection) => {
        const single = {
          type: "FeatureCollection",
          features: data.features.filter((f) => f.properties?.iso_a2 === iso2),
        } as FeatureCollection;
        setCountrycountryFC(single);
      })
      .catch(console.error);
  }, [iso2]);

  const onMapLoad = () => {
    if (!countryFC) return;
    const maplibre = mapRef.current!.getMap!();
    const [minX, minY, maxX, maxY] = turfBbox(countryFC);
    const bounds: [[number, number], [number, number]] = [
      [minX, minY],
      [maxX, maxY],
    ];

    if (!width) return;

    if (width > 768) {
      // Desktop: pad the right heavily so geo sits in left half
      maplibre.fitBounds(bounds, {
        padding: {
          top: 20,
          bottom: 20,
          left: 20,
          right: width / 2 + 20,
        },
        maxZoom: 8,
      });
    } else {
      // Mobile: center it as before
      maplibre.fitBounds(bounds, {
        padding: 20,
        maxZoom: 8,
      });
    }
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{ longitude: 0, latitude: 0, zoom: 1 }}
      style={{ width: "100%", height: "100%" }}
      onLoad={() => {
        onMapLoad();
      }}
      mapStyle={{
        version: 8,
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        sources: countryFC
          ? { country: { type: "geojson", data: countryFC } }
          : {},
        layers: countryFC ? style.layers : [],
      }}
      renderWorldCopies={false}
      minZoom={0}
      maxZoom={12}
    />
  );
}
