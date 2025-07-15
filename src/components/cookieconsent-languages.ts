export const en = {
  consentModal: {
    label: "Cookie Consent",
    title: "Hello there, it's cookie time!",
    description:
      "We use cookies on our website. With your consent we also use analytics cookies. You can manage your consent any time.",
    acceptAllBtn: "Accept all",
    closeIconLabel: "Reject all and close",
    acceptNecessaryBtn: "Reject optional",
    showPreferencesBtn: "Manage preferences",
    footer:
      '<a href="https://www.plant-for-the-planet.org/imprint">Imprint</a><a href="https://www.plant-for-the-planet.org/privacy/terms">Privacy Policy</a><a href="https://www.plant-for-the-planet.org/terms-and-conditions">Terms and conditions</a>',
  },
  preferencesModal: {
    title: "Consent preferences center",
    acceptAllBtn: "Accept all",
    acceptNecessaryBtn: "Reject optional",
    savePreferencesBtn: "Save preferences",
    closeIconLabel: "Close modal",
    serviceCounterLabel: "Service|Services",
    sections: [
      {
        title: "Somebody said ... cookies?",
        description:
          "Our website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. Your consent also extends to data transmission to providers in the USA. We would like to point out that according to the case law of the European Court of Justice, the USA currently does not have a level of data protection comparable to that of the EU and there is a risk of data processing by government agencies going unnoticed. You can revoke or downgrade this consent at any time in the settings below.",
      },
      {
        title:
          'Strictly necessary cookies <span class="pm__badge">Always enabled</span>',
        description:
          "Without these cookies we can't show your the content or load the website. These cookies are always enabled because they are required for basic website functions.",
        linkedCategory: "necessary",
        cookieTable: {
          headers: {
            name: "Cookie",
            domain: "Domain",
            description: "Description",
            service: "Service",
          },
          body: [
            /* {
              service: "Plant-for-the-Planet",
              name: "probe-deck_",
              domain: ".plant-for-the-planet.org",
              description: "Used for website performance monitoring",
            },
            {
              service: "Plant-for-the-Planet",
              name: "probe-luma",
              domain: ".plant-for-the-planet.org",
              description: "Used for website performance monitoring",
            }, */
            {
              service: "Plant-for-the-Planet",
              name: "config",
              domain: ".plant-for-the-planet.org",
              description: "Stores user preferences",
            },
            {
              service: "Plant-for-the-Planet",
              name: "CONSENT",
              domain: ".plant-for-the-planet.org",
              description: "Stores user consent preferences",
            },
            /* {
              service: "Plant-for-the-Planet",
              name: "theme",
              domain: ".plant-for-the-planet.org",
              description: "Stores user preferences",
            },
            {
              service: "Plant-for-the-Planet",
              name: "countryCode",
              domain: ".plant-for-the-planet.org",
              description: "Stores user preferences",
            },
            {
              service: "Plant-for-the-Planet",
              name: "language",
              domain: ".plant-for-the-planet.org",
              description: "Stores user preferences",
            }, */
            {
              service: "Plant-for-the-Planet",
              name: "cookieOptionaltice",
              domain: ".plant-for-the-planet.org",
              description: "Stores user cookie Optionaltice preferences",
            },
            /*  {
              service: "Plant-for-the-Planet",
              name: "currencyCode",
              domain: ".plant-for-the-planet.org",
              description: "Stores user currency preferences",
            },
            {
              service: "Plant-for-the-Planet",
              name: "redeemPopup",
              domain: ".plant-for-the-planet.org",
              description: "Stores user preferences",
            }, */
            /* {
              service: "Plant-for-the-Planet",
              name: "showVideo",
              domain: ".plant-for-the-planet.org",
              description: "Stores user preferences",
            }, */
            /* {
              service: "Plant-for-the-Planet",
              name: "PHPSESSID",
              domain: ".plant-for-the-planet.org",
              description: "Preserves user session state",
            },
            {
              service: "Plant-for-the-Planet",
              name: "sessionId",
              domain: ".plant-for-the-planet.org",
              description: "Preserves user session state",
            },
            {
              service: "Plant-for-the-Planet",
              name: "nextId",
              domain: ".plant-for-the-planet.org",
              description: "Preserves user session state",
            },
            {
              service: "Plant-for-the-Planet",
              name: "requests",
              domain: ".plant-for-the-planet.org",
              description: "Preserves user session state",
            },
            {
              service: "YouTube",
              name: "YSC",
              domain: ".youtube.com",
              description: "Records a unique ID to keep statistics",
            }, */
            /*  {
              service: "YouTube",
              name: "YtIdbMeta#databases",
              domain: ".youtube.com",
              description: "Used to store YouTube database info",
            },
            {
              service: "YouTube",
              name: "yt-remote-cast-available",
              domain: ".youtube.com",
              description: "Stores user's video casting preferences",
            },
            {
              service: "YouTube",
              name: "yt-remote-cast-installed",
              domain: ".youtube.com",
              description: "Stores user's video casting preferences",
            },
            {
              service: "YouTube",
              name: "yt-remote-connected-devices",
              domain: ".youtube.com",
              description: "Stores user's video casting preferences",
            },
            {
              service: "YouTube",
              name: "yt-remote-device-id",
              domain: ".youtube.com",
              description: "Stores user's video casting preferences",
            },
            {
              service: "YouTube",
              name: "yt-remote-fast-check-period",
              domain: ".youtube.com",
              description: "Stores user's video casting preferences",
            },
            {
              service: "YouTube",
              name: "yt-remote-session-app",
              domain: ".youtube.com",
              description: "Stores user's video casting preferences",
            },
            {
              service: "YouTube",
              name: "yt-remote-session-name",
              domain: ".youtube.com",
              description: "Stores user's video casting preferences",
            }, */
            {
              service: "Plans for the Planet Substack via Cloudflare",
              name: "cf_clearance",
              domain: ".substack.com / .cloudflare.com",
              description:
                "Used to prove your browser passed a security check and prevent repeated challenges. Essential for access.",
            },
            {
              service: "Plans for the Planet Substack via Cloudflare",
              name: "__cf_bm",
              domain: ".substack.com / .cloudflare.com",
              description:
                "Helps Cloudflare distinguish between bots and humans to protect our site from automated abuse. Does not store personal data.",
            },
            {
              service: "Plans for the Planet Substack",
              name: "cookie_storage_key",
              domain: ".substack.com / .cloudflare.com",
              description:
                "Used by Substack to maintain internal session/context for the embed.",
            },
            {
              service:
                "Maintain technical performance - Plans for the Planet Substack",
              name: "AWSALBTG",
              domain: ".substack.com",
              description:
                "AWS Application Load Balancer cookies for session stickiness across servers.",
            },
            {
              service:
                "Maintain technical performance - Plans for the Planet Substack",
              name: "AWSALBTGCORS",
              domain: ".substack.com",
              description:
                "AWS Application Load Balancer cookies for session stickiness across servers.",
            },
          ],
        },
      },
      {
        title: "Analytics cookies",
        description:
          "Analytics cookies help us track how users visit our website and bugs in the website, so we can make sure you get the best experience. We use services like google analytics and Microsoft Clarity for this purpose.",
        linkedCategory: "analytics",
        cookieTable: {
          headers: {
            name: "Cookie",
            domain: "Domain",
            description: "Description",
            service: "Service",
          },
          body: [
            /*  {
              service: "Google",
              name: "_ga",
              domain: ".plant-for-the-planet.org",
              description: "Used to distinguish users",
            },
            {
              service: "Google Tag Manager",
              name: "_gtm",
              domain: ".plant-for-the-planet.org",
              description:
                "Used to manage and deploy some marketing tags and tracking scripts on our website through Google Tag Manager. It enables us to record anonymous data about your browsing behaviour and other interactions with the site. This intel is used for analytical purposes to improve our website's performance, customize your browsing experience, and provide relevant advertising.",
            },
            {
              service: "Microsoft Clarity",
              name: "_clck",
              domain: ".clarity.com",
              description:
                "Used to collect information about how visitors use the website and improve user experience",
            },
            {
              service: "Facebook",
              name: "_fbp",
              domain: ".plant-for-the-planet.org",
              description:
                "Used to distinguish and keep track of unique users.",
            },
            {
              service: "Facebook",
              name: "_fbc",
              domain: ".plant-for-the-planet.org",
              description:
                "Only set when a user arrives at the website from an Ad, and the destination URL includes the click identifier fbclid.",
            }, */
            {
              service: "Drive A/B testing",
              name: "ab_experiment_sampled",
              domain: ".substack.com",
              description:
                "Flags whether the user is included in an experiment/sample group for content variations.",
            },
            {
              service: "Drive A/B testing",
              name: "ab_testing_id",
              domain: ".substack.com",
              description:
                "Unique ID for A/B tests to track which variant a user saw.",
            },
            {
              service: "Collect anonymous interaction analytics",
              name: "ajs_anonymous_id",
              domain: ".substack.com",
              description:
                "Segment.io analytics ID to anonymously identify sessions.",
            },
          ],
        },
      },
      /*  {
        title: "Marketing cookies",
        description:
          "Marketing cookies help us track user interactions across our website to deliver more relevant and personalized content. We use the LinkedIn Insight Tag to show personalised ads on LinkedIn, measure conversions and analyse the audience reach of our ads.",
        linkedCategory: "marketing",
        cookieTable: {
          headers: {
            name: "Cookie",
            domain: "Domain",
            description: "Description",
            service: "Service",
          },
          body: [

          ],
        },
      }, */
      {
        title: "More information",
        description:
          "For any queries in relation to our policy on cookies and your choices, contact us at info@plant-for-the-planet.org",
      },
    ],
  },
};
