"use client";

import { toReadable } from "@/utils/number-helper";
import { useForestCoverChangeData } from "@/utils/store";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { twMerge } from "tailwind-merge";

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

type ChartData = {
  year: string;
  // restoration: number;
  deforestation: number;
  degradation: number;
};

// const STARTING_YEAR = 2018;

export default function ForestCoverChangeAreaChart() {
  const { forestCoverChangeDataByCountry } = useForestCoverChangeData();

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    console.log(
      "ForestCoverChangeAreaChart data:",
      forestCoverChangeDataByCountry?.length
    );
    if (!forestCoverChangeDataByCountry?.length) return;

    const _chartData = forestCoverChangeDataByCountry
      .filter((el) => +el.year > 2018)
      .map((el) => ({
        year: el.year,
        degradation: -el.degraded_forest_ha,
        deforestation: -(el.degraded_forest_ha + el.deforested_ha),
        // degradation: -(el.deforested_ha + el.degraded_forest_ha),
      }));

    console.log("Chart data:", _chartData);
    setChartData(_chartData);
  }, [forestCoverChangeDataByCountry]);

  return (
    <div>
      <div className="flex justify-end">
        <div className="font-thin">
          <div className="flex gap-2 items-center">
            <div className={twMerge("w-6 h-4", `bg-[#EB5756]`)}></div>
            <p>Deforested</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className={twMerge("w-6 h-4", `bg-[#F1994A]`)}></div>
            <p>Degraded</p>
          </div>
          {/* <div className="flex gap-2 items-center">
            <div className={twMerge("w-6 h-4", `bg-[#2C9CDB]`)}></div>
            <p>Restored</p>
          </div> */}
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <AreaChart data={chartData}>
          <YAxis
            type="number"
            fontSize={14}
            width={80}
            tickLine={false}
            tickFormatter={(value) => `${toReadable(value)} ha`}
            domain={[
              (dataMin: number) => {
                const newDataMin = dataMin + dataMin * (15 / 100);
                return newDataMin;
              },
              0, // set dataMax to 0
            ]}
          />
          <XAxis dataKey="year" fontSize={14} tickLine={false} />
          {/* <Area
            dataKey="restoration"
            stroke={strokes.restoration}
            strokeWidth={2}
            fill={fills.restoration}
            fillOpacity={1}
            dot={{
              stroke: strokes.restoration,
              fill: fills.restoration,
              r: 4,
            }}
          /> */}

          <Area
            dataKey="deforestation"
            stroke={strokes.deforestation}
            strokeWidth={2}
            fill={fills.deforestation}
            fillOpacity={0.5}
            dot={{
              stroke: strokes.deforestation,
              fill: fills.deforestation,
              r: 4,
            }}
          />
          <Area
            dataKey="degradation"
            stroke={strokes.degradation}
            strokeWidth={2}
            fill={fills.degradation}
            fillOpacity={0.5}
            dot={{
              stroke: strokes.degradation,
              fill: fills.degradation,
              r: 4,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
