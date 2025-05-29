import Image from "next/image";
import Br from "@/components/ui/Br";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/Button";

const data = {
  intactForest: { area: "24.2m", value: "96.8m" },
  discountForDeforestation: { area: "112k", value: "44.8m", percent: "0.45" },
  discountForDegradation: { area: "226k", value: "22.6m", percent: "0.84" },
};

export default function CountryTFFFCard({ iso2 = "" }: { iso2?: string }) {
  console.log(iso2);

  return (
    <div className="w-3xs md:w-md p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 rounding-xl shadow-custom bg-white text-xs sm:text-sm">
      <div className="p-2 px-4 sm:p-0 flex gap-2 justify-between items-center flex-wrap rounded-t-lg bg-primary-light sm:bg-white">
        <p>🇧🇷 Brazil 2024</p>
        <p className="flex items-center gap-2">
          <Image
            className="h-4 w-4 bg-primary rounded-full p-1"
            width={8}
            height={8}
            src="/assets/check.png"
            alt="Meets minumum requirement"
          />{" "}
          Meets minimum requirements
        </p>
      </div>
      <Br />
      <div className="p-2 px-4 sm:p-0">
        <div className="flex justify-between items-center">
          <span>
            Reward for <b>{data.intactForest.area} ha</b> intact forest
          </span>
          <span className={twMerge(`text-[#219653]`, "text-sm")}>
            <b>${data.intactForest.value}</b>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>
            Discount for <b>{data.discountForDeforestation.area} ha</b>{" "}
            deforestation in 2024 ({data.discountForDeforestation.percent})
          </span>
          <span className={twMerge(`text-[#EB5757]`, "text-sm")}>
            <b>${data.discountForDeforestation.value}</b>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>
            Discount for <b>{data.discountForDegradation.area} ha</b>{" "}
            deforestation in 2024 ({data.discountForDegradation.percent})
          </span>
          <span className={twMerge(`text-[#F2994A]`, "text-sm")}>
            <b>${data.discountForDegradation.value}</b>
          </span>
        </div>
      </div>
      <Br />
      <div className="p-2 px-4 sm:p-0 bg-primary-light md:-mx-3 lg:-mx-4 xl:-mx-5 md:p-3 lg:p-4 xl:p-5 xl:py-4 flex justify-between items-center">
        <span>
          <span className="font-semibold">Estimated Reward</span>{" "}
          <i>if TFFF already existed</i>
        </span>
        <span className="text-sm">
          <b>$29.4m</b>
        </span>
      </div>
      <Br cn="hidden md:block" />
      <Button
        cn="min-w-32 rounded-t-none md:rounded-xl w-full"
        type="link"
        external
      >
        All Data
      </Button>
    </div>
  );
}
