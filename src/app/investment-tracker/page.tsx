import CountryListChips from "@/components/sections/features/CaountryListChips";
import InvestmentProgress from "@/components/sections/features/InvestmentProgress";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import Br from "@/components/ui/Br";

export default function Page() {
  // const investmentTrackerData =

  // try {
  //     newsList = await api<News[]>({
  //       url: urls.news,
  //       method: "GET",
  //       token: "", // Add token if required
  //     });
  //   } catch (error) {
  //     console.error("Error fetching news:", error);
  //     // Optionally, handle the error by returning an empty list or a fallback UI
  //   }

  return (
    <div>
      {/* <div className="extra-padding-x-4"> */}
      <div>
        <InvestmentTracker />
        <Br />
        <CountryListChips country="Germany" />
        <Br />
        <InvestmentProgress />
        <Br />
        {/* <InvestmentProcess /> */}
        <Br />
      </div>
    </div>
  );
}
