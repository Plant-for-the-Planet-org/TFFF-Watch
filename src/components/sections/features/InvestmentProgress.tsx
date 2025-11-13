import Br from "@/components/ui/Br";
import { InvestmentTrackerForCountry } from "@/utils/types";
import Image from "next/image";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

type Props = Partial<InvestmentTrackerForCountry>;

export default function InvestmentProgress({ investment_stage }: Props) {
  const nodes = [
    {
      stage: 1,
      label: "Support expressed",
      display: ["Support", "expressed"],
      success: false,
    },
    {
      stage: 2,
      label: "Intention to invest announced",
      display: ["Intention to invest", "announced"],
      success: false,
    },
    {
      stage: 3,
      label: "Specific investment amount named publicly",
      display: ["Specific investment", "amount named publicly"],
      success: false,
    },
    {
      stage: 4,
      label: "Capital pledged",
      display: ["Capital", "pledged"],
      success: false,
    },
    {
      stage: 5,
      label: "Partial Capital invested",
      display: ["Full Capital", "invested"],
      success: false,
    },
    {
      stage: 6,
      label: "Full Capital invested",
      display: ["Full Capital", "invested"],
      success: false,
    },
  ];

  if (investment_stage) {
    const idx = nodes.findIndex((el) => el.stage === investment_stage);
    for (let i = 0; i <= idx; i++) {
      nodes[i].success = true;
    }
  }

  return (
    <div className="bg-primary-light rounding-xl padding-3">
      <div
        // className="container mx-auto h-36 w-full flex justify-between items-center overflow-x-scroll overscroll-x-auto padding-x-4 scrollbar-transparent"
        className="w-8 py-2 md:h-36 md:w-full flex flex-col md:flex-row justify-between items-center padding-x-4"
      >
        {nodes.map((el, key) => (
          <Fragment key={key}>
            <div
              className={twMerge(
                "shrink-0 w-6 h-6 rounded-full border border-base-text relative",
                // el.success && "bg-primary border-primary-light"
                el.success && "border-primary-light"
                // key === 0 && "ml-6",
                // key === nodes.length - 1 && "mr-6"
              )}
            >
              <Image
                className={twMerge(el.success ? "block" : "hidden")}
                width={24}
                height={24}
                src="/assets/check.svg"
                alt="Completed"
              />
              <div className="absolute top-1 left-8 md:top-7 md:left-[50%] md:translate-x-[-50%]">
                <div
                  className={twMerge(
                    "w-3xs sm:w-sm md:w-[180px] md:text-center typo-p",
                    el.success && "font-bold"
                  )}
                >
                  <div className="hidden md:block">
                    {el.display.map((el, k) => (
                      <p key={k}>{el}</p>
                    ))}{" "}
                  </div>
                  <div className="md:hidden">{el.label}</div>
                </div>
              </div>
            </div>
            {key < nodes.length - 1 && (
              <>
                <div className="hidden md:block min-w-[128px] grow border border-base-text"></div>
                <div className="md:hidden min-h-8 w-0 grow border border-base-text"></div>
              </>
            )}
          </Fragment>
        ))}
      </div>
      <div className="hidden md:block">
        <Br />
        <Br />
      </div>
    </div>
  );
}
