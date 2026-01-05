"use client";

import ContentSection from "@/components/ui/ContentSection";
import RichToHTML from "./RichToHTML";
import dynamic from "next/dynamic";
import Br from "@/components/ui/Br";

// Dynamically import the map component to avoid SSR issues with map libraries
const EndorsementMap = dynamic(
  () => import("@/components/maps/world/EndorsementMap"),
  { ssr: false }
);

export default function CountrySignatories() {
  const handleCountryClick = (country: {
    iso2: string;
    slug: string;
    name: string;
  }) => {
    // You can add navigation or other actions when a country is clicked
    console.log("Selected country:", country);
  };

  return (
    <div className="border border-base-gray rounded-xl padding-3">
      <div className="extra-padding-x-4 flex flex-col divide-y divide-base-gray">
        <ContentSection
          icon="/assets/investment-endorsement.svg"
          title="Signatory of the TFFF Declaration"
          className="mb-4"
        >
          <RichToHTML content="See all signatories" />
          <Br />
          <div className="h-[500px] bg-primary-light w-full rounded-lg overflow-hidden">
            <EndorsementMap onCountryClick={handleCountryClick} />
          </div>
        </ContentSection>
      </div>
    </div>
  );
}
