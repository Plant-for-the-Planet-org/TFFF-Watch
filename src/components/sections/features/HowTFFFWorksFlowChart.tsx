import Br from "@/components/ui/Br";
import Image from "next/image";

export default function HowTFFFWorksFlowChart() {
  return (
    <div className="padding-3">
      <div className="max-w-3xl mx-auto border border-dashed border-primary rounding-xl padding-2">
        <h3 className="font-bold typo-h3 text-center">Investors</h3>
        <Br />
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <div className="border border-base-gray p-2 rounded-xl bg-white flex gap-2 items-center">
            <Image
              className="flex-1/5 bg-[#EEF5FF] aspect-square p-2 rounded-md"
              width={52}
              height={36}
              src="/assets/sponsors.svg"
              alt="Sponsors"
            />
            <div className="flex-4/5">
              <p className="typo-p">Sponsors</p>
              <p className="text-xs">(governments & foundations)</p>
            </div>
          </div>
          <div className="border border-base-gray p-2 rounded-xl bg-white flex gap-2 items-center">
            <Image
              className="flex-1/5 bg-[#EEF5FF] aspect-square p-2 rounded-md"
              width={36}
              height={52}
              src="/assets/financial-markets.svg"
              alt="Financial markets"
            />
            <div className="flex-4/5">
              <p className="typo-p">Financial markets</p>
              <p className="text-xs">
                (e.g. institutional investors, sovereign wealth funds,
                endowments)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="m-2 max-w-2xl mx-auto grid grid-cols-2">
        <div className="w-full md:w-2/3 justify-self-start text-left md:justify-self-center md:text-right">
          <p className="text-xs uppercase">Junior debt</p>
          <p className="font-semibold text-sm">$25bn invested</p>
          <p className="text-xs">
            as long-dated concessional loans, grants or guarantees
            <span className="block">(min $1 bn for board seat)</span>
          </p>
        </div>
        <div className="w-full md:w-2/3 justify-self-end text-right md:justify-self-center md:text-left">
          <p className="text-xs uppercase">Senior debt</p>
          <p className="font-semibold text-sm">$100bn invested</p>
          <p className="text-xs">as market-rate fixed income bonds</p>
        </div>
      </div>

      <Br cn="md:hidden" />
      <Br />

      <div className="max-w-xl mx-auto relative padding-3 bg-white rounding-xl">
        <div className="absolute flex justify-center inset-x-0 translate-y-[-80%]">
          <Image
            className="w-12 md:w-[10%] border border-primary-light rounded-xl aspect-square p-2 md:p-3 bg-white"
            width={36}
            height={42}
            src="/assets/tfif.svg"
            alt="TFIF"
          />
        </div>
        <div className="mt-5 text-center">
          <h3 className="text-primary-dark font-bold typo-h3">
            Tropical Forest Investment Fund (TFIF)
          </h3>
          <Br />
          <p>
            The fund, hosted by the <b>World Bank</b>, invests the{" "}
            <b>$125 bn</b> into capital markets with expected returns of
          </p>
          <h2 className="text-primary-dark font-bold typo-h2">
            ~7.6% or ~$9.5 bn
          </h2>
          <Br />
          <p className="text-xs">
            The fund will primarily invest in climate and sustainability-linked
            instruments (e.g., green, blue, or sustainable bonds) in
            ODA-eligible countries.
          </p>
          <Br />
        </div>
      </div>

      <div className="max-w-xl mx-auto relative padding-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-right self-center">
            <p className="font-bold text-primary-dark typo-h3">~2.7%</p>
            <p className="text-xs">
              remains after investor interest payments and goes to the TFFF
            </p>
          </div>
          <div className="text-left self-center">
            <p className="font-bold text-primary-dark typo-h3">~4.9%</p>
            <p className="text-xs">interest payments to investors</p>
          </div>
        </div>
      </div>

      <Br cn="md:hidden" />
      <Br />

      <div className="max-w-sm mx-auto relative padding-3 bg-primary-dark rounding-xl">
        <div className="absolute flex justify-center inset-x-0 translate-y-[-80%]">
          <Image
            className="w-12 md:w-[15%] border border-primary-light rounded-xl aspect-square p-1 md:p-2 bg-white"
            width={36}
            height={42}
            src="/assets/TFFF-logo.svg"
            alt="TFFF"
          />
        </div>
        <div className="mt-5 text-center">
          <Br />
          <h3 className="text-white font-bold typo-h3">
            Tropical Forest Forever Facility (TFFF)
          </h3>
          <p className="text-white typo-p">also managed by the World Bank</p>
          <Br />
        </div>
      </div>

      <div className="max-w-sm mx-auto relative padding-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-right self-center"></div>
          <div className="text-left self-center">
            <p className="text-xs">
              Success-based payouts to rainforest countries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
