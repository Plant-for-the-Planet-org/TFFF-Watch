import Br from "@/components/ui/Br";
import Hr from "@/components/ui/Hr";
import { extractLists, serializePersons } from "@/utils/content-helper";
import { formatDateAgo } from "@/utils/datetime";
import { InvestmentTrackerForCountry } from "@/utils/types";
import Image from "next/image";
import { Fragment } from "react";

type Props = Partial<InvestmentTrackerForCountry> & {
  how_an_investment_could_work?: string;
};

export default function InvestmentTrackerContent({
  last_updated,
  status,
  background,
  endorsements,
  CSOs,
  how_an_investment_could_work,
  responsibile_government_office,
}: Props) {
  return (
    <div className="border border-base-gray rounding-xl padding-3">
      <div className="text-end text-[#828282] italic">
        <p>Updated {formatDateAgo(last_updated!)}</p>
      </div>
      <Br cn="hidden lg:block" />

      <div className="extra-padding-x-4">
        <div>
          <h2 className="font-bold typo-h2 flex items-center gap-2">
            <Image
              width={32}
              height={32}
              src="/assets/investment-background.svg"
              alt="Background"
            />
            Background
          </h2>
          <Br />
          <div className="typo-p">
            <div>
              <p>{background}</p>
            </div>
          </div>
        </div>
        <Br />
        <Hr />
        <Br />
        <div>
          <h2 className="font-bold typo-h2 flex items-center gap-2">
            <Image
              width={32}
              height={32}
              src="/assets/investment-status.svg"
              alt="Status"
            />
            Status
          </h2>
          <Br />
          <div className="typo-p">
            <p>
              {/* Key leaders in Germany have participated in TFFF meetings and
              expressed support for the project. However, no pledge has been
              made and no pledge amount has been discussed publicly. */}
              {status}
            </p>
          </div>
        </div>
        <Br />
        <Hr />
        <Br />
        <div>
          <h2 className="font-bold typo-h2 flex items-center gap-2">
            <Image
              width={32}
              height={32}
              src="/assets/investment-responsible-government-office.svg"
              alt="Responsible Government Office"
            />
            Responsible Government Office
          </h2>
          <Br />
          <div className="typo-p">
            {/* <p>{responsibile_government_office}</p> */}
            {serializePersons(responsibile_government_office!).map(
              (el, key) => (
                <div key={key}>
                  <p>
                    <b>{el.name}</b> · {el.organization}
                  </p>
                  <p>{el.email}</p>
                  <Br />
                </div>
              )
            )}
          </div>
        </div>
        <Br />
        <Hr />
        <Br />
        <div>
          <h2 className="font-bold typo-h2 flex items-center gap-2">
            <Image
              width={32}
              height={32}
              src="/assets/investment-how.svg"
              alt="How an investment could work"
            />
            How an investment could work
          </h2>
          <Br />
          <div className="typo-p">
            {extractLists(how_an_investment_could_work!).map((el, key) => (
              <Fragment key={key}>
                <p>{el}</p>
                <Br />
              </Fragment>
            ))}
            {/* <p>{how_an_investment_could_work}</p> */}
            {/* <p>
              Two mechanisms are available through with a German TFFF investment
              could be structured.
            </p>
            <Br />
            <b>Option 1</b>
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
            <Br />
            <b>Option 2</b>
            <Br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p> */}
          </div>
        </div>
        <Br />
        <Hr />
        <Br />
        <div>
          <h2 className="font-bold typo-h2 flex items-center gap-2">
            <Image
              width={32}
              height={32}
              src="/assets/investment-endorsement.svg"
              alt="Endorsements"
            />
            Endorsements
          </h2>
          <Br />
          <div className="typo-p">
            <div>
              <p>{endorsements}</p>
            </div>
            {/* {endorsements!.split("\n- ").map((el, key) => (
              <Fragment key={key}>
                <p>{el}</p>
                <Br />
              </Fragment>
            ))} */}
            {/* <div>
              <b>22 April 2025</b>
              <p>...</p>
              <p>
                <b>Dirk Meyer</b>, Abteilungsleiter Globale Gesundheit,
                Wirtschaft, Handel und ländliche Entwicklung im
                Bundesministerium für wirtschaftliche Zusammenarbeit und
                Entwicklung (BMZ)
              </p>
            </div>
            <div>
              <b>10 Nov 2024</b>
              <p>...</p>
              <p>
                Svenja Schulze, Bundesministerin für wirtschaftliche
                Zusammenarbeit und Entwicklung (BMZ)
              </p>
            </div> */}
          </div>
        </div>
        <Br />
        <Hr />
        <Br />
        <div>
          <h2 className="font-bold typo-h2 flex items-center gap-2">
            <Image
              width={32}
              height={32}
              src="/assets/investment-csos.svg"
              alt="CSOs working on TFFF"
            />
            CSOs working on TFFF
          </h2>
          <Br />
          <div className="typo-p">
            {/* <div>
              <p>{CSOs}</p>
            </div> */}
            {serializePersons(CSOs!).map((el, key) => (
              <div key={key}>
                <p>
                  <b>{el.name}</b> · {el.organization}
                </p>
                <p>{el.email}</p>
                <Br />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Br cn="hidden lg:block" />
    </div>
  );
}
