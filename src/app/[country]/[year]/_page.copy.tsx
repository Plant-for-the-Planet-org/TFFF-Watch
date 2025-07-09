import AnnualPayout from "@/components/sections/features/AnnualPayout";
import ForestCoverChange from "@/components/sections/features/ForestCoverChange";
import PotentialPayoutVsExistingConservationFunding from "@/components/sections/features/PotentialPayoutVsExistingConservationFunding";
import { TFFFCountryMapView } from "@/components/sections/hero/TFFFMapView";
import Br from "@/components/ui/Br";
import { getCountryDetails } from "@/utils/country-helper";
import { fetchForestCoverChangeData } from "@/utils/forestChange.store";
import { Metadata } from "next";
import { capitalize } from "underscore.string";

export type PageParams = {
  country: string;
  year: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country } = await params;

  return {
    title: `${capitalize(country)} · TFFF Watch`,
    description: `How much would ${capitalize(country)} receive from the TFFF?`,
  };
}

export default async function Page({ params }: PageProps) {
  const { country, year } = await params;

  const details = getCountryDetails(country);

  await fetchForestCoverChangeData(details.name);

  return (
    <div>
      <TFFFCountryMapView
        year={year}
        name={details.name}
        iso2={details.iso2}
        iso3={details.iso3}
        flagImgUrl={details.flagImgUrl}
      />
      <Br />
      <ForestCoverChange />
      <Br />
      <PotentialPayoutVsExistingConservationFunding />
      <Br />
      <AnnualPayout />
    </div>
  );
}
