import { ISO2Param } from "@/components/HeaderCountry";
import ForestCoverChange from "@/components/sections/features/ForestCoverChange";
import PotentialPayoutVsExistingConservationFunding from "@/components/sections/features/PotentialPayoutVsExistingConservationFunding";
import { TFFFCountryMapView } from "@/components/sections/hero/TFFFMapView";
import Br from "@/components/ui/Br";

type Props = {
  params: Promise<ISO2Param>;
};

export default async function Page({ params }: Props) {
  const { iso } = await params;
  // console.log(new Intl.DisplayNames(["en"], { type: "region" }).of(iso));

  return (
    <div>
      <TFFFCountryMapView iso2={iso.toUpperCase()} />
      <Br />
      <ForestCoverChange />
      <Br />
      <PotentialPayoutVsExistingConservationFunding />
    </div>
  );
}
