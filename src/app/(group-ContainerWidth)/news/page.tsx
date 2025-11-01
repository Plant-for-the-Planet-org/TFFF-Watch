import AllNews from "@/components/sections/features/news/AllNews";
import SecondaryHero, {
  OverlayNewsTFFFWatch,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News · TFFF Watch",
  description: ".",
};

export default function Page() {
  return (
    <div>
      <div>
        <SecondaryHero OverlayComponent={<OverlayNewsTFFFWatch />} />
        <Br />
        <AllNews />
        <Br />
      </div>
    </div>
  );
}
