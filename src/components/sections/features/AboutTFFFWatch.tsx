import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import Hr from "@/components/ui/Hr";
import Link from "next/link";

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
              The TFFF Watch is a satellite-based monitoring system designed to
              track forest changes as defined by the TFFF rules and support
              performance-based payment mechanisms. By integrating
              high-resolution satellite data and scientifically established
              methodologies, the system ensures accurate, transparent, and
              consistent evaluation of forest conservation outcomes across
              tropical and subtropical regions.
            </p>
            <Br></Br>
            <b>Baseline Forest Calculations</b>
            <p>
              To establish the forest baseline, the system first identifies
              tropical and subtropical moist broadleaf forests for inclusion
              using the Ecoregion-Based Approach dataset (
              <Link
                href="https://academic.oup.com/bioscience/article/67/6/534/3102935"
                className="underline text-blue-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                Dinerstein et al., 2017
              </Link>
              ). Within these zones, the Hansen/Global Forest Watch dataset (
              <Link
                href="https://www.science.org/doi/10.1126/science.1244693"
                className="underline text-blue-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                Hansen et al., 2013
              </Link>
              ) is used to calculate the remaining forest cover as of the
              previous year. The baseline is established by subtracting areas of
              tree cover loss recorded annually from 2000 onwards and adding
              areas of forest gain observed between 2000 and 2012. Newer forest
              gain data is not currently available. This results in a dynamic,
              annually updated map of remaining forest cover, which serves as
              the reference area for the base payouts and subsequent
              deforestation and degradation assessments.
            </p>
            <Br></Br>
            <b>Deforestation Monitoring</b>
            <p>
              New deforestation events are identified annually using updated
              Hansen/Global Forest Watch data. These are areas of tree cover
              loss that occur within the forest baseline in the current
              reporting year. In addition, deforestation rates from the previous
              year are calculated to determine a country’s eligibility for TFFF
              payments, in accordance with predefined thresholds and criteria.
              This ensures that payments are made only to countries that meet or
              exceed performance expectations in limiting deforestation.
            </p>
            <Br></Br>
            <b>Degradation Assessment</b>
            <p>
              Forest degradation is assessed through monthly fire severity
              analysis using Sentinel-2 satellite imagery. The system calculates
              the difference in Normalized Burn Ratio (dNBR) values before and
              after fire events for each month. These monthly fire severity maps
              are then merged into a single, comprehensive annual degradation
              map. Double counting is prevented by counting a pixel only once,
              even if fires are detected in multiple months.
            </p>
            <Br></Br>
            <p>
              The degradation analysis is restricted to the remaining forest
              areas defined in the baseline calculation. The final outputs are
              country-level statistics on moderate to high severity fire
              impacts, which contribute to TFFF payment discounts for the
              current and subsequent years.
            </p>
            <Br></Br>
            <b>Feedback</b>
            <p>
              We are continuing to refine our methodology and would welcome any
              feedback at{" "}
              <Link
                href="mailto:tushar.bharadwaj@plant-for-the-planet.org"
                className="underline text-blue-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                tushar.bharadwaj@plant-for-the-planet.org
              </Link>
              .
            </p>
          </div>
          <Br />
          <div className="text-center md:text-left">
            <Button
              href="https://docs.google.com/document/d/1-WlaepOLsm4P6F603NSfyc_ffaoWTeLTfG1hvJayfp4/edit?usp=sharing"
              type="link"
              external
            >
              Detailed Methodology
            </Button>
          </div>
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
