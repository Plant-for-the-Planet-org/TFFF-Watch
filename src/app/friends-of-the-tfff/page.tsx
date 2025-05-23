import EngagingNGOs from "@/components/sections/features/EngagingNGOs";
import FriendsInGermany from "@/components/sections/features/FriendsInGermany";
import SecondaryHero, {
  OverlayFriendsOfTheTFFF,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";

export default function Page() {
  return (
    <div className="extra-padding-x-4">
      <SecondaryHero OverlayComponent={<OverlayFriendsOfTheTFFF />} />
      <Br />
      <EngagingNGOs />
      <Br />
      <FriendsInGermany />
      <Br />
    </div>
  );
}
