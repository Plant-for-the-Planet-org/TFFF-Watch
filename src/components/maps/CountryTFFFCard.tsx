import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import { CountryDetails } from "@/utils/country-helper";
import { forestChangeData } from "@/utils/forestChange.store";
import { toReadable } from "@/utils/number-helper";
import { ForestChangeForCountry } from "@/utils/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type Options = {
  countryData?: ForestChangeForCountry | null;
  CTA?: boolean;
};

export default function CountryTFFFCard({
  year = "2024",
  name = "",
  flagImgUrl,
  CTA = false,
  countryData = null,
}: { iso2?: string; year?: string } & Partial<CountryDetails> & Options) {
  // console.log({ forestChangeData });

  const _data: ForestChangeForCountry =
    countryData || forestChangeData.find((el) => +el.year === +year)!;

  // const rewardIfAlreadyExisted =
  //   (_data?.base_reward_usd ?? 0) -
  //   (_data?.deforestation_deduction_usd ?? 0) -
  //   (_data?.degradation_deduction_usd ?? 0);

  if (!_data) return null;

  return (
    <div className="w-3xs md:w-md p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 rounding-xl bg-white text-xs sm:text-sm">
      <div className="p-2 px-4 sm:p-0 flex gap-2 justify-between items-center flex-wrap rounded-t-lg bg-primary-light sm:bg-white">
        <p className="flex gap-3.25 items-center">
          <img className="w-3 h-2" alt={name} src={flagImgUrl} />
          {name} {year}
        </p>
        <p className="flex items-center gap-2 relative group">
          <Image
            className="h-4 w-4 rounded-full"
            width={12}
            height={12}
            src={
              _data!.eligibility_combined
                ? "/assets/check.svg"
                : "/assets/x.svg"
            }
            alt="Meets minumum requirement"
          />
          <span className="underline underline-offset-4 decoration-dashed decoration text-base-text/50">
            {_data!.eligibility_combined ? "Meets" : "Fails"} minimum
            requirements
          </span>

          <div className="absolute bottom-full mb-2 w-72 hidden group-hover:block bg-white p-2 rounded shadow z-10 left-1/2 -translate-x-1/2">
            <div className="text-xs">
              <MinimumCriteria
                currentYear={year}
                eligibility_deforestation_rate_below_half_percent={
                  _data!.eligibility_deforestation_rate_below_half_percent
                }
                eligibility_decreasing_trend_of_deforestation={
                  _data!.eligibility_decreasing_trend_of_deforestation
                }
              />
            </div>
          </div>
        </p>
      </div>
      <Br />
      <div className="p-2 px-4 sm:p-0">
        <div className="flex justify-between items-center">
          <span>
            {/* Reward for <b>{data.intactForest.area} ha</b> intact forest */}
            Reward for <b>
              {toReadable(_data.intact_forest_ha) ?? "?"} ha
            </b>{" "}
            intact forest
          </span>
          <span className={twMerge(`text-[#219653]`, "text-sm")}>
            <b>${toReadable(_data.base_reward_usd) ?? "?"}</b>
          </span>
        </div>
        <Br cn="md:hidden" />
        <div className="flex justify-between items-center">
          <span>
            Discount for <b>{toReadable(_data.deforested_ha) ?? "?"} ha</b>{" "}
            deforestation in {year} (
            {toReadable(_data.percentage_deforested) ?? "?"}%)
          </span>
          <span className={twMerge(`text-[#EB5757]`, "text-sm")}>
            <b>-${toReadable(_data.deforestation_deduction_usd) ?? "?"}</b>
          </span>
        </div>
        <Br cn="md:hidden" />
        <div className="flex justify-between items-center">
          <span>
            Discount for <b>{toReadable(_data.degraded_forest_ha) ?? "?"} ha</b>{" "}
            degradation in 2024 ({toReadable(_data.percentage_degraded) ?? "?"}
            %)
          </span>
          <span className={twMerge(`text-[#F2994A]`, "text-sm")}>
            <b>-${toReadable(_data.degradation_deduction_usd)}</b>
          </span>
        </div>
      </div>
      <Br />
      <div
        className={twMerge(
          "p-2 px-4 sm:p-0 md:-mx-3 lg:-mx-4 xl:-mx-5 md:p-3 lg:p-4 xl:p-5 xl:py-4",
          _data.eligibility_combined ? "bg-primary-light" : "bg-danger-light"
        )}
      >
        <p className="flex justify-between items-center">
          <span>
            <span className="font-semibold">Estimated Reward</span>{" "}
            <i>if TFFF already existed</i>
          </span>
          <span
            className={twMerge(
              "text-sm",
              !_data.eligibility_combined && "text-danger"
            )}
          >
            <b>
              $
              {_data.eligibility_combined
                ? toReadable(_data.reward_after_deductions_usd)
                : 0}
            </b>
          </span>
        </p>
        <p className="flex justify-between items-center font-thin">
          <span>Of which 20% is designated for Indigenous Peoples</span>
          <span className="text-sm">
            $
            {_data.eligibility_combined ? toReadable(_data.iplc_reward_usd) : 0}
          </span>
        </p>
      </div>

      {CTA && (
        <>
          <Br cn="hidden md:block" />
          <Button
            cn="min-w-32 rounded-t-none md:rounded-xl w-full"
            href={`/${name}/${year}`}
            type="link"
            external
          >
            All Data
          </Button>
        </>
      )}
    </div>
  );
}

function MinimumCriteria({
  currentYear,
  eligibility_deforestation_rate_below_half_percent,
  eligibility_decreasing_trend_of_deforestation,
}: {
  currentYear: string;
  eligibility_deforestation_rate_below_half_percent: boolean;
  eligibility_decreasing_trend_of_deforestation: boolean;
}) {
  return (
    <div>
      <p className="flex items-center gap-2">
        <Image
          className="h-4 w-4 rounded-full p-0.5"
          width={12}
          height={12}
          src={
            eligibility_deforestation_rate_below_half_percent
              ? "/assets/check.svg"
              : "/assets/x.svg"
          }
          alt="Deforestation in current year less than 0.5%"
        />
        Deforestation in {currentYear} less than 0.5%
      </p>
      <div className="my-1"></div>
      <p className="flex items-center gap-2">
        <Image
          className="h-4 w-4 rounded-full p-0.5"
          width={8}
          height={8}
          src={
            eligibility_decreasing_trend_of_deforestation
              ? "/assets/check.svg"
              : "/assets/x.svg"
          }
          alt="Deforestation lower than previous year"
        />
        Deforestation lower than previous year
      </p>
    </div>
  );
}
