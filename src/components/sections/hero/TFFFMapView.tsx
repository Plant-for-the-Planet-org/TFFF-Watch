import CountryMapView from "@/components/maps/CountryMapView";
import Br from "@/components/ui/Br";
import { PrimaryHeaderContent } from "./TFFFMapViewContent";

export default function TFFFMapView() {
  return (
    <Container>
      <div className="h-full flex flex-col">
        <Br />
        <PrimaryHeaderContent />
        <Br />
        <div className="grow">
          {/* <WorldMapView /> */}
          <CountryMapView iso2="BR" />
        </div>
      </div>
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary-light rounding-xl padding-3 h-[85vh]">
      {children}
    </div>
  );
}
