import CurrentRewardsChart from "./CurrentRewardsChart";
import MaximumRewardsChart from "./MaximumRewardsChart";

export default function RewardsChart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CurrentRewardsChart />
      <MaximumRewardsChart />
    </div>
  );
}
