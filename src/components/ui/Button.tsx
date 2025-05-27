import Image from "next/image";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  type: "button" | "link";
  href?: string;
  cn?: string;
  external?: boolean;
  children?: ReactNode;
};

export function Button({
  type = "button",
  href = "#",
  cn = "",
  external = false,
  children,
}: Props) {
  const body = (
    <span className="flex justify-between items-center flex-nowrap">
      <span></span>
      <span className="font-semibold typo-p px-4">{children}</span>
      <span>
        {external && (
          <Image
            width={16}
            height={16}
            src="/assets/Arrow.svg"
            alt="External Arror"
          />
        )}
      </span>
    </span>
  );

  const className = twMerge(
    "inline-block bg-primary hover:bg-primary/90 text-white min-w-64 px-6 py-3 rounded-xl cursor-pointer",
    cn
  );

  if (type === "link")
    return (
      <a
        href={href}
        target={external ? "_blank" : "_self"}
        className={className}
      >
        {body}
      </a>
    );

  return <button className={className}>{body}</button>;
}

type IconButtonProps = {
  external?: boolean;
  children?: ReactNode;
};

export function IconButton({
  external = false,
  children = null,
}: IconButtonProps) {
  return (
    <button className="bg-primary text-white h-12 w-12 rounded-full cursor-pointer">
      <span className="flex justify-center items-center">
        {children && <span>{children}</span>}
        {external && (
          <Image
            width={16}
            height={16}
            src="/assets/Arrow.svg"
            alt="External Arror"
          />
        )}
      </span>
    </button>
  );
}
