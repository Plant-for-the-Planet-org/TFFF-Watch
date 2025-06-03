import PressContacts from "@/components/sections/features/PressContacts";
import PressReleases from "@/components/sections/features/PressReleases";
import SecondaryHero, {
  OverlayPressTFFFWatch,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";

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
