import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import { CountryDetails } from "@/utils/country-helper";
import { forestChangeData } from "@/utils/forestChange.store";
import { toReadable } from "@/utils/number-helper";
import { ForestChangeForCountry } from "@/utils/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

// function formatTwoDecimal(n: number) {
//   return n.toFixed(2);
// }

type Options = {
  CTA?: boolean;
};

export default async function CountryTFFFCard({
  year = "2024",
  name = "",
  flagImgUrl,
  CTA = false,
}: { iso2?: string; year?: string } & Partial<CountryDetails> & Options) {
  // console.log({ forestChangeData });

  const _data: ForestChangeForCountry = forestChangeData.find(
    (el) => +el.year === +year
  )!;

  // const rewardIfAlreadyExisted =
  //   (_data?.base_reward_usd ?? 0) -
  //   (_data?.deforestation_deduction_usd ?? 0) -
  //   (_data?.degradation_deduction_usd ?? 0);

  if (!_data) return null;

  return (
    <div className="w-3xs md:w-md p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 rounding-xl shadow-custom bg-white text-xs sm:text-sm">
      <div className="p-2 px-4 sm:p-0 flex gap-2 justify-between items-center flex-wrap rounded-t-lg bg-primary-light sm:bg-white">
        <p className="flex gap-3.25 items-center">
          <img className="w-3 h-2" alt={name} src={flagImgUrl} />
          {name} {year}
        </p>
        <p className="flex items-center gap-2">
          {_data!.eligible_for_reward ? (
            <>
              <Image
                className="h-4 w-4 bg-primary rounded-full p-1"
                width={8}
                height={8}
                src="/assets/check.png"
                alt="Meets minumum requirement"
              />
              Meets minimum requirements
            </>
          ) : (
            <>
              <Image
                className="h-4 w-4 bg-primary rounded-full p-1"
                width={8}
                height={8}
                src="/assets/check.png"
                alt="Meets minumum requirement"
              />
              Does not meets minimum requirements
            </>
          )}
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
            deforestation in 2024 (
            {toReadable(_data.percentage_degraded) ?? "?"}%)
          </span>
          <span className={twMerge(`text-[#F2994A]`, "text-sm")}>
            <b>-${toReadable(_data.degradation_deduction_usd)}</b>
          </span>
        </div>
      </div>
      <Br />
      <div className="p-2 px-4 sm:p-0 bg-primary-light md:-mx-3 lg:-mx-4 xl:-mx-5 md:p-3 lg:p-4 xl:p-5 xl:py-4">
        <p className="flex justify-between items-center">
          <span>
            <span className="font-semibold">Estimated Reward</span>{" "}
            <i>if TFFF already existed</i>
          </span>
          <span className="text-sm">
            <b>
              {/* {rewardIfAlreadyExisted < 0 && "-"}$
              {Math.abs(rewardIfAlreadyExisted)}m */}
              {toReadable(_data.reward_after_deductions_usd)}
            </b>
          </span>
        </p>
        <p className="flex justify-between items-center font-thin">
          <span>Of which 20% is designated for Indigenous Peoples</span>
          <span className="text-sm">{toReadable(_data.IPLC_reward_usd)}</span>
        </p>
      </div>

      <Br cn="hidden md:block" />
      {CTA && (
        <Button
          cn="min-w-32 rounded-t-none md:rounded-xl w-full"
          type="link"
          external
        >
          All Data
        </Button>
      )}
    </div>
  );
}
