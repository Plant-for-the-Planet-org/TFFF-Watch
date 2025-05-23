"use client";

import { useParams } from "next/navigation";

export type ISO2Param = {
  iso: string;
};

export default function HeaderCountry() {
  const params: ISO2Param = useParams();
  const { iso } = params;

  function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char: string) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  if (!iso) return null;
  return (
    <div>
      <p className="flex gap-2 items-center typo-h3">
        <span className="text-2xl">{getFlagEmoji(iso)}</span>
        <b>
          {new Intl.DisplayNames(["en"], { type: "region" }).of(
            iso.toUpperCase()
          )}
        </b>
      </p>
    </div>
  );
}
