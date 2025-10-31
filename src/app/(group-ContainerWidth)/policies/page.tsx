import SecondaryHero, {
  OverlayPoliciesTFFFWatch,
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
        <SecondaryHero OverlayComponent={<OverlayPoliciesTFFFWatch />} />
        <Br />

        <Br />
      </div>
    </div>
  );
}
