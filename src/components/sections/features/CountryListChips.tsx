import { InvesmentTrackerParams } from "@/utils/prop-types";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = InvesmentTrackerParams & {};

export default function CountryListChips({ country }: Props) {
  const countryList = [
    { label: "Germany", iso2: "DE", emoji: "🇩🇪", selected: false },
    { label: "Norway", iso2: "NO", emoji: "🇳🇴", selected: false },
    { label: "France", iso2: "FR", emoji: "🇫🇷", selected: false },
    { label: "UK", iso2: "GB", emoji: "🇬🇧", selected: false },
    { label: "UAE", iso2: "AE", emoji: "🇦🇪", selected: false },
    // { label: "Netherlands", iso2: "NL", emoji: "🇳🇱", selected: false },
    // { label: "Singapore", iso2: "SG", emoji: "🇸🇬", selected: false },
    { label: "EU", iso2: "EU", emoji: "🇪🇺", noFlag: true, selected: false },
    { label: "Brazil", iso2: "BR", emoji: "🇧🇷", selected: false },
    { label: "China", iso2: "CN", emoji: "🇨🇳", selected: false },
    { label: "Indonesia", iso2: "ID", emoji: "🇮🇩", selected: false },
    // { label: "Azerbaijan", iso2: "AZ", emoji: "🇦🇿", selected: false },
    { label: "Others", iso2: "OT", emoji: "🌍", noFlag: true, selected: false },
  ];
  countryList.find((el) => el.label === country)!.selected = true;

  return (
    <div className="w-full relative padding-x-3">
      {/* <div className="w-16 absolute inset-y-0 left-0 bg-white/30 backdrop-blur-sm"></div> */}
      <div className="w-full flex gap-3 pr-16 pb-4 overflow-x-scroll overscroll-x-auto scrollbar-transparent">
        {countryList.map((el, key) => (
          <Link
            className={twMerge(
              "border border-base-gray rounded-full px-5 py-1.5 text-nowrap",
              el?.selected ? "bg-base-text text-white" : "",
              "flex justify-center items-center gap-2"
            )}
            key={key}
            href={`/investment-tracker/${el.label}`}
            scroll={false}
          >
            {el?.noFlag ? (
              <p className="mr-1">{el.emoji}</p>
            ) : (
              <img
                className="w-6 h-4 p-0.5"
                alt=""
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${el.iso2}.svg`}
              />
            )}
            {/* <span>{el.emoji}</span> */}
            {el.label}
          </Link>
        ))}
      </div>
      <div className="w-16 absolute inset-y-0 right-0 pointer-events-none bg-gradient-to-r from-white/0 to-white/100"></div>
    </div>
  );
}
