import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import Hr from "@/components/ui/Hr";

export default function AboutTFFFWatch() {
  return (
    <div className="border border-base-gray rounding-xl padding-4">
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
        <Button external>Contact Us</Button>
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
              TFFF Watch is a joint project by Oro Verde, Rainforest Foundation
              Norway and Plant-for-the-Planet. Please contact us if you’re
              interested in contributing.
            </p>
          </div>
        </div>
        <Button external>Contact Us</Button>
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
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}
