import CountryListChips from "@/components/sections/features/CountryListChips";
import InvestmentProgress from "@/components/sections/features/InvestmentProgress";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import InvestmentTrackerContent from "@/components/sections/features/InvestmentTrackerContent";
import Br from "@/components/ui/Br";
import { api, urls } from "@/utils/axios-helper";
import { PageError } from "@/utils/errors";
import {
  InvestmentTrackerForCountry,
  InvestmentTrackerSum,
} from "@/utils/types";
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
  "Indonesia",
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
  let richData: InvestmentTrackerForCountry | null = null;

  let chartData: null | {
    invested: number;
    pledged: number;
  } = null;

  try {
    const results = await api<InvestmentTrackerForCountry[]>({
      url: urls.investmentTracker,
      query: { country: capitalize(country) },
      method: "GET",
      token: "",
    });
    data = results[0];

    const res = await api<InvestmentTrackerForCountry[]>({
      url: urls.investmentTrackerRich,
      query: { country: capitalize(country) },
      method: "GET",
      token: "",
    });
    richData = res[0];

    const chartDataresult = await api<InvestmentTrackerSum[]>({
      url: urls.investmentTrackerSum,
      method: "GET",
      token: "",
    });

    chartData = {
      invested: chartDataresult[0].sum_invested_capital,
      pledged: chartDataresult[0].sum_pledged_capital,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  if (!data) return null;
  return (
    <div>
      <div>
        {chartData && (
          <InvestmentTracker
            invested={chartData.invested}
            pledged={chartData.pledged}
          />
        )}
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
          last_updated={richData?.last_updated}
          status={richData?.status ?? ""}
          background={richData?.background ?? ""}
          endorsements={richData?.endorsements ?? ""}
          CSOs={richData?.CSOs ?? ""}
          how_an_investment_could_work={
            richData?.How_an_investment_could_work ?? ""
          }
          responsibile_government_office={
            richData?.responsibile_government_office ?? ""
          }
        />
        <Br />
      </div>
    </div>
  );
}
