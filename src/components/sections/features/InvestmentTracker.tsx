"use client";

import InvestmentGaugeChart from "@/components/sections/charts/InvestmentGaugeChart";
import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import { api, urls } from "@/utils/axios-helper";
import { toReadableAmountLong } from "@/utils/number-helper";
import { InvestmentTrackerSum } from "@/utils/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface InvestmentTrackerProps {
  invested?: number;
  pledged?: number;
  target?: number;
}

export default function InvestmentTracker({
  target = 25000000000,
}: InvestmentTrackerProps) {
  const [capitals, setCapitals] = useState({
    invested: 0,
    pledged: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const result = await api<InvestmentTrackerSum[]>({
          url: urls.investmentTrackerSum,
          method: "GET",
          token: "",
        });

        if (result[0]) {
          setCapitals({
            invested: result[0].sum_invested_capital,
            pledged: result[0].sum_pledged_capital,
          });
        }
      } catch (error) {
        console.error("Error fetching investment sums:", error);
      }
    })();
  }, []);

  return (
    <div className="bg-secondary-light outer-rounding outer-padding-3">
      <Br />
      <div className="grid lg:grid-cols-2">
        <div className="mx-auto flex flex-col items-center lg:block extra-padding-x-4">
          <h2 className="font-bold typo-h2">Investment Tracker</h2>
          <Br />
          <p className="typo-p">
            The TFFF requires {toReadableAmountLong(target!, true, false)} in
            sponsor capital. It is to serve as the core of the TFFF&apos;s
            investments and as junior debt in the case of losses. The TFFF aims
            to collect the funds from development banks and similar
            institutions.
          </p>
          <Br />
          <div className="hidden lg:block">
            <CTAButton />
          </div>
        </div>
        <div>
          <InvestmentGaugeChart
            invested={capitals?.invested ?? 0}
            pledged={capitals?.pledged ?? 0}
            target={target}
          />
        </div>
      </div>
      <Br />
      <div className="text-center lg:hidden">
        <CTAButton />
      </div>
      <Br />
    </div>
  );
}

function CTAButton() {
  const path = usePathname();

  if (path.includes("investment-tracker")) return null;
  return (
    <Button type="link" href="/investment-tracker/Germany">
      Committed & Invested Funds
    </Button>
  );
}
