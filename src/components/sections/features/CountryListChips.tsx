// "use client";

import { InvesmentTrackerParams } from "@/utils/prop-types";
import Link from "next/link";
// import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = InvesmentTrackerParams & {};

export default function CountryListChips({ country }: Props) {
  // const scrollContainerRef = useRef<HTMLDivElement>(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const [startX, setStartX] = useState(0);
  // const [scrollLeft, setScrollLeft] = useState(0);

  // const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
  //   if (scrollContainerRef.current) {
  //     e.preventDefault();
  //     scrollContainerRef.current.scrollLeft += e.deltaY;
  //   }
  // };

  // const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!scrollContainerRef.current) return;
  //   setIsDragging(true);
  //   setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
  //   setScrollLeft(scrollContainerRef.current.scrollLeft);
  //   scrollContainerRef.current.style.cursor = "grabbing";
  // };

  // const handleMouseLeave = () => {
  //   setIsDragging(false);
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.style.cursor = "grab";
  //   }
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.style.cursor = "grab";
  //   }
  // };

  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!isDragging || !scrollContainerRef.current) return;
  //   e.preventDefault();
  //   const x = e.pageX - scrollContainerRef.current.offsetLeft;
  //   const walk = (x - startX) * 1;
  //   scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  // };

  // const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   if (isDragging) {
  //     e.preventDefault();
  //   }
  // };

  const countryList = [
    {
      slug: "Germany",
      label: "Germany",
      iso2: "DE",
      emoji: "🇩🇪",
      selected: false,
    },
    {
      slug: "Norway",
      label: "Norway",
      iso2: "NO",
      emoji: "🇳🇴",
      selected: false,
    },
    {
      slug: "France",
      label: "France",
      iso2: "FR",
      emoji: "🇫🇷",
      selected: false,
    },
    { slug: "UK", label: "UK", iso2: "GB", emoji: "🇬🇧", selected: false },
    { slug: "UAE", label: "UAE", iso2: "AE", emoji: "🇦🇪", selected: false },
    // { label: "Netherlands", iso2: "NL", emoji: "🇳🇱", selected: false },
    // { label: "Singapore", iso2: "SG", emoji: "🇸🇬", selected: false },
    {
      slug: "EU",
      label: "EU",
      iso2: "EU",
      emoji: "🇪🇺",
      noFlag: true,
      selected: false,
    },
    {
      slug: "Brazil",
      label: "Brazil",
      iso2: "BR",
      emoji: "🇧🇷",
      selected: false,
    },
    { slug: "China", label: "China", iso2: "CN", emoji: "🇨🇳", selected: false },
    {
      slug: "Indonesia",
      label: "Indonesia",
      iso2: "ID",
      emoji: "🇮🇩",
      selected: false,
    },
    {
      slug: "Portugal",
      label: "Portugal",
      iso2: "PT",
      emoji: "🇵🇹",
      selected: false,
    },
    // { label: "Azerbaijan", iso2: "AZ", emoji: "🇦🇿", selected: false },
    {
      // slug: "Asian_Infrastructure_Investment_Bank",
      // label: "Asian Infrastructure Investment Bank",
      slug: "AIIB",
      label: "AIIB",
      iso2: "",
      emoji: "🏦",
      noFlag: true,
      selected: false,
    },
    {
      // slug: "European_Bank_for_Reconstruction_and_Development",
      // label: "European Bank for Reconstruction and Development",
      slug: "EBRD",
      label: "EBRD",
      iso2: "",
      emoji: "🏦",
      noFlag: true,
      selected: false,
    },
    {
      slug: "Philanthropies",
      label: "Philanthropies",
      iso2: "",
      emoji: "🤝",
      noFlag: true,
      selected: false,
    },
    {
      slug: "Others",
      label: "Others",
      iso2: "OT",
      emoji: "🌍",
      noFlag: true,
      selected: false,
    },
  ];
  countryList.find((el) => el.slug === country)!.selected = true;

  return (
    <div className="w-full relative padding-x-3">
      {/* <div className="w-16 absolute inset-y-0 left-0 bg-white/30 backdrop-blur-sm"></div> */}
      <div
        // ref={scrollContainerRef}
        // onWheel={handleWheel}
        // onMouseDown={handleMouseDown}
        // onMouseLeave={handleMouseLeave}
        // onMouseUp={handleMouseUp}
        // onMouseMove={handleMouseMove}
        // className="w-full flex gap-3 pr-16 pb-4 overflow-x-scroll overscroll-x-auto scrollbar-transparent cursor-grab active:cursor-grabbing select-none"
        className="w-full flex justify-center gap-3 pb-4 flex-wrap"
      >
        {countryList.map((el, key) => (
          <Link
            className={twMerge(
              "border border-base-gray rounded-full px-5 py-1.5 text-nowrap",
              el?.selected ? "bg-base-text text-white" : "",
              "flex justify-center items-center gap-2"
            )}
            key={key}
            href={`/investment-tracker/${el.slug}`}
            scroll={false}
            // onClick={handleLinkClick}
          >
            {el?.noFlag ? (
              <p className="mr-1">{el.emoji}</p>
            ) : (
              <>
                {el?.iso2 && (
                  <img
                    className="w-6 h-4 p-0.5"
                    alt=""
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${el.iso2}.svg`}
                  />
                )}
              </>
            )}
            {/* <span>{el.emoji}</span> */}
            {el.label}
          </Link>
        ))}
      </div>
      {/* <div className="w-16 absolute inset-y-0 right-0 pointer-events-none bg-gradient-to-r from-white/0 to-white/100"></div> */}
    </div>
  );
}
