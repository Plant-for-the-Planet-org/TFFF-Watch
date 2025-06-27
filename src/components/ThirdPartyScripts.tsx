"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function ThirdPartyScripts() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    setEnabled(consent === "yes");
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Example: Segment */}
      <Script
        src="https://cdn.segment.com/analytics.js/v1/YOUR_WRITE_KEY/analytics.min.js"
        strategy="afterInteractive"
      />
      <Script id="init-segment" strategy="afterInteractive">
        {`
          analytics.load("YOUR_WRITE_KEY");
          analytics.page();
        `}
      </Script>
    </>
  );
}
