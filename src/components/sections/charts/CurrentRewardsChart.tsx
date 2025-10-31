// components/CurrentRewardsChart.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import Br from "@/components/ui/Br";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useWorldMapStore } from "@/stores/mapStore";
import { TFFFData } from "@/components/maps/shared/types";

const CHART_COLORS = [
  "#34D399",
  "#10B981",
  "#059669",
  "#047857",
  "#065F46",
  "#064E3B",
  "#10B981",
  "#6EE7B7",
  "#A7F3D0",
  "#9CA3AF",
];

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
      return { sum: 0, countries: [] };
    }

    // Sort by reward_after_deductions_usd (descending)
    const sortedData = [...data2024].sort(
      (a, b) => b.reward_after_deductions_usd - a.reward_after_deductions_usd
    );

    // Get top 4 countries
    const top4 = sortedData.slice(0, 4);
    const others = sortedData.slice(4);

    // Calculate total sum from all data
    const sum = sortedData.reduce(
      (acc, item) => acc + item.reward_after_deductions_usd,
      0
    );

    // Map top 4 to chart format
    const countries = top4.map((item, index) => ({
      iso2: item["country-iso2"],
      name: item.country,
      value: item.reward_after_deductions_usd,
      color: CHART_COLORS[index],
    }));

    // Add "Others" if there are more than 4 countries
    if (others.length > 0) {
      const othersSum = others.reduce(
        (acc, item) => acc + item.reward_after_deductions_usd,
        0
      );
      countries.push({
        iso2: "OTHER",
        name: "Others",
        value: othersSum,
        color: "#9CA3AF",
      });
    }

    return { sum, countries };
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
      <div className="relative w-full aspect-square max-w-[300px] md:max-w-2/4 mx-auto">
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
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold">
            ${(chartData.sum / 1000000).toFixed(0)}m
          </span>
        </div>
      </div>
    </div>
  );
}
