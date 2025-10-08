import Image from "next/image";
import Link from "next/link";

export default function TFFFHero() {
  return (
    <div className="relative -mt-3 md:-mt-4 xl:-mt-5">
      <div className="website-container relative md:absolute z-20 inset-x-0 bottom-0">
        <div className="outer-padding-3">
          <div className="grid gap-4 xl:gap-5 grid-cols-1 md:grid-cols-2">
            <div className="text-white rounding-xl padding-3 bg-black/50 backdrop-blur-xl">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 self-stretch aspect-square">
                  <Image
                    className="p-3 aspect-square rounding-lg bg-black/25 backdrop-blur-2xl"
                    height={64}
                    width={64}
                    src={"/assets/TFFF-logo-white.svg"}
                    alt="TFFF"
                  />
                </div>
                <div>
                  <h2 className="font-bold typo-h2">The TFFF</h2>
                  <p className="typo-p">
                    or Tropical Forest Forever Facility, is a proposed
                    investment fund. The fund’s profits reward countries for
                    protecting their rainforest.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-white rounding-xl padding-3 bg-black/50 backdrop-blur-xl">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 self-stretch aspect-square">
                  <Image
                    className="p-3 aspect-square rounding-lg bg-black/25 backdrop-blur-2xl"
                    height={64}
                    width={64}
                    src={"/assets/tf-white.svg"}
                    alt="TF"
                  />
                </div>
                <div>
                  <h2 className="font-bold typo-h2">TFFF Watch</h2>
                  <p className="typo-p">
                    tracks the investment negotiations and uses satellite
                    analysis to show how much countries would receive if the
                    TFFF already existed.
                  </p>
                  <p className="typo-p">
                    Please cite data as{" "}
                    <i>
                      <Link
                        className="underline"
                        href={"https://tfffwatch.org/"}
                      >
                        tfffwatch.org
                      </Link>{" "}
                      by Plant-for-the-Planet
                    </i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-10 md:relative">
        <Image
          height="700"
          width="1440"
          fetchPriority="high"
          className="w-full h-full h-100vh max-h-[64vh] object-cover object-center"
          src="/assets/tropical-rainforest.jpg"
          alt="Tropical Rainforest with Big Trees"
        />
      </div>
    </div>
  );
}
