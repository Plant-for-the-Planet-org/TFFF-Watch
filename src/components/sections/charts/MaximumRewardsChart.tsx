// components/MaximumRewardsChart.tsx
import Br from "@/components/ui/Br";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = {
  sum: 4600000000,
  countries: [
    { iso2: "BR", name: "Brazil", value: 1500000000, color: "#6EE7B7" },
    { iso2: "ID", name: "Indonesia", value: 1200000000, color: "#34D399" },
    { iso2: "CD", name: "DR Congo", value: 900000000, color: "#10B981" },
    { iso2: "PE", name: "Peru", value: 600000000, color: "#059669" },
    { iso2: "OTHER", name: "Others", value: 400000000, color: "#9CA3AF" },
  ],
};

export default function MaximumRewardsChart() {
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
            ${(data.sum / 1000000000).toFixed(1)}bn
          </span>
        </div>
      </div>
    </div>
  );
}
