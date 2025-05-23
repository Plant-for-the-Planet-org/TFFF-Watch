"use client";

import Br from "@/components/ui/Br";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";

export default function InvestmentProgress() {
  const nodes = useMemo(
    () => [
      {
        label: "Support expressed",
        display: ["Support", "expressed"],
        success: true,
      },
      {
        label: "Intention to invest announced",
        display: ["Intention to invest", "announced"],
        success: true,
      },
      {
        label: "Specific investment amount(s) named publicly",
        display: ["Specific investment", "amount(s) named"],
        success: true,
      },
      {
        label: "Capital pledged",
        display: ["Capital", "pledged"],
        success: false,
      },
      {
        label: "Capital invested",
        display: ["Capital", "invested"],
        success: false,
      },
    ],
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const lastSuccessIndex = [...nodes].reverse().findIndex((el) => el.success);
    if (lastSuccessIndex === -1) return;

    const targetIndex = nodes.length - 1 - lastSuccessIndex;
    const targetNode = nodeRefs.current[targetIndex];
    const container = containerRef.current;

    if (targetNode && container) {
      const nodeLeft = targetNode.offsetLeft;
      container.scrollTo({
        left: nodeLeft - 96,
        behavior: "smooth",
      });
    }
  }, [nodes]);

  return (
    <div className="bg-primary-light rounding-xl padding-3">
      <div
        ref={containerRef}
        className="container mx-auto h-36 w-full flex justify-between items-center overflow-x-scroll overscroll-x-auto padding-x-4 scrollbar-transparent"
      >
        {nodes.map((el, key) => (
          <Fragment key={key}>
            <div
              ref={(elRef) => {
                nodeRefs.current[key] = elRef;
              }}
              className={twMerge(
                "shrink-0 w-7 h-7 rounded-full border border-base-text relative",
                el.success && "bg-primary border-primary-light",
                key === 0 && "ml-6",
                key === nodes.length - 1 && "mr-6"
              )}
            >
              <Image
                className={twMerge(
                  "p-1.5 pt-2 text-center",
                  el.success ? "block" : "hidden"
                )}
                width={30}
                height={26}
                src="/assets/progress-check.png"
                alt="Completed"
              />
              <div className="absolute top-7 left-[50%] translate-x-[-50%]">
                <div
                  className={twMerge(
                    "w-[160px] text-center typo-p",
                    el.success && "font-bold"
                  )}
                >
                  {el.display.map((el, k) => (
                    <p key={k}>{el}</p>
                  ))}
                </div>
              </div>
            </div>
            {key < nodes.length - 1 && (
              <div className="min-w-[128px] grow rounded-full border border-base-text"></div>
            )}
          </Fragment>
        ))}
      </div>
      <Br />
      <Br />
    </div>
  );
}
