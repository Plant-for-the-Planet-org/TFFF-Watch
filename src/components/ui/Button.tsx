import Image from "next/image";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  type: "button" | "link";
  href?: string;
  cn?: string;
  external?: boolean;
  children?: ReactNode;
  onClick?: ComponentProps<"button">["onClick"];
};

export function Button({
  type = "button",
  href = "#",
  cn = "",
  external = false,
  children,
  onClick,
}: Props) {
  const body = (
    <span className="flex justify-between items-center flex-nowrap">
      <span></span>
      <span className="font-semibold typo-p px-4">{children}</span>
      <span>
        {external && (
          <Image
            width={12}
            height={12}
            src="/assets/ui/Arrow.svg"
            alt="External Arror"
          />
        )}
      </span>
    </span>
  );

  const className = twMerge(
    "inline-block bg-primary hover:bg-primary-dark text-white min-w-64 px-6 py-3 rounded-xl cursor-pointer transition-colors",
    cn,
  );

  if (type === "link")
    return (
      <Link
        href={href}
        target={external ? "_blank" : "_self"}
        className={className}
      >
        {body}
      </Link>
    );

  return (
    <button className={className} onClick={onClick}>
      {body}
    </button>
  );
}

type IconButtonProps = {
  small?: boolean;
  href?: string;
  cn?: string;
  external?: boolean;
  children?: ReactNode;
};

export function IconButton({
  small = false,
  href = "#",
  cn = "",
  external = false,
  children = null,
}: IconButtonProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className={twMerge(
        "block bg-primary text-white h-10 w-10 rounded-full cursor-pointer",
        small && "h-8 w-8",
        cn,
      )}
    >
      <span className="h-full flex justify-center items-center">
        {children && <span>{children}</span>}
        {external && (
          <Image
            className={twMerge("", small && "w-3 h-3")}
            width={16}
            height={16}
            src="/assets/ui/Arrow.svg"
            alt="External Arror"
          />
        )}
      </span>
    </Link>
  );
}
