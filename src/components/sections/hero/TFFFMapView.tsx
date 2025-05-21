import { PrimaryHeaderContent } from "./TFFFMapViewContent";

export default function TFFFMapView() {
  return (
    <Container>
      <PrimaryHeaderContent />
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary-light rounding-xl padding-3 h-[80vh]">
      <div>{children}</div>
    </div>
  );
}
