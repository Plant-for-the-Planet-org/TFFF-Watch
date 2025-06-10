import type { Props as CountryMapViewProps } from "@/components/maps/CountryMapView";
import CountryMapView from "@/components/maps/CountryMapView";
import CountryTFFFCard from "@/components/maps/CountryTFFFCard";
import {
  CountryMapLegends,
  LegendForDegradedOrDeforested,
  LegendForSponsorCapitalProviders,
} from "@/components/maps/MapLegends";
import WorldMapTFFFCard from "@/components/maps/WorldMapTFFFCard";
import WorldMapView from "@/components/maps/WorldMapView";
import {
  CountryMapHeaderContent,
  WorldMapHeaderContent,
} from "@/components/sections/hero/TFFFMapViewContent";
import Br from "@/components/ui/Br";
import { CountryDetails } from "@/utils/country-helper";

export function TFFFWorldMapView() {
  return (
    <WorldMapViewContainer>
      <div className="h-full flex flex-col">
        {/* <Br /> */}
        <BetaChip />
        <WorldMapHeaderContent />
        <Br />
        <div className="grow relative flex flex-col">
          {/* <div className="mx-auto h-3/4 w-full lg:h-full lg:w-auto aspect-[198/120] border border-black"> */}
          <div className="mx-auto aspect-[1.5] w-full h-full max-w-full max-h-full object-contain relative">
            <WorldMapView />
            <WorldMapTFFFCard />
          </div>
          <div className="md:absolute left-3 bottom-6 min-w-48 max-w-fit mx-auto">
            <Br cn="md:hidden" />
            <LegendForDegradedOrDeforested />
            <Br />
            <LegendForSponsorCapitalProviders />
            <Br cn="md:hidden" />
          </div>
          {/* <div className="absolute left-0 top-0 z-20">
            <CountryTFFFCard />
            <CountryTFFFInvestmentCard />
          </div> */}
        </div>
      </div>
    </WorldMapViewContainer>
  );
}

type TFFFCountryMapViewProps = CountryMapViewProps &
  CountryDetails & {
    year: string;
  };

export function TFFFCountryMapView(props: TFFFCountryMapViewProps) {
  return (
    <CountryMapViewContainer>
      <div className="h-full flex flex-col">
        <Br />
        <CountryMapHeaderContent year={props.year} />
        <Br />
        <div className="grow grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-60 md:h-full">
            <div className="absolute bottom-0 z-20">
              <CountryMapLegends />
            </div>
            <CountryMapView iso2={props.iso2} />
          </div>
          <div className="flex justify-center items-center">
            <CountryTFFFCard {...props} />
          </div>
        </div>
      </div>
    </CountryMapViewContainer>
  );
}

function WorldMapViewContainer({ children }: { children: React.ReactNode }) {
  return (
    // <div className="bg-primary-light outer-rounding outer-padding-3 h-[90vh] md:h-[85vh] lg:h-[80vh] xl:h-[75vh] min-h-fit">
    <div className="bg-primary-light outer-rounding outer-padding-3 max-h-full">
      {children}
    </div>
  );
}

function CountryMapViewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary-light outer-rounding outer-padding-3 h-[90vh] md:h-[85vh] lg:h-[80vh] xl:h-[75vh] min-h-fit">
      {/* <div className="bg-primary-light outer-rounding outer-padding-3 max-h-full"> */}
      {children}
    </div>
  );
}

export function BetaChip() {
  return (
    <div className="self-start bg-white text-primary text-xs py-0.5 px-2 rounded-full shadow-xl">
      BETA
    </div>
  );
}
