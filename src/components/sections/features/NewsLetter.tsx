"use client";

import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

export default function NewsLetter() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check initial consent
    setShowNewsletter(CookieConsent.acceptedCategory("functionality"));

    // Listen for consent changes
    const handleConsentChange = () => {
      setShowNewsletter(CookieConsent.acceptedCategory("functionality"));
    };
    window.addEventListener("cc:onChange", handleConsentChange);

    return () => {
      window.removeEventListener("cc:onChange", handleConsentChange);
    };
  }, []);

  return (
    <div className="border border-base-gray outer-rounding outer-padding-3">
      {showNewsletter ? (
        <iframe
          src="https://plansfortheplanet.substack.com/embed"
          width="100%"
          height="320"
          frameBorder="0"
          scrolling="no"
        />
      ) : (
        <div className="text-center p-4">
          <p>
            Please accept functionality cookies to view the newsletter
            subscription form.
          </p>
        </div>
      )}
    </div>
  );
}
