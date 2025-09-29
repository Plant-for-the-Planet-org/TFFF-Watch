"use client";

import { useForestCoverChangeData, useWorldMap } from "@/utils/store";
import { memo, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
// import { api, urls } from "@/utils/axios-helper";
// import { ForestChangeForCountry } from "@/utils/types";
import { getCountryDetails } from "@/utils/country-helper";
import CountryTFFFCard from "./CountryTFFFCard";

export function WorldMapTFFFCard_() {
  const { isTFFF, year, country, countrySlug, point } = useWorldMap();
  const { width: windowWidth } = useWindowSize();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  // const forestCoverChangeData = useForestCoverChangeData(
  //   (state) => state.forestCoverChangeData
  // );
  const forestCoverChangeDataByYear = useForestCoverChangeData(
    (state) => state.forestCoverChangeDataByYear
  );

  // Mobile-only placement: center horizontally, prefer above with gap, flip below if needed
  useEffect(() => {
    if (!point || !wrapperRef.current || !windowWidth) return;
    if (windowWidth >= 1024) return; // keep desktop behavior

    const rect = wrapperRef.current.getBoundingClientRect();
    const cardWidth = rect.width || wrapperRef.current.offsetWidth;
    const cardHeight = rect.height || wrapperRef.current.offsetHeight;

    const gap = 8;
    const margin = 8;

    let left = point.x - cardWidth / 2; // center horizontally on click
    let top = point.y - gap - cardHeight; // try above first
    if (top < margin) top = point.y + gap; // flip below if not enough space above

    // Simple viewport clamping to avoid overflow
    const viewportWidth = windowWidth;
    const viewportHeight =
      typeof window !== "undefined" ? window.innerHeight : 0;
    left = Math.max(margin, Math.min(viewportWidth - cardWidth - margin, left));
    if (viewportHeight) {
      top = Math.max(
        margin,
        Math.min(viewportHeight - cardHeight - margin, top)
      );
    }

    setPosition({ left, top });
  }, [point, windowWidth]);

  if (!country) return null;
  if (!isTFFF) return null;

  const details = getCountryDetails({ country: country, slug: countrySlug });
  // console.log({ details });
  return (
    <div
      ref={wrapperRef}
      className="absolute z-50"
      style={{
        left: windowWidth && windowWidth < 1024 ? position.left : point?.x ?? 0,
        top: windowWidth && windowWidth < 1024 ? position.top : point?.y ?? 0,
        transform:
          windowWidth && windowWidth < 1024
            ? undefined
            : `translate(-20%, -120%)`,
      }}
    >
      <CountryTFFFCard
        year={year}
        countrySlug={countrySlug}
        iso2={details.iso2}
        name={details.name}
        flagImgUrl={details.flagImgUrl}
        CTA={true}
        countryData={forestCoverChangeDataByYear.find(
          (el) => el["country-iso2"] === details.iso2
        )}
      />
      {/* <pre>
        {JSON.stringify(
          forestCoverChangeData.find((el) => el.country === country),
          null,
          2
        )}
      </pre> */}
    </div>
  );
}

const WorldMapTFFFCard = memo(WorldMapTFFFCard_);
export default WorldMapTFFFCard;
