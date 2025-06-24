import Image from "next/image";

export default function TFFFHero() {
  return (
    <div className="relative -mt-3 md:-mt-4 xl:-mt-5">
      <div className="relative md:absolute z-20 inset-x-0 bottom-0">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute md:relative z-10 inset-0 left-1/2 right-1/2 lg:ml-[-50vw] lg:mr-[-50vw] lg:w-full lg:max-w-screen "> */}
      {/* <div className="absolute z-10 inset-0 md:relative lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] lg:w-screen lg:max-w-screen box-border"> */}
      {/* <div className="absolute inset-0 z-10 md:relative md:inset-auto md:w-screen md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[40vw] md:box-border"> */}
      <div className="absolute inset-0 z-10 md:relative md:inset-auto md:w-screen md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[50vw] md:box-border">
        <Image
          height="700"
          width="1440"
          className="w-full h-full md:max-h-[50vh] object-cover object-center"
          src="/assets/tropical-rainforest.jpg"
          alt="Tropical Rainforest with Big Trees"
        />
      </div>
    </div>
  );
}
