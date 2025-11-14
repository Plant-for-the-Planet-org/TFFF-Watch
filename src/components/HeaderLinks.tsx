"use client";

import Link from "next/link";
// import { useState } from "react";

export default function HeaderLinks() {
  // const [options] = useState([
  //   { id: 0, href: "/", label: "Home" },
  //   { id: 1, href: "the-tfff-explained", label: "The TFFF, Explained" },
  //   // { id: 2, href: "investment-tracker", label: "Investment Tracker" },
  //   { id: 2, href: "investment-tracker/Norway", label: "Investment Tracker" },
  //   // { id: 3, href: "friends-of-the-tfff", label: "Friends of the TFFF" },
  //   { id: 4, href: "about-tfff-watch", label: "About TFFF Watch" },
  //   { id: 5, href: "press", label: "Press" },
  // ]);

  return (
    <div>
      <Link href={"/#estimated-payouts"}>Estimated Payouts</Link>
    </div>
  );
}
