"use client";

import { PageParams } from "@/app/[country]/[year]/page";
import { api, urls } from "@/utils/axios-helper";
import { getCountryDetails } from "@/utils/country-helper";
import { forestChangeData } from "@/utils/forestChange.store";
import { toReadable } from "@/utils/number-helper";
import { Spending } from "@/utils/types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  LabelListProps,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { twMerge } from "tailwind-merge";

type ChartData = {
  label: string;
  value: number;
  fill: string;
  info?: {
    label?: string;
    labelLink?: string;
    details?: string;
  };
};

const ChartColors = {
  lightBlue: "#2F80ED80",
  blue: "#2F80ED",
  gray: "#BDBDBD",
};

const bar = {
  barSize: 42,
  barGap: 42 + 14,
};

export default function PotentialPayoutVsExistingConservationFundingBarChart() {
  const params: PageParams = useParams();
  const { country, year } = params;
  const details = getCountryDetails(country);
  const { width } = useWindowSize();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [chartOptions, setChartOptions] = useState({
    yAxisWidth: 0,
    chartWidth: 0,
  });

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (!forestChangeData) return;
    (async () => {
      const _data = await api<Spending[]>({
        url: urls.spending,
        query: { country: details.name },
        method: "GET",
        token: "",
      });
      if (!_data) return;

      const forestChangeOfYear = forestChangeData.find(
        (el) => +el.year === +year
      )!;
      const {
        eligible_for_reward,
        base_reward_usd,
        deforestation_deduction_usd,
        degradation_deduction_usd,
      } = forestChangeOfYear;
      const estimateRewardAt0Deforestation: ChartData = {
        label: `Estimated TFFF Reward (${year}) if 0% deforestation`,
        value: base_reward_usd,
        fill: ChartColors.lightBlue,
        info: {
          details:
            "If the country ended all deforestation and forest degradation, it would be eligible to that payout. This also assumes that the TFFF is established and fully funded. Source: TFFF Watch Model",
        },
      };
      const reward_after_deduction =
        base_reward_usd -
        (deforestation_deduction_usd + degradation_deduction_usd);
      const estimateRewardAtCurrentDeforestation: ChartData = {
        label: `Estimated TFFF Reward (${year})  at current deforestation levels`,
        value: eligible_for_reward === false ? 0 : reward_after_deduction,
        fill: ChartColors.blue,
        info: {
          details:
            "At current deforestation and degradation levels, the country would be eligible for this payout – if TFFF already existed and was fully funded. Source: TFFF Watch Model",
        },
      };

      const _spendings: ChartData[] = _data.map((el) => ({
        label: el.label + ` (${el.year})`,
        value: +el.amount_usd,
        fill: ChartColors.gray,
        info: {
          details: el.help_text,
          labelLink: el.source_url,
          label: el.source_name,
        },
      }));

      setChartData([
        estimateRewardAt0Deforestation,
        estimateRewardAtCurrentDeforestation,
        ..._spendings,
      ]);
    })();
  }, [details.name, year]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (width! < 768)
      setChartOptions({
        yAxisWidth: 0,
        chartWidth: containerRef.current.clientWidth,
      });
    else
      setChartOptions({
        yAxisWidth: containerRef.current.clientWidth * (1 / 3),
        chartWidth: containerRef.current.clientWidth * (2 / 3),
      });
  }, [containerRef, width]);

  return (
    <div>
      <ResponsiveContainer
        ref={containerRef}
        width="100%"
        height={(bar.barSize + bar.barGap) * chartData.length}
      >
        <BarChart
          data={chartData}
          layout="vertical"
          barSize={bar.barSize}
          barGap={bar.barGap}
          margin={{ top: 48, right: 48 }}
        >
          <YAxis
            width={chartOptions.yAxisWidth}
            tickLine={false}
            dataKey="label"
            type="category"
            tick={({ y, width, index }) => {
              return (
                <CustomTick
                  y={y}
                  width={width}
                  data={chartData}
                  index={index}
                />
              );
            }}
          ></YAxis>
          <XAxis type="number" dataKey="value" opacity={0} tickLine={false} />
          <Bar dataKey="value">
            <LabelList
              className={twMerge("float-left text-left")}
              dataKey="label"
              content={({ x, y, height, index }) => (
                <CustomLabel
                  x={x}
                  y={y}
                  height={height}
                  containerWidth={chartOptions.chartWidth}
                  data={chartData}
                  index={index}
                />
              )}
            />
            <LabelList
              dataKey={"value"}
              position="right"
              formatter={toReadable}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

type CustomLabelProps = LabelListProps<ChartData> & {
  containerWidth: number;
  index?: number;
  data: ChartData[];
};
function CustomLabel(props: CustomLabelProps) {
  const { x, y, height, index, data } = props;
  const calculatedY = (y as number) - (height as number);
  const tooltipData = data[index!].info;
  return (
    <g className="md:hidden">
      <foreignObject
        x={x}
        y={calculatedY}
        width={props.containerWidth}
        height={height}
      >
        <div
          // xmlns="http://www.w3.org/1999/xhtml"
          className="text-xs sm:text-sm h-full flex items-end-safe"
        >
          <div className="flex items-center gap-2">
            <div className="shrink-0">
              <InfoTooltip>
                <div className="text-xs sm:text-sm flex items-start gap-2">
                  {tooltipData?.labelLink && (
                    <Link
                      className="shrink-0 h-6 w-6 p-0.5 flex justify-center items-center bg-primary-light rounded"
                      href={tooltipData.labelLink!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        className="object-center"
                        width={14}
                        height={14}
                        src={"/assets/tooltip-link-icon.svg"}
                        alt=""
                      />
                    </Link>
                  )}
                  <div>
                    {tooltipData?.label && (
                      <Link
                        href={tooltipData.labelLink!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>{tooltipData.label}</b>
                      </Link>
                    )}
                    <p>{tooltipData?.details}</p>
                  </div>
                </div>
              </InfoTooltip>
            </div>
            <p>{data[index!].label}</p>
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

type CustomTickProps = LabelListProps<ChartData> & {
  index?: number;
  data: ChartData[];
};
function CustomTick(props: CustomTickProps) {
  const { y, width, height = bar.barSize, index, data } = props;
  const calculatedY = (y as number) - (height as number) / 2;
  const tooltipData = data[index!].info;

  return (
    <g className="hidden md:block">
      <foreignObject x={0} y={calculatedY} width={width} height={height}>
        <div
          // xmlns="http://www.w3.org/1999/xhtml"
          className="text-xs sm:text-sm h-full pr-2"
        >
          <div className="flex justify-end items-center gap-2">
            <p className="text-end">{data[index!].label}</p>
            <div className="shrink-0">
              <InfoTooltip>
                <div className="text-xs sm:text-sm flex items-start gap-2">
                  {tooltipData?.labelLink && (
                    <Link
                      className="shrink-0 h-6 w-6 p-0.5 flex justify-center items-center bg-primary-light rounded"
                      href={tooltipData.labelLink!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        className="object-center"
                        width={14}
                        height={14}
                        src={"/assets/tooltip-link-icon.svg"}
                        alt=""
                      />
                    </Link>
                  )}
                  <div>
                    {tooltipData?.label && (
                      <Link
                        href={tooltipData.labelLink!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>{tooltipData.label}</b>
                      </Link>
                    )}
                    <p>{tooltipData?.details}</p>
                  </div>
                </div>
              </InfoTooltip>
            </div>
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

function InfoTooltip({ children }: { children: ReactNode }) {
  return (
    <Popover className="relative">
      <PopoverButton>
        <Image
          width={12}
          height={12}
          src={"/assets/tooltip-info-icon.svg"}
          alt=""
        />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom start"
        className="m-1 w-2xs bg-white p-2 rounded-md shadow-md"
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
}
