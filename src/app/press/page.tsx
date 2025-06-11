import PressContacts from "@/components/sections/features/PressContacts";
import PressReleases from "@/components/sections/features/PressReleases";
import SecondaryHero, {
  OverlayPressTFFFWatch,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press · TFFF Watch",
  description: "Access press releases and contact us for press inquiries.",
};

export default function Page() {
  return (
    <div>
      <div>
        <SecondaryHero OverlayComponent={<OverlayPressTFFFWatch />} />
        <Br />
        <PressContacts />
        <Br />
        <PressReleases />
      </div>
    </div>
  );
}
