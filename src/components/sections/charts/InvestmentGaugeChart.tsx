import { toReadableAmountLong } from "@/utils/number-helper";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface GaugeSegment {
  name: string;
  actualValue: number;
  value: number; // For visual representation
  labelPosition: number; // For label placement
  anchor: "start" | "middle" | "end";
  color: string;
}

interface InvestmentGaugeChartProps {
  invested?: number;
  pledged?: number;
  target?: number;
}

function calculatePercentage(value: number, target: number) {
  return (value / target) * 100;
}

const initialData: GaugeSegment[] = [
  {
    name: "Invested Capital",
    actualValue: 0,
    value: 0,
    labelPosition: 0, // Initial position same as value
    anchor: "middle",
    color: "#082447",
  },
  {
    name: "Pledged Capital",
    actualValue: 0,
    value: 0,
    labelPosition: 0, // Initial position same as value
    anchor: "middle",
    color: "#6fcf97",
  },
  {
    name: "Target",
    actualValue: 0,
    value: 0,
    labelPosition: 100, // Always at the end
    anchor: "end",
    color: "#DFE5ED",
  },
];

export default function InvestmentGaugeChart({
  invested = 0,
  pledged = 0,
  target = 25000000000,
}: InvestmentGaugeChartProps) {
  const [chartData, setChartData] = useState<GaugeSegment[]>(initialData);

  // Adjust label positions if they're too close
  const adjustLabelPositions = (segments: GaugeSegment[]): GaugeSegment[] => {
    const adjusted = [...segments];
    const MIN_SPACING = 12; // Minimum spacing between labels in percentage

    // Get invested and pledged segments
    const invested = segments[0]; // First segment is invested
    const pledged = segments[1]; // Second segment is pledged

    // Check if pledged value is close to invested value
    if (Math.abs(invested.value - pledged.value) < MIN_SPACING) {
      // Only adjust the pledged label position by moving it up
      adjusted[1].labelPosition = pledged.value - MIN_SPACING;

      // Ensure we don't exceed 100%
      adjusted[1].labelPosition = Math.min(100, adjusted[1].labelPosition);
    }

    return adjusted;
  };

  useEffect(() => {
    const _data = structuredClone(initialData);
    _data[0].actualValue = invested;
    _data[1].actualValue = pledged;
    _data[2].actualValue = target;
    _data[0].value = calculatePercentage(invested, target);
    _data[1].value = calculatePercentage(pledged, target);
    _data[2].value = 100 - _data[0].value - _data[1].value;
    _data[0].labelPosition = calculatePercentage(invested, target);
    _data[1].labelPosition = calculatePercentage(pledged, target);
    _data[2].labelPosition = 100 - _data[0].value - _data[1].value;
    setChartData(adjustLabelPositions(_data));
  }, [invested, pledged, target]);

  return (
    <div className="outlines-none">
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <PieChart>
          {/* Background pie chart for labels */}
          <Pie
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius="130%"
            outerRadius="150%"
            dataKey="labelPosition"
            cy="90%"
            labelLine={false}
            label={CustomLabel}
          >
            {chartData?.map((entry, index) => (
              <Cell key={`label-cell-${index}`} fill="transparent" />
            ))}
          </Pie>

          {/* Foreground pie chart for actual values */}
          <Pie
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius="130%"
            outerRadius="150%"
            dataKey="value"
            cy="90%"
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`value-cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <text
            x="50%"
            y="85%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="typo-h2"
          >
            Sponsor Capital
          </text>
        </PieChart>
      </ResponsiveContainer>
      <div className="sm:hidden">
        <Legend data={chartData} />
      </div>
    </div>
  );
}

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  index: number;
  startAngle: number;
  endAngle: number;
  payload: GaugeSegment;
}

const CustomLabel = (props: CustomLabelProps) => {
  const { cx, cy, outerRadius, payload } = props;
  const RADIAN = Math.PI / 180;

  // Use labelPosition instead of value for positioning
  const angle = -((payload.labelPosition / 100) * 180 - 180);
  const radius = outerRadius + 10;
  const x = cx + radius * Math.cos(angle * RADIAN);
  const y = cy + radius * Math.sin(angle * RADIAN);

  return (
    <text
      className="hidden sm:block"
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      fill="#333"
      fontSize="12"
    >
      <tspan x={x} dy="-0.6em" className="font-bold">
        {toReadableAmountLong(payload.actualValue)}
      </tspan>
      <tspan x={x} dy="1.2em">
        {payload.name}
      </tspan>
    </text>
  );
};

const Legend = ({ data }: { data: GaugeSegment[] }) => (
  <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
    {data.slice(0, 2).map((entry) => (
      <div key={entry.name} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: entry.color }}
        />
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-800">
            {toReadableAmountLong(entry.actualValue)}
          </div>
          <div className="text-xs text-gray-600">{entry.name}</div>
        </div>
      </div>
    ))}
  </div>
);
