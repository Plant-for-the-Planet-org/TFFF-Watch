import CountryListChips from "@/components/sections/features/CaountryListChips";
import InvestmentProgress from "@/components/sections/features/InvestmentProgress";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import InvestmentTrackerContent from "@/components/sections/features/InvestmentTrackerContent";
import Br from "@/components/ui/Br";
import { api, urls } from "@/utils/axios-helper";
import { PageError } from "@/utils/errors";
import { InvestmentTrackerForCountry } from "@/utils/types";
import { Metadata } from "next";
import { capitalize } from "underscore.string";

const investingCountries = [
  "Germany",
  "Norway",
  "France",
  "UK",
  "UAE",
  // "Netherlands",
  // "Singapore",
  // "EU",
  "Brazil",
  "China",
  "Others",
];

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  return investingCountries.map((el) => ({ country: el }));
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
    title: `${capitalize(country)} Investment Tracker · TFFF Watch`,
    description: `Is ${capitalize(
      country
    )} contributing to the Tropical Forest Forever Facility?`,
  };
}

export default async function Page({ params }: PageProps) {
  const { country } = await params;

  if (
    !investingCountries.find((el) => el.toLowerCase() === country.toLowerCase())
  ) {
    const err = `We do not have investment data for ${country}. The data might not be available yet, or the country hasn’t been included in
the current analysis.`;
    throw new PageError("Country data not found", {
      code: "404",
      details: err,
    });
  }

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
      <div>
        <InvestmentTracker />
        <Br />
        <CountryListChips country={capitalize(country)} />
        <Br />
        {country !== investingCountries.at(-1) && (
          <>
            <InvestmentProgress investment_stage={data.investment_stage} />
            <Br />
          </>
        )}
        <InvestmentTrackerContent
          last_updated={data.last_updated}
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
