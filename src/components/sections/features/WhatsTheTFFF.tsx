import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";

export default function WhatsTheTFFF() {
  return (
    <div className="border border-base-gray rounding-xl padding-3 text-center">
      <div className="h-full flex flex-col justify-between">
        <div>
          <h2 className="font-bold typo-h2">What’s the TFFF?</h2>
          <Br />
          <p className="xl:max-w-[33vw] mx-auto typo-p">
            The Tropical Forest Forever Facility (TFFF) is a proposed investment
            fund. The profits of the fund are intended to reward tropical
            rainforest countries for protecting their tropical and sub-tropical
            moist broadleaf forest.
          </p>
        </div>
        <Br />
        <div className="xl:max-w-[30vw] self-center-safe text-center">
          <Button external>About the Fund</Button>
        </div>
      </div>
    </div>
  );
}
