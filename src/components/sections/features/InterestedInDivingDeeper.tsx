import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function InterestedInDivingDeeper() {
  return (
    <div className="border border-base-gray rounding-xl padding-3">
      <div className="md:grid gap-y-4 grid-cols-1 md:grid-cols-6 flex flex-col items-center extra-padding-x-4">
        <div className="col-span-4 flex flex-col items-center md:block">
          <h2 className="font-bold typo-h2">Interested in diving deeper?</h2>
          <Br />
          <div className="flex flex-col md:flex-row gap-3 flex-wrap items-center">
            <Button cn="bg-theme-text" type="link" external>
              TFFF Concept Note 2.0
            </Button>
            <Button cn="bg-theme-base" type="link" external>
              TFFF Website
            </Button>
          </div>
        </div>
        <div className="w-full col-span-2 bg-primary-light rounding-lg padding-4 flex justify-center">
          <Image width={268} height={103} src="/assets/TFFF.svg" alt="TFFF" />
        </div>
      </div>
    </div>
  );
}
