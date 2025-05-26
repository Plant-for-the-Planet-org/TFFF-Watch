import InfoGrid from "@/components/sections/features/InfoGrid";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import NewsLetter from "@/components/sections/features/NewsLetter";
import RecentNews from "@/components/sections/features/RecentNews";
import RecentPolicyPapersComentary from "@/components/sections/features/RecentPolicyPapersCommentary";
import Br from "@/components/ui/Br";

export default function Page() {
  return (
    <div>
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
