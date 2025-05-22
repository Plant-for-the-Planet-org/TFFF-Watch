import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Br from "@/components/ui/Br";

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "TFFF Global Dashboard",
  description: "TFFF Global Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased mx-auto padding-x-2`}>
        <Header />
        <Br />
        {children}
        <Br />
        <Footer />
      </body>
    </html>
  );
}
