import Br from "../ui/Br";

export function LegendForDegradedOrDeforested() {
  return (
    <div className="text-center">
      <p className="typo-p mb-2">% degraded or deforested</p>
      <Br />
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
