import CountryListChips from "@/components/sections/features/CaountryListChips";
import InvestmentProgress from "@/components/sections/features/InvestmentProgress";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import Br from "@/components/ui/Br";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Tracker",
  description: "Investment Tracker",
};

export default function Page() {
  return (
    <div>
      {/* <div className="extra-padding-x-4"> */}
      <div>
        <InvestmentTracker />
        <Br />
        <CountryListChips country="Germany" />
        <Br />
        <InvestmentProgress />
        <Br />
        {/* <InvestmentProcess /> */}
        <Br />
      </div>
    </div>
  );
}
