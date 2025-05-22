import SecondaryHero, {
  OverlayTheTFFFIdea,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";

export default function Page() {
  return (
    <div>
      <SecondaryHero OverlayComponent={<OverlayTheTFFFIdea />} />
      <Br />
    </div>
  );
}
