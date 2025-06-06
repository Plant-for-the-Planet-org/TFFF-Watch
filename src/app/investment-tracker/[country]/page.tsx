import CountryListChips from "@/components/sections/features/CaountryListChips";
import InvestmentProcess from "@/components/sections/features/InvestmentProcess";
import InvestmentProgress from "@/components/sections/features/InvestmentProgress";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import Br from "@/components/ui/Br";
import { api, urls } from "@/utils/axios-helper";
import { InvestmentTrackerForCountry } from "@/utils/types";
import { Metadata } from "next";
import { capitalize } from "underscore.string";

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  return [{ country: "Germany" }, { country: "Norway" }, { country: "France" }];
}

type PageProps = {
  params: Promise<{
    country: string;
  }>;
};

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country } = await params;

  return {
    title: `${capitalize(country)} | Investment Tracker`,
    description: `Investment Tracker for ${country}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { country } = await params;

  let data: InvestmentTrackerForCountry | null = null;

  try {
    const results = await api<InvestmentTrackerForCountry[]>({
      url: urls.investmentTracker,
      query: { country: capitalize(country) },
      method: "GET",
      token: "",
    });
    data = results[0];
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  if (!data) return null;
  return (
    <div>
      {/* <div className="extra-padding-x-4"> */}
      <div>
        <InvestmentTracker />
        <Br />
        <CountryListChips country={capitalize(country)} />
        <Br />
        <InvestmentProgress investment_stage={data.investment_stage} />
        <Br />
        <InvestmentProcess
          status={data.status}
          background={data.background}
          endorsements={data.endorsements}
          CSOs={data.CSOs}
          how_an_investment_could_work={data.How_an_investment_could_work}
          responsibile_government_office={data.responsibile_government_office}
        />
        <Br />
      </div>
    </div>
  );
}
