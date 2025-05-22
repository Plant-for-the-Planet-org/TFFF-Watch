import SecondaryHero, {
  OverlayAboutTFFFWatch,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";

export default function Page() {
  return (
    <div>
      <SecondaryHero OverlayComponent={<OverlayAboutTFFFWatch />} />
      <Br />
    </div>
  );
}
