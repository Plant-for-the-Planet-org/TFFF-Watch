import { twMerge } from "tailwind-merge";

export function LegendForDegradedOrDeforested() {
  return (
    <div className="text-center">
      <p className="typo-p mb-2">% degraded or deforested</p>
      <div className="rounded-full h-2 w-full  bg-[linear-gradient(90deg,_#FFFFFF_0%,_#F2994A_39.76%,_#EB5757_66.23%,_#C90F0F_100%)]"></div>
      <div className="flex justify-between typo-p">
        <span>0%</span>
        <span>2%</span>
      </div>
    </div>
  );
}
export function LegendForSponsorCapitalProviders() {
  return (
    <div className="text-center">
      <p className="typo-p mb-2">Sponsor Capital Providers</p>

      <div className="rounded-full h-2 w-full bg-[#2F80ED]"></div>
    </div>
  );
}

export function CountryMapLegends() {
  return (
    <div className="flex typo-p">
      <div className="font-thin">
        <div className="flex gap-2 items-center">
          <div className={twMerge("w-6 h-4", `bg-[#6FCF97]`)}></div>
          <p>Intact Forest</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className={twMerge("w-6 h-4", `bg-[#EB5756]`)}></div>
          <p>Deforested</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className={twMerge("w-6 h-4", `bg-[#F1994A]`)}></div>
          <p>Degraded</p>
        </div>
        {/* <div className="flex gap-2 items-center">
          <div className={twMerge("w-6 h-4", `bg-[#2C9CDB]`)}></div>
          <p>Restored</p>
        </div> */}
      </div>
    </div>
  );
}
