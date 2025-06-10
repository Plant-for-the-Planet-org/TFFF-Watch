"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { Layer, Map, MapRef, Source } from "@vis.gl/react-maplibre";
import type { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import countries from "./ne_50m_admin_0_countries.geojson.json";
import countries from "./100m_countries.geo.json";
import { useWorldMap } from "@/utils/store";

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
  const { forestCoverChangeData } = useWorldMap();

  const mapRef = useRef<MapRef>(null);

  const [zoom, setZoom] = useState(1);
  const [latitude] = useState(42);

  useEffect(() => {
    if (!width) return;
    if (width > 768) {
      setZoom(1);
    } else {
      setZoom(0.3);
    }
  }, [width]);

  const allCountries = useMemo(() => {
    if (!forestCoverChangeData.length) {
      return { type: "FeatureCollection", features: [] };
    } else {
      console.log("Modify");
    }
    console.log({ forestCoverChangeData });
  }, [forestCoverChangeData]);

  const onClick = (event: maplibregl.MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    const features = map?.queryRenderedFeatures(event.point, {
      layers: ["country-fill"],
    });
    const { point, lngLat } = event;
    const country = features?.[0]?.properties?.name;
    const data = { features, point, lngLat, ...lngLat, country };

    window.dispatchEvent(
      new CustomEvent("map-country-click", {
        detail: data,
      })
    );
  };

  return (
    <Map
      ref={mapRef}
      zoom={zoom}
      latitude={latitude}
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
      keyboard={false}
      scrollZoom={false}
      dragPan={false}
      dragRotate={false}
      touchPitch={false}
      touchZoomRotate={false}
      attributionControl={false}
      renderWorldCopies={false}
      onClick={onClick}
      onLoad={() => {
        const elem = document.querySelector(
          "details.maplibregl-ctrl.maplibregl-ctrl-attrib.maplibregl-compact"
        );
        elem?.classList.remove("maplibregl-compact-show");

        const map = mapRef.current?.getMap();
        console.log("onLoad", { map });
        map?.addControl(new maplibregl.AttributionControl({ compact: true }));
      }}
    >
      <Source
        id="country"
        type="geojson"
        data={allCountries as unknown as GeoJSON<Geometry, GeoJsonProperties>}
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
