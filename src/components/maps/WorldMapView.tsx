"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { Map, MapRef, StyleSpecification } from "@vis.gl/react-maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";

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
  const mapRef = useRef<MapRef>(null);

  const [zoom, setZoom] = useState(0.7);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!width) return;
    if (width > 768) setZoom(0.7);
    else setZoom(0.3);
  }, [width]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current?.getMap();
    // console.log(map);
    map?.addControl(new maplibregl.AttributionControl({ compact: true }));
  }, [mapRef]);

  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 42,
        zoom: 0.7,
      }}
      ref={mapRef}
      zoom={zoom}
      style={{}}
      mapStyle={style}
      // renderWorldCopies={false}
      scrollZoom={false}
      dragPan={false}
      dragRotate={false}
      touchPitch={false}
      touchZoomRotate={false}
      keyboard={false}
      // interactive={false}
      attributionControl={false}
      onLoad={() => {
        // console.log("onLoad");
        const elem = document.querySelector(
          "details.maplibregl-ctrl.maplibregl-ctrl-attrib.maplibregl-compact"
        );
        elem?.classList.remove("maplibregl-compact-show");
      }}
    >
      {/* <AttributionControl compact={false} /> */}
    </Map>
  );
}
