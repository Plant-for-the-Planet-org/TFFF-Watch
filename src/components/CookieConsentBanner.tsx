"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { en } from "./cookieconsent-languages";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    _ccRun?: boolean;
    umami?: {
      track: (event: string) => void;
    };
  }
}

const getDomain = () => {
  const hostname = window.location.hostname;
  if (hostname === "localhost") return "";
  if (hostname === "tfff-watch.vercel.app") return "vercel.app";
  return hostname.includes("tfffwatch.org") ? ".tfffwatch.org" : hostname;
};

export default function CookieConsentBanner() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window._ccRun) return;

    CookieConsent.run({
      revision: 0.1,
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
        analytics: {
          enabled: false,
          readOnly: false,
          autoClear: {
            cookies: [
              {
                name: /_umami.*/,
                domain: ".startplanting.org",
              },
            ],
          },
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
        },
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: en.consentModal,
            preferencesModal: {
              ...en.preferencesModal,
              sections: [
                // First section - intro
                en.preferencesModal.sections[0],

                // Second section - necessary cookies with table
                {
                  ...en.preferencesModal.sections[1],
                  cookieTable: {
                    headers: {
                      name: "Cookie",
                      domain: "Domain",
                      description: "Description",
                      service: "Service",
                    },
                    body: [
                      // Filter only non-commented cookies from the original file
                      ...(en.preferencesModal.sections[1].cookieTable?.body?.filter(
                        (cookie) =>
                          cookie.service.includes("Plans for the Planet") ||
                          cookie.service.includes("CONSENT")
                      ) ?? []),
                    ],
                  },
                },

                // Third section - analytics
                {
                  title: "Analytics Cookies",
                  description:
                    "Help us understand how visitors interact with our website using Umami analytics.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: {
                      name: "Cookie",
                      description: "Description",
                    },
                    body: [
                      {
                        name: "_umami.*",
                        description: "Anonymous usage analytics (self-hosted)",
                      },
                    ],
                  },
                },

                // Fourth section - functionality
                {
                  title: "Functionality Cookies",
                  description:
                    "Enable enhanced functionality like newsletter subscriptions.",
                  linkedCategory: "functionality",
                },

                // Last section - more information
                en.preferencesModal.sections[
                  en.preferencesModal.sections.length - 1
                ],
              ],
            },
          },
        },
      },
      onFirstConsent: ({}) => {
        localStorage.setItem("ccConsentGiven", "true");
      },
      onConsent: ({}) => {
        // Handle newsletter visibility
        document.dispatchEvent(new Event("cookieConsentUpdate"));

        // Handle Umami analytics
        const script = document.querySelector("script[data-website-id]");
        if (CookieConsent.acceptedCategory("analytics")) {
          script?.removeAttribute("type"); // Enable script
        } else {
          script?.setAttribute("type", "javascript/blocked"); // Disable script
        }
      },
    });
  }, []);

  return null;
}

export const updateCookieConsent = () => CookieConsent.showPreferences();
export const resetCookieConsent = () => CookieConsent.reset(true);
