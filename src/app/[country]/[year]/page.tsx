import ForestCoverChange from "@/components/sections/features/ForestCoverChange";
import PotentialPayoutVsExistingConservationFunding from "@/components/sections/features/PotentialPayoutVsExistingConservationFunding";
import { TFFFCountryMapView } from "@/components/sections/hero/TFFFMapView";
import Br from "@/components/ui/Br";
import { getCountryDetails } from "@/utils/country-helper";

export type PageParams = {
  country: string;
  year: string;
};

type Props = {
  // params: Promise<Partial<ISO2Param & CountryParam>>;
  params: Promise<PageParams>;
};

export default async function Page({ params }: Props) {
  const { country, year } = await params;

  const details = getCountryDetails(country);

  return (
    <div>
      <TFFFCountryMapView year={year} {...details} />
      <Br />
      <ForestCoverChange />
      <Br />
      <PotentialPayoutVsExistingConservationFunding />
    </div>
  );
}
