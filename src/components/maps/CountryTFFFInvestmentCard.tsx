import Br from "@/components/ui/Br";
import { Button } from "../ui/Button";

export default function CountryTFFFInvestmentCard() {
  return (
    <div className="w-3xs p-1 sm:p-2 padding-2 rounding-xl shadow-custom bg-white text-xs sm:text-sm">
      <div className="text-center">
        <p>🇦🇪 UAE</p>
        <p>$1.25 bn invested</p>
        <p>in 2024</p>
      </div>
      <Br />
      <Button cn="min-w-32 w-full" type="link" external>
        All Investments
      </Button>
    </div>
  );
}
