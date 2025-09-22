import CookieConsentBanner from "@/components/CookieConsentBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Br from "@/components/ui/Br";
import { env } from "@/utils/env";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "TFFF Watch · Forever Starts Now",
  description:
    "We track investment negotiations and uses satellite analysis to show how much rainforest countries would receive from the TFFF.",
  other: {
    "cookie-policy":
      "We use necessary cookies and optional functionality cookies for newsletter features",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {env.enableUmami && (
        <Script
          defer
          src="https://umami-xgos4ssg4g4cg00k0cgo48cw.gopher.startplanting.org/script.js"
          data-website-id="1ab96188-beb9-4bea-91c8-e0733d35018d"
        ></Script>
      )}

      <body className={`${openSans.variable} antialiased`}>
        <Script
          defer
          src="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.9.1/dist/cookieconsent.js"
        ></Script>
        <CookieConsentBanner />
        {/* <ThirdPartyScripts /> */}
        <Header />
        <Br />
        {children}
        <Br />
        <div className="website-container">
          <Footer />
        </div>
      </body>
      <Br />
    </html>
  );
}
