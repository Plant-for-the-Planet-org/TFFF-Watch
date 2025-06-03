import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Invested Capital", actualValue: 2, value: 0 },
  { name: "Pledged Capital", actualValue: 7.2, value: 0 },
  { name: "Target", actualValue: 25, value: 0 },
];

// Calculate percentage values
data[0].value = (data[0].actualValue / data[2].actualValue) * 100;
data[1].value = (data[1].actualValue / data[2].actualValue) * 100;
data[2].value = 100 - data[0].value - data[1].value;

const COLORS = ["#082447", "#6fcf97", "#DFE5ED"];

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  index: number;
}

const CustomLabel = (props: CustomLabelProps) => {
  const { cx, cy, midAngle, outerRadius, index } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 10; // Position label 10px outside the outer radius
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const entry = data[index];

  return (
    <text
      className="hidden sm:block"
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      // dominantBaseline="central"
      fill="#333"
      fontSize="12"
    >
      <tspan x={x} dy="-0.6em" className="font-bold">
        ${entry.actualValue} billion
      </tspan>
      <tspan x={x} dy="1.2em">
        {entry.name}
      </tspan>
    </text>
  );
};

const Legend = () => (
  <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
    {data.map((entry, index) => (
      <div key={entry.name} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: COLORS[index] }}
        />
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-800">
            ${entry.actualValue} billion
          </div>
          <div className="text-xs text-gray-600">{entry.name}</div>
        </div>
      </div>
    ))}
  </div>
);

export default function InvestmentGaugeChart() {
  return (
    <div className="outlines-none">
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <PieChart>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius="130%"
            outerRadius="150%"
            dataKey="value"
            cy="85%"
            labelLine={false}
            label={CustomLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <text
            x="50%"
            y="80%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="typo-h2"
          >
            Sponsor Capital
          </text>
        </PieChart>
      </ResponsiveContainer>
      <div className="sm:hidden">
        <Legend />
      </div>
    </div>
  );
}
