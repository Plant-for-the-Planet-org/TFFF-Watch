import Br from "@/components/ui/Br";
import Image from "next/image";
import HowTFFFWorksFlowChart from "@/components/sections/features/HowTFFFWorksFlowChart";
import HowTFFFWorksContent from "./HowTFFFWorksContent";

export default function HowTFFFWorks() {
  return (
    <div className="bg-primary-light rounding-xl padding-3">
      <Br cn="hidden lg:block" />

      <div className="text-center extra-padding-x-4">
        <h2 className="font-bold typo-h2">
          How the{" "}
          <span className="text-primary">Tropical Forest Forever Facility</span>{" "}
          would work
        </h2>
        <Br />
        <p className="typo-p text-justify">
          is a proposed global, permanent fund designed to support the long-term
          conservation of tropical forests. Spearheaded by the Government of
          Brazil, in dialogue with 11 other countries, the initiative is
          scheduled to be formally launched at COP30 in Belém, Brazil.
        </p>
        <Br />
        <p className="typo-p text-justify">
          Unlike traditional conservation finance efforts that often rely on new
          donor pledges, the TFFF proposes an innovative approach—mobilizing
          investments from governments, sovereign wealth funds and institutional
          investors to create a long-term investment facility that generates
          annual payments for forest conservation.
        </p>
      </div>
      <Br />

      <HowTFFFWorksFlowChart />
      <div id="recipients-from-tfff"></div>
      <Br />

      <div className="bg-[#E7F8EE] border-2 border-dashed border-[#6FCE97] rounding-lg padding-3">
        <div className="text-center">
          <h2 className="font-bold typo-h2">Example recipient country </h2>
          <p className="typo-p">73 countries are potentially eligible </p>
        </div>
        <Br />
        <div className="flex gap-2 sm:gap-4 md:gap-8 xl:gap-16 justify-between overflow-auto">
          <div>
            <Image
              width={358}
              height={374}
              src="/assets/brazil.png"
              alt="Brazil"
            />
          </div>
          <div>
            <Image
              width={1158}
              height={440}
              src="/assets/se-asia.png"
              alt="South East Asia"
            />
          </div>
          <div>
            <Image
              width={242}
              height={348}
              src="/assets/ghana.png"
              alt="Ghana"
            />
          </div>
        </div>
        <Br />
        <Br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3  md:items-center">
            <Image
              className="shrink-0 border border-base-gray rounded-lg bg-white w-10 h-10 p-2 md:w-14 md:h-14 md:p-3"
              width={32}
              height={32}
              src="/assets/minimum-requirements.svg"
              alt="Minimum requirements"
            />
            <div className="shrink">
              <h3 className="font-bold typo-p">Minimum requirements</h3>
              <p className="text-xs">
                Countries with moist tropical broadleaf forest and an annual
                deforestation rate below 0.5% can participate.
              </p>
            </div>
          </div>
          <div className="flex gap-3  md:items-center">
            <Image
              className="shrink-0 border border-base-gray rounded-lg bg-white w-10 h-10 p-2 md:w-14 md:h-14 md:p-3"
              width={32}
              height={32}
              src="/assets/base-payout.svg"
              alt="Base payout"
            />
            <div className="shrink">
              <h3 className="font-bold typo-p">Base payout</h3>
              <p className="text-xs">
                Every year, rainforest countries receive $4 for each hectare of
                intact forest, as measured by satellite data.
              </p>
            </div>
          </div>
          <div className="flex gap-3  md:items-center">
            <Image
              className="shrink-0 border border-base-gray rounded-lg bg-white w-10 h-10 p-2 md:w-14 md:h-14 md:p-3"
              width={32}
              height={32}
              src="/assets/discounts.svg"
              alt="Discounts"
            />
            <div className="shrink">
              <h3 className="font-bold typo-p">Discounts</h3>
              <p className="text-xs">
                For every hectare newly deforested, $400-$800 will be deducted,
                depending on the scale of deforestation and $100 is deducted for
                each hectare newly degraded.
              </p>
            </div>
          </div>
          <div className="flex gap-3  md:items-center">
            <Image
              className="shrink-0 border border-base-gray rounded-lg bg-white w-10 h-10 p-2 md:w-14 md:h-14 md:p-3"
              width={32}
              height={32}
              src="/assets/use-of-funds.svg"
              alt="Use of funds"
            />
            <div className="shrink">
              <h3 className="font-bold typo-p">Use of funds</h3>
              <ul className="text-xs list-disc ml-4.5">
                <li>
                  20% of the received money shall go to the country’s
                  IndigenousPeople and Local Communities.
                </li>
                <li>
                  Rainforest countries are encouraged, but not required, tospend
                  the rest on conservation.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Br />

      <Br />
      <Br />
      <HowTFFFWorksContent />
    </div>
  );
}
