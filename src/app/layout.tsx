import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Br from "@/components/ui/Br";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        <Header />
        <div className="website-container">
          <Br />
          {children}
          <Br />
          <Footer />
        </div>
      </body>
      <Br />
    </html>
  );
}
