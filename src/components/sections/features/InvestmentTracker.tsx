"use client";

import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import InvestmentGaugeChart from "./InvestmentGaugeChart";

export default function InvestmentTracker() {
  return (
    <div className="bg-secondary-light rounding-xl padding-3">
      <Br />
      <div className="grid sm:grid-cols-2 gap-y-4">
        <div className="xl:max-w-[36vw] mx-auto">
          <h2 className="font-bold typo-h2">Investment Tracker</h2>
          <Br />
          <p className="typo-p">
            The TFFF requires $25 billion in sponsor capital. It is to serve as
            the core of the TFFF’s investments and as junior debt in the case of
            losses. The TFFF aims to collect the funds from development banks
            and similar institutions.
          </p>
          <Br />
          <Button external>Committed & Invested Funds</Button>
        </div>
        <div>
          <InvestmentGaugeChart />
        </div>
      </div>
      <Br />
    </div>
  );
}
