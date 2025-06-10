import AnnualPayout from "@/components/sections/features/AnnualPayout";
import ForestCoverChange from "@/components/sections/features/ForestCoverChange";
import PotentialPayoutVsExistingConservationFunding from "@/components/sections/features/PotentialPayoutVsExistingConservationFunding";
import { TFFFCountryMapView } from "@/components/sections/hero/TFFFMapView";
import Br from "@/components/ui/Br";
import { getCountryDetails } from "@/utils/country-helper";
import { fetchForestChangeData } from "@/utils/forestChange.store";

export type PageParams = {
  country: string;
  year: string;
};

type Props = {
  params: Promise<PageParams>;
};

export default async function Page({ params }: Props) {
  const { country, year } = await params;

  const details = getCountryDetails(country);

  await fetchForestChangeData(details.name);

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
