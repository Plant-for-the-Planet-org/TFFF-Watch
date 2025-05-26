"use client";

import { Area, AreaChart, Legend, ResponsiveContainer } from "recharts";

const data = [
  { restoration: 25, deforestation: -25, degradation: -27 },
  { restoration: 23, deforestation: -23, degradation: -28 },
  { restoration: 27, deforestation: -24, degradation: -30 },
  { restoration: 30, deforestation: -20, degradation: -35 },
];

const strokes = {
  restoration: "#2C9CDB",
  deforestation: "#EB5756",
  degradation: "#F1994A",
};

const fills = {
  restoration: "#E9F7FF",
  deforestation: "#FFE6E6",
  degradation: "#FFF0E3",
};

export default function ForestCoverChangeAreaChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <AreaChart data={data}>
          <Area
            dataKey="restoration"
            stroke={strokes.restoration}
            strokeWidth={2}
            fill={fills.restoration}
            fillOpacity={1}
          />
          <Area
            dataKey="degradation"
            stroke={strokes.degradation}
            strokeWidth={2}
            fill={fills.degradation}
            fillOpacity={1}
          />
          <Area
            dataKey="deforestation"
            stroke={strokes.deforestation}
            strokeWidth={2}
            fill={fills.deforestation}
            fillOpacity={1}
          />
          {/* <Tooltip /> */}
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
