"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { Layer, Map, MapRef, Source } from "@vis.gl/react-maplibre";
import type { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { bbox as turfBbox } from "@turf/turf";
import countries from "./ne_50m_admin_0_countries.geojson.json";

// const style: StyleSpecification = {
//   version: 8,
//   sources: {
//     countries: {
//       type: "vector",
//       tiles: ["https://demotiles.maplibre.org/tiles/{z}/{x}/{y}.pbf"],
//       maxzoom: 6,
//     },
//   },
//   layers: [
//     {
//       id: "background",
//       type: "background",
//       paint: {
//         "background-color": "#F0FAF4",
//       },
//     },
//     {
//       id: "countries-fill",
//       type: "fill",
//       source: "countries",
//       "source-layer": "countries",
//       paint: {
//         "fill-color": "#E1EBE5",
//         "fill-outline-color": "#FFFFFF",
//       },
//     },
//     {
//       id: "countries-stroke",
//       type: "line",
//       source: "countries",
//       "source-layer": "countries",
//       paint: {
//         "line-color": "#FFFFFF",
//         "line-width": 1.5,
//       },
//     },
//   ],
//   glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
// };

export default function WorldMapView() {
  const mapRef = useRef<MapRef>(null);

  const [zoom, setZoom] = useState(0.5);
  const [latitude, setLatitude] = useState(50);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!width) return;
    setLatitude(50);
    if (width > 768) setZoom(0.5);
    else setZoom(0.3);
  }, [width]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current?.getMap();
    const bounds = turfBbox(countries); // [minX, minY, maxX, maxY]
    map.fitBounds(bounds, {
      padding: 20,
      duration: 0,
    });
    // console.log(map);
    map?.addControl(new maplibregl.AttributionControl({ compact: true }));
  }, [mapRef]);

  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: latitude,
        zoom: zoom,
      }}
      ref={mapRef}
      zoom={zoom}
      latitude={latitude}
      // mapStyle={style}
      mapStyle={{
        version: 8,
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        sources: {},
        layers: [
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#F0FAF4" },
          },
        ],
      }}
      renderWorldCopies={false}
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
      {/* COUNTRY GEOMETRY */}
      <Source
        id="country"
        type="geojson"
        data={countries as unknown as GeoJSON<Geometry, GeoJsonProperties>}
      >
        <Layer
          id="country-fill"
          type="fill"
          paint={{
            "fill-color": "#E1EBE5",
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
  );
}
