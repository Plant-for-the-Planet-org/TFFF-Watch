import Br from "@/components/ui/Br";

export default function InvestmentTracker() {
  return (
    <div className="bg-secondary-light rounding-xl padding-3">
      <div className="grid sm:grid-cols-2">
        <div>
          <h2 className="font-bold typo-h2">Investment Tracker</h2>
          <Br />
          <p className="typo-p">
            The TFFF requires $25 billion in sponsor capital. It is to serve as
            the core of the TFFF’s investments and as junior debt in the case of
            losses. The TFFF aims to collect the funds from development banks
            and similar institutions.
          </p>
          <Br />
          <button className="typo-p">Committed & Invested Funds</button>
        </div>
        <div>Graph</div>
      </div>
    </div>
  );
}
