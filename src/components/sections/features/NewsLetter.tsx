"use client";

import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { updateCookieConsent } from "@/components/CookieConsentBanner";

export default function NewsLetter() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateNewsletter = () => {
      setShowNewsletter(CookieConsent.acceptedCategory("functionality"));
    };

    // Check initial consent
    updateNewsletter();

    // Listen for consent changes
    window.addEventListener("cc:onChange", updateNewsletter);
    document.addEventListener("cookieConsentUpdate", updateNewsletter);

    return () => {
      window.removeEventListener("cc:onChange", updateNewsletter);
      document.removeEventListener("cookieConsentUpdate", updateNewsletter);
    };
  }, []);

  return (
    <div className="outer-rounding">
      {showNewsletter ? (
        <iframe
          src="https://plansfortheplanet.substack.com/embed"
          width="100%"
          height="320"
        />
      ) : (
        <div className="text-center p-4">
          <p>
            Please{" "}
            <button
              onClick={updateCookieConsent}
              className="text-primary hover:underline hover:cursor-pointer focus:outline-none"
            >
              accept functionality cookies
            </button>{" "}
            to view the newsletter subscription form.
          </p>
        </div>
      )}
    </div>
  );
}
