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
import { useEffect, useRef, useState } from "react";
import countries from "../countries-optimized.geo.json";
import { api, urls } from "@/utils/axios-helper";
import { useCountryMapStore } from "@/stores/mapStore";
import { CountryMapProps, LayerData } from "../shared/types";

// Moved interfaces to shared/types.ts

function getCountryGeoJSON(iso2: string): FeatureCollection {
  const countriesData = countries as unknown as FeatureCollection;
  return {
    type: "FeatureCollection",
    features: countriesData.features.filter(
      (f) => (f.properties as GeoJsonProperties)?.iso_a2 === iso2
    ),
  } as FeatureCollection;
}

export default function CountryMap({
  country,
  year,
  dataset = "GFW",
  showLayers = true,
}: CountryMapProps) {
  const { width = 0 } = useWindowSize();

  // Use local state only to avoid store loops
  const [layersData, setLayersData] = useState<LayerData | null>(null);

  const mapRef = useRef<MapRef>(null);

  const [countryFeatureCollection] = useState<FeatureCollection>(
    getCountryGeoJSON(country.iso2)
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

  useEffect(() => {
    (async () => {
      try {
        const result = await api<LayerData>({
          url: urls.layersProxyAPI,
          method: "POST",
          token: "",
          body: {
            name: country.name,
            year,
            iso2: country.iso2,
            dataset, // Include dataset in API call
          },
        });
        setLayersData(result);
      } catch (error) {
        console.error("Error fetching layers:", error);
      }
    })();
  }, [country.name, year, country.iso2, dataset]);

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{ longitude: 0, latitude: 0, zoom: 1 }}
        style={{ width: "100%", height: "100%" }}
        onLoad={() => {
          repositionMap();
        }}
        renderWorldCopies={false}
        interactive={false}
        attributionControl={false}
      >
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

        {showLayers && layersData && (
          <>
            <Source
              key={`current-forest-${dataset}`}
              id="current-forest-source"
              type="raster"
              tiles={[layersData.currentForestLayer?.tileUrl]}
              tileSize={256}
            >
              <Layer
                id="current-forest-layer"
                beforeId="fire-loss-layer"
                type="raster"
                paint={{
                  "raster-opacity": 0.8,
                }}
              />
            </Source>

            <Source
              key={`fire-loss-${dataset}`}
              id="fire-loss-source"
              type="raster"
              tiles={[layersData.fireLossLayer?.tileUrl]}
              tileSize={256}
            >
              <Layer
                id="fire-loss-layer"
                beforeId="loss-in-year-layer"
                type="raster"
                paint={{
                  "raster-opacity": 0.8,
                }}
              />
            </Source>

            <Source
              key={`loss-in-year-${dataset}`}
              id="loss-in-year-source"
              type="raster"
              tiles={[layersData.lossInYearLayer?.tileUrl]}
              tileSize={256}
            >
              <Layer
                id="loss-in-year-layer"
                type="raster"
                paint={{
                  "raster-opacity": 0.8,
                }}
              />
            </Source>
          </>
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
              "fill-color": "#F0FAF4",
              "fill-opacity": 1,
            }}
          />
        </Source>
      </Map>
    </>
  );
}
