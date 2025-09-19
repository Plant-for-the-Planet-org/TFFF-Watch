import InfoGrid from "@/components/sections/features/InfoGrid";
import InvestmentTrackerHome from "@/components/sections/features/InvestmentTrackerHome";
import NewsLetter from "@/components/sections/features/NewsLetter";
import RecentNews from "@/components/sections/features/RecentNews";
import RecentPolicyPapersComentary from "@/components/sections/features/RecentPolicyPapersCommentary";
import TFFFHero from "@/components/sections/features/TFFFHero";
import { TFFFWorldMapView } from "@/components/sections/hero/TFFFMapView";
import Br from "@/components/ui/Br";
// import { getConsent } from "@/utils/cookies";

export default function Home() {
  // const consent = getConsent();

  return (
    <div>
      <TFFFHero />
      <div className="website-container">
        <Br />
        <TFFFWorldMapView />
        <Br />
        <InvestmentTrackerHome invested={0} pledged={0} target={25000000000} />
        <Br />
        <InfoGrid />
        <Br />
        <RecentNews />
        <Br />
        <RecentPolicyPapersComentary />
        <Br />
        <NewsLetter />
      </div>
    </div>
  );
}
