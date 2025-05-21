import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfoGrid from "@/components/sections/features/InfoGrid";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import NewsLetter from "@/components/sections/features/NewsLetter";
import RecentNews from "@/components/sections/features/RecentNews";
import RecentPolicyPapersComentary from "@/components/sections/features/RecentPolicyPapersCommentary";
import TFFFMapView from "@/components/sections/hero/TFFFMapView";
import Br from "@/components/ui/Br";

export default function Home() {
  return (
    // <div className="container mx-auto">
    <div className="mx-auto padding-x-2">
      <Header />
      <Br />
      <TFFFMapView />
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
      <Br />
      <Footer />
    </div>
  );
}
