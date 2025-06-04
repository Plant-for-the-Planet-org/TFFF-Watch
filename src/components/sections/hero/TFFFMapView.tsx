import CountryMapView from "@/components/maps/CountryMapView";
import WorldMapView from "@/components/maps/WorldMapView";
import Br from "@/components/ui/Br";
import { WorldMapHeaderContent } from "@/components/sections/hero/TFFFMapViewContent";
import type { Props as CountryMapViewProps } from "@/components/maps/CountryMapView";
import CountryTFFFCard from "@/components/maps/CountryTFFFCard";
import CountryTFFFInvestmentCard from "@/components/maps/CountryTFFFInvestmentCard";
import {
  LegendForDegradedOrDeforested,
  LegendForSponsorCapitalProviders,
} from "@/components/maps/MapLegends";

export function TFFFWorldMapView() {
  return (
    <Container>
      <div className="h-full flex flex-col">
        <Br />
        <WorldMapHeaderContent />
        <Br />
        <div className="grow relative flex flex-col">
          <div className="mx-auto h-3/4 w-full lg:h-full lg:w-auto aspect-[198/120]">
            <WorldMapView />
          </div>
          <div className="md:absolute left-3 bottom-6 min-w-48 max-w-fit mx-auto">
            <div className="md:hidden">
              <Br />
            </div>
            <LegendForDegradedOrDeforested />
            <Br />
            <LegendForSponsorCapitalProviders />
          </div>
          <div className="absolute left-0 top-0 z-20">
            <CountryTFFFCard />
            <CountryTFFFInvestmentCard />
          </div>
        </div>
      </div>
    </Container>
  );
}

type TFFFCountryMapViewProps = CountryMapViewProps & {};
export function TFFFCountryMapView(props: TFFFCountryMapViewProps) {
  return (
    <Container>
      <div className="h-full flex flex-col">
        <Br />
        <WorldMapHeaderContent />
        <Br />
        <div className="grow">
          <CountryMapView {...props} />
        </div>
      </div>
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary-light outer-rounding-xl outer-padding-3 h-[90vh] md:h-[88vh]">
      {children}
    </div>
  );
}
