"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function HeaderMenu() {
  const [customOpen, setCustomOpen] = useState(false);
  const [options] = useState([
    { id: 0, href: "/", label: "Home" },
    { id: 1, href: "the-tfff-explained", label: "The TFFF, Explained" },
    // { id: 2, href: "investment-tracker", label: "Investment Tracker" },
    { id: 2, href: "investment-tracker/Germany", label: "Investment Tracker" },
    // { id: 3, href: "friends-of-the-tfff", label: "Friends of the TFFF" },
    { id: 4, href: "about-tfff-watch", label: "About TFFF Watch" },
    { id: 5, href: "press", label: "Press" },
  ]);

  return (
    <Menu>
      {({ close }) => (
        <>
          <MenuButton
            as="button"
            className="p-2 lg:p-4 cursor-pointer outline-none"
            onClick={() => {
              setCustomOpen(!customOpen);
            }}
          >
            <Image
              className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]"
              width={32}
              height={32}
              src="/assets/menu.svg"
              alt="TFFF Watch"
            />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="z-40 p-5 md:p-7 xl:p-9 bg-white divide-y divide-base-gray font-semibold shadow-custom rounding-xl outline-none"
          >
            {options.map((el, key) => (
              <MenuItem key={el.id} as="div">
                <Link
                  href={`/${el.href}`}
                  className={twMerge(
                    "block w-full typo-p py-4",
                    key === 0 && "pt-0",
                    key === options.length - 1 && "pb-0"
                  )}
                  onClick={() => {
                    close();
                  }}
                >
                  <span>{el.label}</span>
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </>
      )}
    </Menu>
  );
}
