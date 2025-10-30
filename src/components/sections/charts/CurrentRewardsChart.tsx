// components/CurrentRewardsChart.tsx
import Br from "@/components/ui/Br";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = {
  sum: 420000000,
  countries: [
    { iso2: "BR", name: "Brazil", value: 150000000, color: "#34D399" },
    { iso2: "ID", name: "Indonesia", value: 120000000, color: "#10B981" },
    { iso2: "CD", name: "DR Congo", value: 80000000, color: "#059669" },
    { iso2: "PE", name: "Peru", value: 40000000, color: "#047857" },
    { iso2: "OTHER", name: "Others", value: 30000000, color: "#9CA3AF" },
  ],
};

export default function CurrentRewardsChart() {
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
              data={data.countries}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.countries.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold">
            ${(data.sum / 1000000).toFixed(0)}m
          </span>
        </div>
      </div>
    </div>
  );
}
