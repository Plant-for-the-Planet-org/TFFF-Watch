// components/MaximumRewardsChart.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import Br from "@/components/ui/Br";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useWorldMapStore } from "@/stores/mapStore";
import { TFFFData } from "@/components/maps/shared/types";
import { getJRCColorKey } from "@/utils/map-colors";

// Custom tooltip component
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: { name: string; value: number; eligibility: string };
  }>;
}) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-background border border-primary-light rounding-lg outer-padding-3">
        <p className="font-semibold text-sm whitespace-nowrap">{data.name}</p>
        <p className="text-xs text-gray-600">{data.eligibility}</p>
        <p className="text-sm font-medium mt-1">
          ${(data.value / 1000000).toFixed(2)}M
        </p>
      </div>
    );
  }
  return null;
}

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

export default function MaximumRewardsChart() {
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
      return { sum: 0, countries: [], legendGroups: [] };
    }

    // Group by eligibility
    const eligible = data2024.filter(
      (item) => getEligibility(item) === "ELIGIBLE"
    );
    const almostEligible = data2024.filter(
      (item) => getEligibility(item) === "ALMOST_ELIGIBLE"
    );
    const ineligible = data2024.filter(
      (item) => getEligibility(item) === "INELIGIBLE"
    );

    // Sort each group by reward amount (descending) and take top 20
    const sortedEligible = [...eligible]
      .sort((a, b) => b.base_reward_usd - a.base_reward_usd)
      .slice(0, 20);
    const sortedAlmostEligible = [...almostEligible]
      .sort((a, b) => b.base_reward_usd - a.base_reward_usd)
      .slice(0, 20);
    const sortedIneligible = [...ineligible]
      .sort((a, b) => b.base_reward_usd - a.base_reward_usd)
      .slice(0, 20);

    // Create country entries for the chart
    const countries: Array<{
      name: string;
      iso2: string;
      value: number;
      color: string;
      eligibility: string;
    }> = [];

    // Add eligible countries
    sortedEligible.forEach((item) => {
      countries.push({
        name: item.country,
        iso2: item["country-iso2"],
        value: item.base_reward_usd,
        color: getJRCColorKey("ELIGIBLE"),
        eligibility: "Eligible",
      });
    });

    // Add almost eligible countries
    sortedAlmostEligible.forEach((item) => {
      countries.push({
        name: item.country,
        iso2: item["country-iso2"],
        value: item.base_reward_usd,
        color: getJRCColorKey("ALMOST_ELIGIBLE"),
        eligibility: "Almost Eligible",
      });
    });

    // Add ineligible countries
    sortedIneligible.forEach((item) => {
      countries.push({
        name: item.country,
        iso2: item["country-iso2"],
        value: item.base_reward_usd,
        color: getJRCColorKey("INELIGIBLE"),
        eligibility: "Ineligible",
      });
    });

    // Sort all countries together by value (descending)
    countries.sort((a, b) => b.value - a.value);

    // Calculate totals for legend
    const eligibleSum = eligible.reduce(
      (acc, item) => acc + item.base_reward_usd,
      0
    );
    const almostEligibleSum = almostEligible.reduce(
      (acc, item) => acc + item.base_reward_usd,
      0
    );
    const ineligibleSum = ineligible.reduce(
      (acc, item) => acc + item.base_reward_usd,
      0
    );

    const totalSum = eligibleSum + almostEligibleSum + ineligibleSum;

    const legendGroups = [];
    if (eligibleSum > 0) {
      legendGroups.push({
        name: "Eligible",
        color: getJRCColorKey("ELIGIBLE"),
        count: eligible.length,
      });
    }
    if (almostEligibleSum > 0) {
      legendGroups.push({
        name: "Almost Eligible",
        color: getJRCColorKey("ALMOST_ELIGIBLE"),
        count: almostEligible.length,
      });
    }
    if (ineligibleSum > 0) {
      legendGroups.push({
        name: "Ineligible",
        color: getJRCColorKey("INELIGIBLE"),
        count: ineligible.length,
      });
    }

    return { sum: totalSum, countries, legendGroups };
  }, [selectedDataset, forestData]);

  if (isLoading) {
    return (
      <div className="bg-background border border-primary-light rounding-lg outer-padding-3">
        <h2 className="typo-h2 font-bold text-center">Maximum Rewards</h2>
        <p className="text-sm text-center text-foreground">
          If countries ended deforestation and forest
          <br />
          degradation entirely
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
      <h2 className="typo-h2 font-bold text-center">Maximum Rewards</h2>
      <p className="text-sm text-center text-foreground">
        If countries ended deforestation and forest
        <br />
        degradation entirely
      </p>
      <Br />
      <div className="relative w-full aspect-square max-w-[300px] md:max-w-2/3 mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData.countries}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.countries.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
              cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="text-2xl sm:text-3xl font-bold">
            ${(chartData.sum / 1000000000).toFixed(1)}bn
          </span>
        </div>
      </div>
      <Br />
      <div className="flex flex-col gap-2">
        {chartData.legendGroups.map((group, index) => (
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
      </div>
    </div>
  );
}
