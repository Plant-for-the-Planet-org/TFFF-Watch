import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import Hr from "@/components/ui/Hr";

export default function AboutTFFFWatch() {
  return (
    <div className="border border-base-gray rounding-xl padding-3">
      <Br cn="hidden lg:block" />
      <div className="extra-padding-x-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="shrink">
            <h2 className="font-bold typo-h2">Report errors or suggestions</h2>
            <Br />
            <div className="typo-p">
              <p>
                Have you noticed errors in our results or methodology? Or do you
                have an idea how we could improve upon TFFF Watch?
              </p>
            </div>
          </div>
          <Button
            href="mailto:pakhi.das@plant-for-the-planet.org"
            type="link"
            external
          >
            Contact Us
          </Button>
        </div>
        <Br />
        <Hr />
        <Br />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="shrink">
            <h2 className="font-bold typo-h2">Contribute</h2>
            <Br />
            <div className="typo-p">
              <p>
                TFFF Watch is a joint project by Oro Verde, Rainforest
                Foundation Norway and Plant-for-the-Planet. Please contact us if
                you’re interested in contributing.
              </p>
            </div>
          </div>
          <Button
            href="mailto:pakhi.das@plant-for-the-planet.org"
            type="link"
            external
          >
            Contact Us
          </Button>
        </div>
        <Br />
        <Hr />
        <Br />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="shrink">
            <h2 className="font-bold typo-h2">Cautionary Note</h2>
            <Br />
            <div className="typo-p">
              <p>
                Deforestation and degradation areas are highly sensitive to
                small changes in methodology. Since the monitoring rules as set
                out in Concept Note 3.0 do not specify data sources or lack key
                details, we needed to make certain assumptions (see methodology
                section) for this model. The methodology has not (yet) been
                peer-reviewed. We intend to update our model as more information
                becomes available.
              </p>
            </div>
          </div>
        </div>
        <Br />
        <Hr />
        <Br />
        <div>
          <h2 className="font-bold typo-h2">Analysis Methodology</h2>
          <Br />
          <Br />
          <div className="typo-p">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <Br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <Br />
          <Button
            href="mailto:pakhi.das@plant-for-the-planet.org"
            type="link"
            external
          >
            Detailed Methodology
          </Button>
        </div>
        <Br />
        <Hr />
        <Br />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="shrink">
            <h2 className="font-bold typo-h2">Data Access</h2>
            <Br />
            <div className="typo-p">
              <p>
                Access all country investment tracker and rainforest country
                financial data in a Google Sheet.
              </p>
            </div>
          </div>
          <Button
            href="https://docs.google.com/spreadsheets/d/13MUmpCrbldgWTlNRIvq58N3O721_ufP7rTyNxX1V0Vk/edit?gid=1842175288#gid=1842175288"
            type="link"
            external
          >
            Access Data
          </Button>
        </div>
      </div>
      <Br cn="hidden lg:block" />
    </div>
  );
}
