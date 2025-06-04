import CountryListChips from "@/components/sections/features/CaountryListChips";
import InvestmentProcess from "@/components/sections/features/InvestmentProcess";
import InvestmentProgress from "@/components/sections/features/InvestmentProgress";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import Br from "@/components/ui/Br";

export async function generateStaticParams() {
  return [{ country: "Germany" }, { country: "Norway" }, { country: "France" }];
}

type PageProps = {
  params: Promise<{
    country: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { country } = await params;
  console.log({ country });

  return (
    <div>
      {/* <div className="extra-padding-x-4"> */}
      <div>
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
