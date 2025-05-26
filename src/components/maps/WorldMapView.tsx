"use client";

import { Map, StyleSpecification } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const style: StyleSpecification = {
  version: 8,
  sources: {
    countries: {
      type: "vector",
      tiles: ["https://demotiles.maplibre.org/tiles/{z}/{x}/{y}.pbf"],
      maxzoom: 6,
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#F0FAF4",
      },
    },
    {
      id: "countries-fill",
      type: "fill",
      source: "countries",
      "source-layer": "countries",
      paint: {
        "fill-color": "#E1EBE5",
        "fill-outline-color": "#FFFFFF",
      },
    },
    {
      id: "countries-stroke",
      type: "line",
      source: "countries",
      "source-layer": "countries",
      paint: {
        "line-color": "#FFFFFF",
        "line-width": 1.5,
      },
    },
  ],
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
};

export default function WorldMapView() {
  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 33.5,
        zoom: 1,
      }}
      style={{}}
      mapStyle={style}
      renderWorldCopies={false}
      minZoom={0}
      maxZoom={5}
    />
  );
}
