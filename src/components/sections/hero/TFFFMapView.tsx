import CountryMapView from "@/components/maps/CountryMapView";
import WorldMapView from "@/components/maps/WorldMapView";
import Br from "@/components/ui/Br";
import { WorldMapHeaderContent } from "@/components/sections/hero/TFFFMapViewContent";
import type { Props as CountryMapViewProps } from "@/components/maps/CountryMapView";
import CountryTFFFCard from "@/components/maps/CountryTFFFCard";
import CountryTFFFInvestmentCard from "@/components/maps/CountryTFFFInvestmentCard";

export function TFFFWorldMapView() {
  return (
    <Container>
      <div className="h-full flex flex-col">
        <Br />
        <WorldMapHeaderContent />
        <Br />
        <div className="grow relative">
          <div className="absolute left-0 top-0 z-20">
            <CountryTFFFCard />
            <CountryTFFFInvestmentCard />
          </div>
          <WorldMapView />
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
    <div className="bg-primary-light md:rounded-2xl lg:rounded-3xl -mx-2 md:m-auto md:p-4 lg:p-5 xl:p-6 h-[90vh] md:h-[88vh]">
      {children}
    </div>
  );
}
