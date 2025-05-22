"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";

export default function Menu() {
  const dialogWidth = 256;
  const [show, setShow] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <button
        ref={triggerRef}
        className="p-2 lg:p-4 cursor-pointer"
        onClick={() => {
          setShow(!show);
          if (!triggerRef.current || !dialogRef.current) return;
          const { bottom, right } = triggerRef.current?.getBoundingClientRect();
          dialogRef.current.style.width = dialogWidth + "px";
          dialogRef.current.style.top = bottom + "px";
          dialogRef.current.style.left = right - dialogWidth + "px";
        }}
      >
        <Image
          className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]"
          width={32}
          height={32}
          src="/assets/menu.svg"
          alt="TFFF Watch"
        />
      </button>
      <dialog
        ref={dialogRef}
        open={show}
        className="z-40 p-6 shadow-custom rounding-xl"
      >
        <div className="divide-y divide-base-gray font-semibold">
          <MenuItem>
            <Link href="the-tfff-idea">The TFFF Idea</Link>
          </MenuItem>
          <MenuItem>
            <Link href="investment-tracker">Investment Tracker</Link>
          </MenuItem>
          <MenuItem>
            <Link href="friends-of-the-tfff">Friends of the TFFF</Link>
          </MenuItem>
          <MenuItem>
            <Link href="about-tfff-watch">About TFFF Watch</Link>
          </MenuItem>
          <MenuItem>
            <Link href="press-contact">Press Contact</Link>
          </MenuItem>
        </div>
      </dialog>
    </div>
  );
}

function MenuItem({ children }: { children: ReactNode }) {
  return <div className="py-4">{children}</div>;
}
