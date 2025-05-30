import { twMerge } from "tailwind-merge";

const countryList = [
  { label: "Germany", iso2: "DE", selected: true, emoji: "🇩🇪" },
  { label: "UK", iso2: "GB", emoji: "🇬🇧" },
  { label: "Norway", iso2: "NO", emoji: "🇳🇴" },
  { label: "France", iso2: "FR", emoji: "🇫🇷" },
  { label: "UAE", iso2: "AE", emoji: "🇦🇪" },
  { label: "Netherlands", iso2: "NL", emoji: "🇳🇱" },
  // { label: "🇪🇺 EU", iso2: "EU" },
  { label: "Singapore", iso2: "SG", emoji: "🇸🇬 " },
  { label: "Azerbaijan", iso2: "AZ", emoji: "🇦🇿 " },
];

export default function CountryListChips() {
  return (
    <div className="w-full relative">
      {/* <div className="w-16 absolute inset-y-0 left-0 bg-white/30 backdrop-blur-sm"></div> */}
      <div className="w-full flex gap-3 pr-16 pb-4 overflow-x-scroll overscroll-x-auto scrollbar-transparent">
        {countryList.map((el, key) => (
          <button
            className={twMerge(
              "border border-base-gray rounded-full px-5 py-1.5 text-nowrap",
              el?.selected ? "bg-base-text text-white" : "",
              "flex justify-center items-center gap-2"
            )}
            key={key}
          >
            <img
              className="w-6 h-4 p-0.5"
              alt=""
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${el.iso2}.svg`}
            />
            {/* <span>{el.emoji}</span> */}
            {el.label}
          </button>
        ))}
      </div>
      <div className="w-16 absolute inset-y-0 right-0 pointer-events-none bg-gradient-to-r from-white/0 to-white/100"></div>
    </div>
  );
}
