import CountryListChips from "@/components/sections/features/CaountryListChips";
import InvestmentProcess from "@/components/sections/features/InvestmentProcess";
import InvestmentProgress from "@/components/sections/features/InvestmentProgress";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import Br from "@/components/ui/Br";

export default function Page() {
  return (
    <div>
      <div className="extra-padding-x-4">
        <InvestmentTracker />
        <Br />
        <CountryListChips />
        <Br />
        <InvestmentProgress />
        <Br />
        <InvestmentProcess />
        <Br />
      </div>
    </div>
  );
}
