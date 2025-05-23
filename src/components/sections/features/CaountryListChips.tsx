const countryList = [
  { label: "🇩🇪 Germany" },
  { label: "🇬🇧 UK" },
  { label: "🇳🇴 Norway" },
  { label: "🇫🇷 France" },
  { label: "🇦🇪 UAE" },
  { label: "🇳🇱 Netherlands" },
  { label: "🇪🇺 EU" },
  { label: "🇸🇬 Singapore" },
  { label: "🇦🇿 Azerbaijan" },
];

export default function CountryListChips() {
  return (
    <div className="w-full relative">
      {/* <div className="w-16 absolute inset-y-0 left-0 bg-white/30 backdrop-blur-sm"></div> */}
      <div className="w-full flex gap-3 pr-16 pb-4 overflow-x-scroll overscroll-x-auto scrollbar-transparent">
        {countryList.map((el, key) => (
          <button
            className="border border-base-gray rounded-full px-5 py-1.5 text-nowrap"
            key={key}
          >
            {el.label}
          </button>
        ))}
      </div>
      <div className="w-16 absolute inset-y-0 right-0 pointer-events-none bg-gradient-to-r from-white/0 to-white/100"></div>
    </div>
  );
}
