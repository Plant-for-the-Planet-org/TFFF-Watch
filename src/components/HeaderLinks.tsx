"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

export default function HeaderLinks() {
  const pathname = usePathname();

  const [options, setOptions] = useState([
    {
      id: 1,
      href: "/investment-tracker/Norway",
      label: "Investment Tracker",
      isActive: false,
    },
    {
      id: 2,
      href: "/#estimated-payouts",
      label: "Estimated Payouts",
      isActive: false,
    },
    {
      id: 3,
      href: "/the-tfff-explained",
      label: "TFFF Explained",
      isActive: false,
    },
    { id: 4, href: "/about-tfff-watch", label: "About", isActive: false },
    { id: 5, href: "/press", label: "Press", isActive: false },
  ]);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const _options = structuredClone(optionsRef.current);
    _options.forEach((o) => {
      if (o.id === 1) {
        if (pathname.includes("investment-tracker")) {
          o.isActive = true;
        } else o.isActive = false;
      } else if (o.id === 2) {
        if (location.hash === "#estimated-payouts") {
          o.isActive = true;
        } else o.isActive = false;
      } else {
        if (pathname.includes(o.href)) {
          o.isActive = true;
        } else o.isActive = false;
      }
    });

    setOptions(_options);
  }, [pathname]);

  return (
    <div className="flex gap-3 xl:gap-5 items-center">
      {options.map((option) => (
        <div
          key={option.id}
          className={twJoin(option.isActive ? "font-bold" : "font-medium")}
        >
          <Link href={option.href}>{option.label}</Link>
        </div>
      ))}
    </div>
  );
}
