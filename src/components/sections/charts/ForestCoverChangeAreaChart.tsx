"use client";

import { PageParams } from "@/app/[country]/[year]/page";
import { getCountryDetails } from "@/utils/country-helper";
import { fetchForestChangeData } from "@/utils/forestChange.store";
import { ForestChangeForCountry } from "@/utils/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const _data = [
  { year: "2021", restoration: 25, deforestation: -25, degradation: -27 },
  { year: "2022", restoration: 23, deforestation: -23, degradation: -28 },
  { year: "2023", restoration: 27, deforestation: -24, degradation: -30 },
  { year: "2024", restoration: 30, deforestation: -20, degradation: -35 },
];

// const fullMockData = [
//   {
//     year: "2018",
//     country: "Angola",
//     intact_forest_ha: 2700000,
//     degraded_forest_ha: 10000,
//     deforested_ha: 10000,
//   },
//   {
//     year: "2019",
//     country: "Angola",
//     intact_forest_ha: 2665000,
//     degraded_forest_ha: 12000,
//     deforested_ha: 13500,
//   },
//   {
//     year: "2020",
//     country: "Angola",
//     intact_forest_ha: 2630000,
//     degraded_forest_ha: 14000,
//     deforested_ha: 15000,
//   },
//   {
//     year: "2021",
//     country: "Angola",
//     intact_forest_ha: 2600000,
//     degraded_forest_ha: 15500,
//     deforested_ha: 17000,
//   },
//   {
//     year: "2022",
//     country: "Angola",
//     intact_forest_ha: 2577000,
//     degraded_forest_ha: 16500,
//     deforested_ha: 18000,
//   },
//   {
//     year: "2023",
//     country: "Angola",
//     intact_forest_ha: 2573000,
//     degraded_forest_ha: 17200,
//     deforested_ha: 18500,
//   },
//   {
//     year: "2024",
//     country: "Angola",
//     intact_forest_ha: 2570807.687,
//     degraded_forest_ha: 17567.16,
//     deforested_ha: 17567.16,
//   },
// ];

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

// const STARTING_YEAR = 2018;

export default function ForestCoverChangeAreaChart() {
  const params: PageParams = useParams();
  const { country } = params;
  const details = getCountryDetails(country);

  const [chartData, setChartData] = useState<ForestChangeForCountry[]>([]);

  useEffect(() => {
    (async () => {
      const _data = await fetchForestChangeData(details.name);
      if (!_data) return;

      setChartData(_data);
      console.log({ data: chartData });
      // setData(fullMockData);
    })();
  }, [chartData, details.name]);

  return (
    <div>
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <AreaChart data={_data}>
          <YAxis type="number" fontSize={14} tickLine={false} />
          <XAxis dataKey="year" fontSize={14} tickLine={false} />

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
