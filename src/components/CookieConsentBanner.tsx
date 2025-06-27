"use client";

import { useEffect, useState } from "react";

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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white px-6 py-4 flex justify-between items-center z-50">
      <span>
        This site uses cookies to enhance the user experience. Do you agree?
      </span>
      <div className="space-x-2">
        <button
          onClick={() => handleConsent("yes")}
          className="bg-green-600 px-3 py-1 rounded"
        >
          Agree
        </button>
        <button
          onClick={() => handleConsent("no")}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
