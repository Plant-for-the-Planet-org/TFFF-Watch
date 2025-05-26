import Br from "@/components/ui/Br";
import PotentialPayoutVsExistingConservationFundingBarChart from "../charts/PotentialPayoutVsExistingConservationFundingBarChart";

export default function PotentialPayoutVsExistingConservationFunding() {
  return (
    <div className="bg-secondary-light rounding-xl padding-3">
      <Br />
      <div className="text-center">
        <h2 className="type-h2">
          <b>Potential TFFF Payout vs Existing Conservation Funding</b>
        </h2>
      </div>
      <Br />
      <PotentialPayoutVsExistingConservationFundingBarChart />
      <Br />
    </div>
  );
}
