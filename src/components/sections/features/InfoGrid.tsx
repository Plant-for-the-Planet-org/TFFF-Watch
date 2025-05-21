import WhatsTFFFWatch from "@/components/sections/features/WhatsTFFFWatch";
import WhatsTheTFFF from "@/components/sections/features/WhatsTheTFFF";

export default function InfoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 xl:gap-5">
      <WhatsTheTFFF />
      <WhatsTFFFWatch />
    </div>
  );
}
