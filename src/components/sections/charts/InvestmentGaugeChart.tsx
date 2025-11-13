import { toReadableAmountLong } from "@/utils/number-helper";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface InvestmentGaugeChartProps {
  invested?: number;
  pledged?: number;
  target?: number;
}

type LabelData = {
  id: string;
  name: string;
  actualValue: number;
  position: number; // 0..100
  originalPosition: number;
  color: string;
};

const COLORS = {
  invested: "#082447",
  pledged: "#6fcf97",
  target: "#DFE5ED",
};

const LABEL_OFFSET_X = 10; // horizontal gap from pie edge

export default function InvestmentGaugeChart({
  invested = 0,
  pledged = 0,
  target = 25000000000,
}: InvestmentGaugeChartProps) {
  const chartData = useMemo(() => {
    const invPct = target > 0 ? Math.min(100, (invested / target) * 100) : 0;
    const plgPct = target > 0 ? Math.min(100, (pledged / target) * 100) : 0;

    return [
      {
        id: "invested",
        name: "Invested Capital",
        value: invested,
        pct: invPct,
        color: COLORS.invested,
      },
      {
        id: "pledged",
        name: "Pledged Capital",
        value: pledged,
        pct: plgPct,
        color: COLORS.pledged,
      },
      {
        id: "target",
        name: "Target",
        value: target,
        pct: 100,
        color: COLORS.target,
      },
    ];
  }, [invested, pledged, target]);

  // Simple label positions: left stack or right aligned
  const { labelData } = useMemo(() => {
    const invPct = chartData.find((d) => d.name === "Invested Capital")!.pct;
    const plgPct = chartData.find((d) => d.name === "Pledged Capital")!.pct;

    const labels: LabelData[] = [
      {
        id: "invested",
        name: "Invested Capital",
        actualValue: invested,
        position: invPct,
        originalPosition: invPct,
        color: COLORS.invested,
      },
      {
        id: "pledged",
        name: "Pledged Capital",
        actualValue: pledged,
        position: plgPct,
        originalPosition: plgPct,
        color: COLORS.pledged,
      },
      {
        id: "target",
        name: "Target",
        actualValue: target,
        position: 100,
        originalPosition: 100,
        color: COLORS.target,
      },
    ];

    // Return all labels; stacking/placement handled by CustomLabel below
    return { labelData: labels };
  }, [chartData, invested, pledged, target]);

  return (
    <div className="outlines-none">
      <ResponsiveContainer width="100%" height="100%" minHeight={220}>
        <PieChart>
          {/* base semicircle (target background) */}
          <Pie
            isAnimationActive={false}
            data={[{ value: 100 }]}
            startAngle={180}
            endAngle={0}
            innerRadius="130%"
            outerRadius="150%"
            dataKey="value"
            cy="90%"
            labelLine={false}
          >
            <Cell fill={COLORS.target} />
          </Pie>

          {/* pledged ring slice */}
          {chartData.find((d) => d.name === "Pledged Capital")!.pct > 0 && (
            <Pie
              isAnimationActive={false}
              data={[
                {
                  value: chartData.find((d) => d.name === "Pledged Capital")!
                    .pct,
                },
                {
                  value:
                    100 -
                    chartData.find((d) => d.name === "Pledged Capital")!.pct,
                },
              ]}
              startAngle={180}
              endAngle={0}
              innerRadius="130%"
              outerRadius="150%"
              dataKey="value"
              cy="90%"
              labelLine={false}
            >
              <Cell fill={COLORS.pledged} />
              <Cell fill="transparent" />
            </Pie>
          )}

          {/* invested ring slice */}
          {chartData.find((d) => d.name === "Invested Capital")!.pct > 0 && (
            <Pie
              isAnimationActive={false}
              data={[
                {
                  value: chartData.find((d) => d.name === "Invested Capital")!
                    .pct,
                },
                {
                  value:
                    100 -
                    chartData.find((d) => d.name === "Invested Capital")!.pct,
                },
              ]}
              startAngle={180}
              endAngle={0}
              innerRadius="130%"
              outerRadius="150%"
              dataKey="value"
              cy="90%"
              labelLine={false}
            >
              <Cell fill={COLORS.invested} />
              <Cell fill="transparent" />
            </Pie>
          )}

          {/* Labels layer - each label is its own tiny Pie so Recharts gives positioning props */}
          {labelData.map((label, index) => {
            const angle = 180 - (label.position / 100) * 180;
            const startAngle = angle - 0.1;
            const endAngle = angle + 0.1;

            return (
              <Pie
                key={`label-${index}`}
                isAnimationActive={false}
                data={[{ name: label.name, value: 1 }]}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius="130%"
                outerRadius="150%"
                dataKey="value"
                cy="90%"
                labelLine={false}
                label={(props: CustomLabelProps) => (
                  <CustomLabel
                    {...props}
                    labelData={label}
                    stackingIndex={index}
                  />
                )}
                stroke="transparent"
                fill="transparent"
              >
                <Cell fill="transparent" />
              </Pie>
            );
          })}

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

      <div className="sm:hidden flex flex-wrap justify-center gap-4 mt-4 px-4">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-800">
                {toReadableAmountLong(item.value)}
              </div>
              <div className="text-xs text-gray-600">{item.name}</div>
            </div>
          </div>
        ))}
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
  payload?: { name: string; value: number };
}

interface CustomLabelWithDataProps extends CustomLabelProps {
  labelData: LabelData;
  stackingIndex: number;
}

/**
 * Simplified label placement:
 * - If label.position >= 50 => place on the right outside the semicircle
 * - else => place on the left outside the semicircle and stack vertically using stackingIndex
 * This intentionally avoids complex polar math and just places labels next to the pie like the 2nd image.
 */
// Replace the existing CustomLabel function body with this exact code
// Replace entire CustomLabel function with this
// Replace entire CustomLabel function with this
// Replace entire CustomLabel function with this
const CustomLabel = (props: CustomLabelWithDataProps) => {
  const { cx, cy, outerRadius = 0, labelData } = props;

  const isRight = labelData.position >= 50;
  const xRight = cx + outerRadius + LABEL_OFFSET_X;
  const xLeft = cx - outerRadius - LABEL_OFFSET_X;
  const baseY = cy - outerRadius * 0.05;

  let x = isRight ? xRight : xLeft;
  let y = baseY;

  // --- Dynamic circular position for pledged label ---
  if (labelData.id === "pledged" && labelData.position > 0) {
    // Convert pledged percentage (0–100) to polar angle within the semicircle (180° → 0°)
    let angleDeg = 180 - (labelData.position / 100) * 180;
    if (labelData.position < 5) {
      angleDeg -= 9;
    }

    const angleRad = (Math.PI * angleDeg) / 180;

    // Position label slightly outside the pie edge
    const radius = outerRadius * 1.1;
    x = cx + radius * Math.cos(angleRad);
    y = cy - radius * Math.sin(angleRad);
  }

  // Keep invested label fixed baseline on left
  if (labelData.id === "invested") {
    x = xLeft;
    y = baseY;
  }

  // Keep target label baseline centered right
  if (labelData.id === "target") {
    x = xRight;
    y = baseY;
  }

  const textAnchor: "start" | "end" = x > cx ? "start" : "end";

  return (
    <g className="group">
      {labelData.id === "pledged" && (
        <foreignObject
          x={x - (80 + 30)}
          y={y - 40}
          width={160}
          height={40}
          className="relative"
        >
          <div className="hidden group-hover:block absolute z-50 inset-0 shadow">
            <div className="bg-background rounded-xl p-2 text-center">
              <p className="text-sm">
                ${" "}
                {labelData.actualValue.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </foreignObject>
      )}
      <text
        className="hidden sm:block"
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill="#111827"
        fontSize={12}
      >
        <tspan x={x} dy={12} fontWeight="700">
          {toReadableAmountLong(labelData.actualValue, true, true)}
        </tspan>
        <tspan x={x} dy={12} fontWeight="400" fontSize={11}>
          {labelData.name}
        </tspan>
      </text>
    </g>
  );
};
