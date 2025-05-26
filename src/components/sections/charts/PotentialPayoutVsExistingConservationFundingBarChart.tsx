"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { label: "Estimated TFFF Reward (2024) if 0% deforestation", value: 792 },
  { label: "Brazilian agricultural subsidies", value: 327 },
  { label: "Env. Ministry Budget (2023)", value: 122 },
  { label: "Indigenous Affairs Budget (2023)", value: 22 },
];

export default function PotentialPayoutVsExistingConservationFundingBarChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <BarChart data={data} layout="vertical">
          <YAxis width={256} dataKey={"label"} type="category" />
          <XAxis type="number" dataKey="value" opacity={0} />
          <Bar barSize={20} dataKey="value" fill="#BDBDBD" />
          {/* <Tooltip /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
