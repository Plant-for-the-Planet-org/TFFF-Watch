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

        // Umami analytics: always enabled (user cannot toggle). Preferences section removed below.
        analytics: {
          enabled: true,
          readOnly: true,
        },

        functionality: {
          enabled: false,
          readOnly: false,
          autoClear: {
            cookies: [
              // Keep application functionality cookies here (but move heavy third-party patterns out)
              // cookie_storage_key is presented to user in the preferences table below so they can opt-in to it.
            ],
          },
        },

        // Optional third-party cookies that the app can run without.
        thirdParty: {
          enabled: false,
          readOnly: false,
          autoClear: {
            cookies: [
              // Cloudflare & AWS and similar third-party cookies
              { name: "cf_clearance" },
              { name: "__cf_bm" },
              { name: /^(__cf_.*|cf_.*|substack.*|AWSALBTG.*|AWSALBTGCORS.*)/ },
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
                      // Filter only truly necessary cookies from the original file
                      ...(en.preferencesModal.sections[1].cookieTable?.body?.filter(
                        (cookie) => {
                          const name = String(cookie.name ?? "");
                          const service = String(cookie.service ?? "");

                          // Exclude optional third-party cookies by name or service
                          const isOptionalThirdParty =
                            /^(cf_clearance|__cf_bm|__cf_.*|cf_.*|substack.*|AWSALBTG.*|AWSALBTGCORS.*)/i.test(
                              name
                            ) || /cloudflare|aws|substack/i.test(service);

                          // Keep only cookies that are clearly part of the site's necessary set
                          return (
                            !isOptionalThirdParty &&
                            (service.includes("Plans for the Planet") ||
                              service.includes("CONSENT"))
                          );
                        }
                      ) ?? []),
                    ],
                  },
                },

                // Third section - analytics
                /* Disabled analytics preferences section on purpose: Umami is always enabled and does not need to be allowed by the user.
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
                */

                // Fourth section - functionality (now includes cookie_storage_key as a separate optional cookie)
                {
                  title: "Functionality Cookies",
                  description:
                    "Enable enhanced functionality like newsletter subscriptions.",
                  linkedCategory: "functionality",
                  cookieTable: {
                    headers: {
                      name: "Cookie",
                      description: "Description",
                    },
                    body: [
                      // existing rows (if any) from original functionality section - try to preserve them
                      ...(en.preferencesModal.sections.find(
                        (s) =>
                          s.title?.includes("Functionality") ||
                          s.linkedCategory === "functionality"
                      )?.cookieTable?.body ?? []),
                      // Add cookie_storage_key as an optional functionality cookie
                      {
                        name: "cookie_storage_key",
                        description:
                          "Stores temporary state for client-side features (optional). Enable to persist specific functionality.",
                        service: "App",
                      },
                    ],
                  },
                },

                // Optional third-party cookies section (new)
                {
                  title: "Optional third-party Cookies",
                  description:
                    "Cookies used by third-party services (Cloudflare, AWS load balancers, Substack). The application can run without these.",
                  linkedCategory: "thirdParty",
                  cookieTable: {
                    headers: {
                      name: "Cookie",
                      description: "Description",
                    },
                    body: [
                      {
                        name: "cf_clearance",
                        description:
                          "Cloudflare clearance cookie for CDN routing",
                      },
                      {
                        name: "__cf_bm",
                        description:
                          "Cloudflare bot management cookie used for bot mitigation.",
                      },
                      {
                        name: "AWSALBTG* / AWSALBTGCORS*",
                        description:
                          "AWS load balancer cookies for session stickiness.",
                      },
                      {
                        name: "substack.*",
                        description: "Substack integration cookies.",
                      },
                    ],
                  },
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
        // Notify app components about consent changes
        document.dispatchEvent(new Event("cookieConsentUpdate"));

        // Ensure Umami script is always enabled regardless of consent preferences.
        // Look for a script tag that has data-website-id and remove any blocking type attribute.
        const script = document.querySelector("script[data-website-id]");
        if (script) {
          script.removeAttribute("type");
        }
      },
    });
  }, []);

  return null;
}

export const updateCookieConsent = () => CookieConsent.showPreferences();
export const resetCookieConsent = () => CookieConsent.reset(true);
