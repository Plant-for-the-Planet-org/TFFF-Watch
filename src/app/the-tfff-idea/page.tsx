import HowTFFFWorks from "@/components/sections/features/HowTFFFWorks";
import SecondaryHero, {
  OverlayTheTFFFIdea,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";

export default function Page() {
  return (
    <div>
      <div className="extra-padding-x-4">
        <SecondaryHero OverlayComponent={<OverlayTheTFFFIdea />} />
        <Br />
        <HowTFFFWorks />
      </div>
    </div>
  );
}
