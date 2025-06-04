import HowTFFFWorks from "@/components/sections/features/HowTFFFWorks";
import InterestedInDivingDeeper from "@/components/sections/features/InterestedInDivingDeeper";
import SecondaryHero, {
  OverlayTheTFFFIdea,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The TFFF Idea",
  description: "The TFFF Idea",
};

export default function Page() {
  return (
    <div>
      {/* <div className="extra-padding-x-4"> */}
      <div>
        <SecondaryHero OverlayComponent={<OverlayTheTFFFIdea />} />
        <Br />
        <HowTFFFWorks />
        <Br />
        <InterestedInDivingDeeper />
      </div>
    </div>
  );
}
