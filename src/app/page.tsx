import InfoGrid from "@/components/sections/features/InfoGrid";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import NewsLetter from "@/components/sections/features/NewsLetter";
import RecentNews from "@/components/sections/features/RecentNews";
import RecentPolicyPapersComentary from "@/components/sections/features/RecentPolicyPapersCommentary";
import TFFFHero from "@/components/sections/features/TFFFHero";
import { TFFFWorldMapView } from "@/components/sections/hero/TFFFMapView";
import Br from "@/components/ui/Br";

export default function Home() {
  return (
    <div>
      <TFFFHero />
      <Br />
      <TFFFWorldMapView />
      <Br />
      <InvestmentTracker />
      <Br />
      <InfoGrid />
      <Br />
      <RecentNews />
      <Br />
      <RecentPolicyPapersComentary />
      <Br />
      <NewsLetter />
    </div>
  );
}
