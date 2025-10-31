"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, Suspense } from "react";

interface LinkWithParamsProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  preserveParams?: string[]; // Specific params to preserve, if empty preserves all
  onClick?: () => void;
}

function LinkWithParamsInner({
  href,
  children,
  className,
  target,
  rel,
  preserveParams,
  onClick,
}: LinkWithParamsProps) {
  const searchParams = useSearchParams();

  // Build the href with preserved search params
  const buildHrefWithParams = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const [basePath, existingQuery] = href.split("?");
    const newParams = new URLSearchParams(existingQuery || "");

    // If preserveParams is specified, only preserve those params
    if (preserveParams && preserveParams.length > 0) {
      preserveParams.forEach((param) => {
        const value = currentParams.get(param);
        if (value) {
          newParams.set(param, value);
        }
      });
    } else {
      // Preserve all current params, but let new params override
      currentParams.forEach((value, key) => {
        if (!newParams.has(key)) {
          newParams.set(key, value);
        }
      });
    }

    const queryString = newParams.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  return (
    <Link
      href={buildHrefWithParams()}
      className={className}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function LinkWithParamsFallback({
  href,
  children,
  className,
  target,
  rel,
  onClick,
}: LinkWithParamsProps) {
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default function LinkWithParams(props: LinkWithParamsProps) {
  return (
    <Suspense fallback={<LinkWithParamsFallback {...props} />}>
      <LinkWithParamsInner {...props} />
    </Suspense>
  );
}
