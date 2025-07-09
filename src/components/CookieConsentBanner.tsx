"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Br from "./ui/Br";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (value: "yes" | "no") => {
    localStorage.setItem("cookie-consent", value);
    document.cookie = `cookie-consent=${value}; path=/; max-age=31536000`; // 1 year
    setVisible(false);
    window.location.reload(); // to activate scripts
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 padding-3">
      <div className="max-w-sm bg-background rounding-xl outer-padding-3 shadow-custom">
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              width={48}
              height={32}
              src="/assets/cookies.svg"
              alt="Cookies"
            />
          </div>
          <Br />
          <h2 className="typo-h3 font-bold">Cookie settings</h2>
          <Br />
          <p className="typo-p">
            We use cookies to ensure that we give you the best experience on our
            website.
          </p>
          <Br />
          <div className="grid grid-cols-2 gap-2 font-semibold">
            <button
              className="py-2 bg-primary text-white rounded-full hover:opacity-90"
              onClick={() => handleConsent("yes")}
            >
              Allow
            </button>
            <button
              className="py-2 bg-primary-light text-primary rounded-full hover:opacity-80"
              onClick={() => handleConsent("no")}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
