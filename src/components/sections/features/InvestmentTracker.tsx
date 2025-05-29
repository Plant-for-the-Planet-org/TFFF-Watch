"use client";

import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import InvestmentGaugeChart from "@/components/sections/charts/InvestmentGaugeChart";

export default function InvestmentTracker() {
  return (
    <div className="bg-secondary-light rounding-xl padding-3">
      <Br />
      <div className="grid lg:grid-cols-2 gap-y-4">
        {/* <div className="lg:max-w-[33vw] mx-auto flex flex-col items-center lg:block"> */}
        <div className="mx-auto flex flex-col items-center lg:block extra-padding-x-4">
          <h2 className="font-bold typo-h2">Investment Tracker</h2>
          <Br />
          <p className="typo-p">
            The TFFF requires $25 billion in sponsor capital. It is to serve as
            the core of the TFFF’s investments and as junior debt in the case of
            losses. The TFFF aims to collect the funds from development banks
            and similar institutions.
          </p>
          <Br />
          <Button type="link" href="/investment-tracker" external>
            Committed & Invested Funds
          </Button>
        </div>
        <div>
          <InvestmentGaugeChart />
        </div>
      </div>
      <Br />
    </div>
  );
}
