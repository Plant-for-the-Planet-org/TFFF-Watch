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
import countries from "./ne_50m_admin_0_countries.geo.json";
import { api, urls } from "@/utils/axios-helper";
// import countries from "./worldboundrycorrected.geo.json";

interface VisParams {
  palette: string;
}

interface LayerConfig {
  name: string;
  tileUrl: string;
  visParams: VisParams;
}

interface LayerData {
  id: string;
  country: string;
  analysisYear: number;
  currentForestLayer: LayerConfig;
  // lossTillLayer: LayerConfig;
  fireLossLayer: LayerConfig;
  lossInYearLayer: LayerConfig;
  createdAt: string;
  updatedAt: string;
}

export type Props = {
  iso2: string;
  name: string;
  year: string;
  // layerData: LayerData;
};

function getCountryGeoJSON(iso2: string) {
  return {
    type: "FeatureCollection",
    features: countries.features.filter((f) => f.properties?.iso_a2 === iso2),
  } as FeatureCollection;
}

export default function CountryMapView({ name = "", year = "", iso2 }: Props) {
  const { width = 0 } = useWindowSize();
  const [layersData, setLayersData] = useState<LayerData>();

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

  useEffect(() => {
    (async () => {
      try {
        const result = await api<LayerData>({
          url: urls.layersProxyAPI,
          method: "POST",
          token: "",
          body: { name, year, iso2 },
        });
        setLayersData(result);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    })();
  }, [name, year, iso2]);

  // const memoizedLayersData = useMemo(() => {
  //   return (async () => await getMapLayersData)();
  // }, [name, year, iso2]);
  // console.log({ memoizedLayersData });

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
        {layersData && (
          <>
            {/* Current Forest Layer */}
            <Source
              key="current-forest"
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

            {/* Fire Loss Layer */}
            <Source
              key="fire-loss"
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

            {/* Loss In Year Layer */}
            <Source
              key="loss-in-year"
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
              "fill-color": "#F0FAF4", // Match your background
              "fill-opacity": 1,
            }}
          />
        </Source>
      </Map>
    </>
  );
}
