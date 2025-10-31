// components/CurrentRewardsChart.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import Br from "@/components/ui/Br";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useWorldMapStore } from "@/stores/mapStore";
import { TFFFData } from "@/components/maps/shared/types";
import { getJRCColorKey } from "@/utils/map-colors";

// Helper function to calculate eligibility
function getEligibility(item: TFFFData): string {
  if (item.eligibility_deforestation_rate_below_half_percent === true) {
    if (item.eligibility_decreasing_trend_of_deforestation === false) {
      return "ALMOST_ELIGIBLE";
    } else {
      return "ELIGIBLE";
    }
  }
  return "INELIGIBLE";
}

export default function CurrentRewardsChart() {
  const { selectedDataset, forestData } = useWorldMapStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if data is available for the selected dataset
    if (forestData[selectedDataset]?.length > 0) {
      setIsLoading(false);
    }
  }, [selectedDataset, forestData]);

  const chartData = useMemo(() => {
    const datasetData = forestData[selectedDataset] || [];

    // Filter for 2024 data only
    const data2024 = datasetData.filter(
      (item: TFFFData) => String(item.year) === "2024"
    );

    if (data2024.length === 0) {
      return { sum: 0, groups: [] };
    }

    // Filter only eligible and almost eligible countries
    const eligibleData = data2024.filter((item) => {
      const eligibility = getEligibility(item);
      return eligibility === "ELIGIBLE" || eligibility === "ALMOST_ELIGIBLE";
    });

    // Group by eligibility
    const eligible = eligibleData.filter(
      (item) => getEligibility(item) === "ELIGIBLE"
    );
    const almostEligible = eligibleData.filter(
      (item) => getEligibility(item) === "ALMOST_ELIGIBLE"
    );

    // Calculate sums for each group
    const eligibleSum = eligible.reduce(
      (acc, item) => acc + item.reward_after_deductions_usd,
      0
    );
    const almostEligibleSum = almostEligible.reduce(
      (acc, item) => acc + item.reward_after_deductions_usd,
      0
    );

    const totalSum = eligibleSum + almostEligibleSum;

    const groups = [];
    if (eligibleSum > 0) {
      groups.push({
        name: "Eligible",
        value: eligibleSum,
        color: getJRCColorKey("ELIGIBLE"),
        count: eligible.length,
      });
    }
    if (almostEligibleSum > 0) {
      groups.push({
        name: "Almost Eligible",
        value: almostEligibleSum,
        color: getJRCColorKey("ALMOST_ELIGIBLE"),
        count: almostEligible.length,
      });
    }

    return { sum: totalSum, groups };
  }, [selectedDataset, forestData]);

  if (isLoading) {
    return (
      <div className="bg-white border border-primary-medium-light rounding-xl padding-3">
        <h2 className="typo-h2 font-bold text-center">Current Rewards</h2>
        <p className="text-sm text-center text-foreground">
          if TFFF was already operation, based on 2024 data
          <br />
          for fully and almost eligible countries
        </p>
        <Br />
        <div className="flex items-center justify-center h-64">
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-primary-medium-light rounding-xl padding-3">
      <h2 className="typo-h2 font-bold text-center">Current Rewards</h2>
      <p className="text-sm text-center text-foreground">
        if TFFF was already operation, based on 2024 data
        <br />
        for fully and almost eligible countries
      </p>
      <Br />
      <div className="relative w-full aspect-square max-w-[300px] md:max-w-2/3 mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData.groups}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.groups.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold">
            ${(chartData.sum / 1000000000).toFixed(1)}bn
          </span>
        </div>
      </div>
      <Br />
      {/* <div className="flex flex-col gap-2">
        {chartData.groups.map((group, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: group.color }}
              />
              <span className="text-sm">{group.name}</span>
            </div>
            <span className="text-sm font-medium">
              {group.count} {group.count === 1 ? "country" : "countries"}
            </span>
          </div>
        ))}
      </div> */}
    </div>
  );
}
