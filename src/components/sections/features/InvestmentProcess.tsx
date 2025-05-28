import Br from "@/components/ui/Br";
import Hr from "@/components/ui/Hr";
import Image from "next/image";

export default function InvestmentProcess() {
  return (
    <div className="border border-base-gray rounding-xl padding-3">
      <Br cn="hidden lg:block" />

      <div className="extra-padding-x-4">
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
              Key leaders in Germany have participated in TFFF meetings and
              expressed support for the project. However, no pledge has been
              made and no pledge amount has been discussed publicly.
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
              src="/assets/investment-how.svg"
              alt="How an investment could work"
            />
            How an investment could work
          </h2>
          <Br />
          <div className="typo-p">
            <p>
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
              src="/assets/investment-endorsement.svg"
              alt="Endorsements"
            />
            Endorsements
          </h2>
          <Br />
          <div className="typo-p">
            <div>
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
            </div>
          </div>
        </div>
      </div>
      <Br cn="hidden lg:block" />
    </div>
  );
}
