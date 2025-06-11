import AboutTFFFWatch from "@/components/sections/features/AboutTFFFWatch";
import SecondaryHero, {
  OverlayAboutTFFFWatch,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TFFF Watch",
  description: "About TFFF Watch",
};

export default function Page() {
  return (
    // <div className="extra-padding-x-4">
    <div>
      <SecondaryHero OverlayComponent={<OverlayAboutTFFFWatch />} />
      <Br />
      <AboutTFFFWatch />
    </div>
  );
}
