import InfoGrid from "@/components/sections/features/InfoGrid";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import PlansforthePlanetAnalysis from "@/components/sections/features/press/PlansforthePlanetAnalysis";
import RecentNews from "@/components/sections/features/news/RecentNews";
import RecentPolicyPapersComentary from "@/components/sections/features/policies/RecentPolicyPapersCommentary";
import TFFFHero from "@/components/sections/features/TFFFHero";
import WhatsAppInvite from "@/components/sections/features/WhatsAppInvite";
import { TFFFWorldMapView } from "@/components/sections/hero/TFFFMapView";
import Br from "@/components/ui/Br";

export default function Home() {
  return (
    <div>
      <TFFFHero />
      <div className="website-container">
        <Br />
        <InvestmentTracker />
        <Br />
        <TFFFWorldMapView />
        <Br />
        <InfoGrid />
        <Br />
        <RecentNews />
        <Br />
        <RecentPolicyPapersComentary />
        <Br />
        <PlansforthePlanetAnalysis />
        <Br />
        <WhatsAppInvite />
      </div>
    </div>
  );
}
