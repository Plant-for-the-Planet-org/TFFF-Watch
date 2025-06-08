"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type ChartData = {
  year: string;
  value: number;
};

const chartData: ChartData[] = [
  { year: "2018", value: 100000 },
  { year: "2019", value: 120000 },
  { year: "2020", value: 150000 },
  { year: "2021", value: 180000 },
  { year: "2022", value: 200000 },
  { year: "2023", value: 220000 },
  { year: "2024", value: 250000 },
];

const chartColor = {
  stroke: "#6FCF97",
  fill: "#9EEEC0",
};

export default function AnnualPayoutAreaChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={chartColor.stroke}
                stopOpacity={0.1}
              />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis type="number" fontSize={14} tickLine={false} />
          <XAxis dataKey="year" fontSize={14} tickLine={false} />

          <Area
            dataKey="value"
            strokeWidth={2}
            stroke={chartColor.stroke}
            dot={{ stroke: chartColor.stroke, fill: chartColor.fill, r: 4 }}
            fill="url(#lineGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
