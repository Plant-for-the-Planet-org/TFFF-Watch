"use client";

import { useEffect, useState } from "react";

import Script from "next/script";
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

export default function CookieConsentBanner() {
  const [loadScript, setLoadScript] = useState(false);

  useEffect(() => {
    /**
     * All config. options available here:
     * https://cookieconsent.orestbida.com/reference/configuration-reference.html
     */
    listenForConsent({ setLoadScript });
    CookieConsent.run({
      revision: 1,
      cookie: {
        name: "cc_cookie",
        domain: ".plant-for-the-planet.org",
        path: "/",
        sameSite: "Lax",
        secure: true,
      },
      guiOptions: {
        consentModal: {
          layout: "box wide",
          position: "bottom left",
          equalWeightButtons: false,
          flipButtons: true,
        },
        preferencesModal: {
          layout: "bar",
          position: "left",
          equalWeightButtons: false,
          flipButtons: true,
        },
      },
      categories: {
        necessary: {
          readOnly: true,
        },
        functionality: {
          services: {
            youtube: {
              label: "YouTube Videos & (Google)",
              // onAccept: () => im.acceptService("youtube"),
              // onReject: () => im.rejectService("youtube"),
            },
          },
        },
        analytics: {
          services: {
            "google-analytics": {
              label: "Google Analytics",
              onAccept: () => {
                // gtag("consent", "update", {
                //   analytics_storage: "granted",
                // });
              },
              onReject: () => {
                // gtag("consent", "update", {
                //   analytics_storage: "denied",
                // });
              },
            },
            "microsoft-clarity": {
              label: "Microsoft Clarity",
              onAccept: () => {
                // if (typeof clarity === "function") {
                //   clarity("consent");
                // }
              },
              onReject: () => {
                // if (typeof clarity === "function") {
                //   clarity("stop");
                // }
              },
            },
          },
        },
        marketing: {},
        ads: {},
      },
      language: {
        default: "en",

        autoDetect: "browser",
        translations: {
          en,
        },
        // translations: {
        //   en: {
        //     consentModal: {
        //       // title: "We use cookies",
        //       // description:
        //       //   "Hello, this website uses essential cookies to ensure its proper functioning and tracking cookies to understand how you interact with it. The latter is only set after permission.",
        //       // acceptAllBtn: "Accept all",
        //       // acceptNecessaryBtn: "Reject all",
        //       // showPreferencesBtn: "Manage Individual preferences",
        //       label: "Cookie Consent",
        //       title: "Hello there, it's cookie time!",
        //       description:
        //         "We use cookies on our website. With your consent we also use analytics cookies. You can manage your consent any time.",
        //       acceptAllBtn: "Accept all",
        //       closeIconLabel: "Reject all and close",
        //       acceptNecessaryBtn: "Reject optional",
        //       showPreferencesBtn: "Manage preferences",
        //       footer:
        //         '<a href="https://www.plant-for-the-planet.org/imprint">Imprint</a><a href="https://www.plant-for-the-planet.org/privacy/terms">Privacy Policy</a><a href="https://www.plant-for-the-planet.org/terms-and-conditions">Terms and conditions</a>',
        //     },
        //     preferencesModal: {
        //       // title: "Manage cookie preferences",
        //       // acceptAllBtn: "Accept all",
        //       // acceptNecessaryBtn: "Reject all",
        //       // savePreferencesBtn: "Accept current selection",
        //       // closeIconLabel: "Close modal",
        //       // serviceCounterLabel: "Service|Services",
        //       title: "Consent preferences center",
        //       acceptAllBtn: "Accept all",
        //       acceptNecessaryBtn: "Reject optional",
        //       savePreferencesBtn: "Save preferences",
        //       closeIconLabel: "Close modal",
        //       serviceCounterLabel: "Service|Services",
        //       sections: [
        //         {
        //           title: "Your Privacy Choices",
        //           description: `We use cookies to ensure basic website functionality and to improve your online experience. You can choose to opt in or out of each category whenever you want.`,
        //         },
        //         {
        //           title: "Necessary",
        //           description:
        //             "Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.",
        //           linkedCategory: "necessary",
        //         },
        //         {
        //           title: "Functional",
        //           description:
        //             "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
        //           linkedCategory: "functional",
        //         },
        //         {
        //           title: "Analytics",
        //           description:
        //             "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
        //           linkedCategory: "analytics",
        //         },
        //         // {
        //         //   title: 'Performance',
        //         //   description: 'Performance cookies are used to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.',
        //         //   linkedCategory: 'performance',
        //         // },
        //         {
        //           title: "Advertisement",
        //           description:
        //             "Advertisement cookies are used to provide visitors with customized advertisements based on the pages you visited previously and to analyze the effectiveness of the ad campaigns.",
        //           linkedCategory: "advertisement",
        //         },
        //         {
        //           title: "More information",
        //           // description: 'For any queries in relation to our policy on cookies and your choices, please <a href="/contact">contact us</a>.',
        //           description:
        //             "For any queries in relation to our policy on cookies and your choices, please contact us.",
        //         },
        //       ],
        //     },
        //   },
        // },
      },
    });
  }, []);

  return (
    <>
      {loadScript && (
        <Script
          async
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
      )}
    </>
  );
}

export { resetCookieConsent, updateCookieConsent };
