"use client";

import { useEffect, useState } from "react";

import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { en } from "./cookieconsent-languages";

declare const window: Window & {
  dataLayer: Record<string, unknown>[];
  _ccRun?: boolean;
};

const updateCookieConsent = () => {
  CookieConsent.showPreferences();
};

const resetCookieConsent = () => {
  CookieConsent.reset(true);
};

type ListenForConsentState = {
  setLoadScript: React.Dispatch<React.SetStateAction<boolean>>;
};
const listenForConsent = (state: ListenForConsentState) => {
  if (window._ccRun) return;

  window.dataLayer = window.dataLayer || [];
  // function gtag() {
  //   window.dataLayer.push(arguments);
  // }

  // gtag("consent", "default", {
  //   ad_storage: "denied",
  //   ad_user_data: "denied",
  //   ad_personalization: "denied",
  //   analytics_storage: "denied",
  //   functionality_storage: "denied",
  //   personalization_storage: "denied",
  //   security_storage: "granted",
  // });

  state.setLoadScript(true);

  // gtag("js", new Date());
  // gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);

  // const updateGtagConsent = () => {
  //   gtag("consent", "update", {
  //     ad_storage: CookieConsent.acceptedCategory("advertisement")
  //       ? "granted"
  //       : "denied",
  //     ad_user_data: CookieConsent.acceptedCategory("advertisement")
  //       ? "granted"
  //       : "denied",
  //     ad_personalization: CookieConsent.acceptedCategory("advertisement")
  //       ? "granted"
  //       : "denied",
  //     analytics_storage: CookieConsent.acceptedCategory("analytics")
  //       ? "granted"
  //       : "denied",
  //     functionality_storage: CookieConsent.acceptedCategory("functional")
  //       ? "granted"
  //       : "denied",
  //     personalization_storage: CookieConsent.acceptedCategory("functional")
  //       ? "granted"
  //       : "denied",
  //     security_storage: "granted", //necessary
  //   });
  // };

  window.addEventListener("cc:onConsent", () => {
    // updateGtagConsent();
  });

  window.addEventListener("cc:onChange", () => {
    // updateGtagConsent();
  });
};

const getDomain = () => {
  const hostname = window.location.hostname;
  if (hostname === "localhost") return "";
  if (hostname === "tfff-watch.vercel.app") return "vercel.app";
  return hostname.includes("tfffwatch.org") ? ".tfffwatch.org" : hostname;
};

export default function CookieConsentBanner() {
  const [, setLoadScript] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent multiple initializations
    if (window._ccRun) return;

    /**
     * All config. options available here:
     * https://cookieconsent.orestbida.com/reference/configuration-reference.html
     */
    listenForConsent({ setLoadScript });
    CookieConsent.run({
      revision: 0.1, // Increment this when you make changes to cookie policy
      autoShow: true,
      hideFromBots: true,
      cookie: {
        name: "cookie-consent",
        domain: getDomain(),
        path: "/",
        sameSite: "Lax",
        secure: true,
        expiresAfterDays: 365,
      },
      guiOptions: {
        consentModal: {
          layout: "box wide",
          position: "bottom left",
          equalWeightButtons: false,
          flipButtons: true,
        },
        preferencesModal: {
          layout: "box",
          position: "right",
          equalWeightButtons: false,
          flipButtons: true,
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        functionality: {
          enabled: false,
          readOnly: false,
          autoClear: {
            cookies: [
              {
                name: /^(__cf_*|cf_*|substack.*|AWSALBTG.*)/,
              },
            ],
          },
          services: {
            "substack-newsletter": {
              label: "Substack Newsletter",
              // List all Substack related cookies
              cookies: [
                {
                  name: "cf_clearance",
                  domain: ".substack.com",
                },
                {
                  name: "__cf_bm",
                  domain: ".substack.com",
                },
                {
                  name: "cookie_storage_key",
                  domain: ".substack.com",
                },
                {
                  name: "substack.lli",
                  domain: ".substack.com",
                },
                {
                  name: "AWSALBTG",
                  domain: ".substack.com",
                },
                {
                  name: "AWSALBTGCORS",
                  domain: ".substack.com",
                },
              ],
            },
          },
        },
      },
      language: {
        default: "en",
        translations: {
          en,
        },
      },
      onFirstConsent: () => {
        // Store consent status to prevent re-prompting
        localStorage.setItem("ccConsentGiven", "true");
      },
      onConsent: () => {
        // Handle Substack iframe visibility based on consent
        const newsletterIframe = document.querySelector(
          'iframe[src*="substack.com"]'
        ) as HTMLIFrameElement | null;
        if (newsletterIframe) {
          if (CookieConsent.acceptedCategory("functionality")) {
            newsletterIframe.style.display = "block";
          } else {
            newsletterIframe.style.display = "none";
          }
        }
      },
    });
  }, []);

  return null;
}

export { resetCookieConsent, updateCookieConsent };
