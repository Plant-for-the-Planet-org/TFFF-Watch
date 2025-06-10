"use client";

import turfBbox from "@turf/bbox";
import {
  bboxPolygon as turfBboxPolygon,
  difference as turfDifference,
  featureCollection as turfFeatureCollection,
} from "@turf/turf";
import { useWindowSize } from "@uidotdev/usehooks";
import { Layer, Map, MapRef, Source } from "@vis.gl/react-maplibre";
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  MultiPolygon,
  Polygon,
} from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import countries from "./ne_50m_admin_0_countries.geojson.json";

interface LayerConfig {
  name: string;
  tileUrl: string;
  visParams?: {
    palette?: string; // optional
  };
}

interface LayerData {
  forestLayer?: LayerConfig;
  degradationLayer?: LayerConfig;
  deforestationLayer2023?: LayerConfig;
}

export type Props = {
  iso2: string;
  // layerData: LayerData;
};

const layerData: LayerData = {
  // id: "5c49e9c0-3e29-4def-a523-a2b2b33d8ad8",
  // country: "Ghana",
  forestLayer: {
    name: "2024 Forest",
    tileUrl:
      "https://earthengine.googleapis.com/v1/projects/earthengine-legacy/maps/cad01ba56905869087ca3d1dfa83e209-37937f4b5e200aa6bd8e5e5431227b03/tiles/{z}/{x}/{y}",
    visParams: {
      palette: "green",
    },
  },
  degradationLayer: {
    name: "Only 2023 Deforestation JRC",
    tileUrl:
      "https://earthengine.googleapis.com/v1/projects/earthengine-legacy/maps/1c5588ea214fefd7db3e7f292f5f34e9-524b2f93dbe4fc6e9ee85cc1d9a2ec32/tiles/{z}/{x}/{y}",
    visParams: {
      palette: "orange",
    },
  },
  deforestationLayer2023: {
    name: "Deforestation 2023",
    tileUrl:
      "https://earthengine.googleapis.com/v1/projects/earthengine-legacy/maps/9665c8add89ac23373aca2b6b9439c30-80db89e02df4217c26f6ed0e78f05156/tiles/{z}/{x}/{y}",
    visParams: {
      palette: "red",
    },
  },
  // deforestationHaJrc: 5624.826188522884,
  // deforestationHaHansen: 32279.813910386565,
  // task: null,
  // createdAt: "2025-06-08T15:25:17.212Z",
  // updatedAt: "2025-06-08T15:25:17.212Z",
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

    maplibre.fitBounds(bounds, {
      padding: 24,
      maxZoom: 8,
    });
  }

  function getInvertedCountryMask(
    country: FeatureCollection
  ): FeatureCollection {
    const world = turfBboxPolygon([-180, -90, 180, 90]);
    const polygonFeatures = country.features.filter(
      (
        feature
      ): feature is Feature<Polygon | MultiPolygon, GeoJsonProperties> =>
        feature.geometry &&
        (feature.geometry.type === "Polygon" ||
          feature.geometry.type === "MultiPolygon")
    );

    const fc: Feature<Polygon | MultiPolygon, GeoJsonProperties>[] = [
      world,
      ...polygonFeatures,
    ];
    const mask = turfDifference(turfFeatureCollection(fc));

    return {
      type: "FeatureCollection",
      features: [mask!],
    };
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
      interactive={false}
      attributionControl={false}
    >
      {/* COUNTRY GEOMETRY */}
      {countryFeatureCollection && (
        <Source id="country" type="geojson" data={countryFeatureCollection}>
          <Layer
            id="country-fill"
            type="fill"
            paint={{
              "fill-color": "#FFFFFF",
              "fill-outline-color": "#FFFFFF",
            }}
          />
          <Layer
            id="country-line"
            type="line"
            paint={{
              "line-color": "#FFFFFF",
              "line-width": 1.5,
            }}
          />
        </Source>
      )}

      {/* XYZ TILE LAYERS */}
      {Object.entries(layerData).map(([key, layer]) =>
        layer ? (
          <Source
            key={key}
            id={`${key}-source`}
            type="raster"
            tiles={[layer.tileUrl]}
            tileSize={256}
          >
            <Layer
              id={`${key}-layer`}
              type="raster"
              paint={{
                "raster-opacity": 0.8,
              }}
            />
          </Source>
        ) : null
      )}

      <Source
        id="mask"
        type="geojson"
        data={getInvertedCountryMask(countryFeatureCollection)}
      >
        <Layer
          id="mask-layer"
          type="fill"
          paint={{
            "fill-color": "#F0FAF4", // Match your background
            "fill-opacity": 1,
          }}
        />
      </Source>
    </Map>
  );
}
