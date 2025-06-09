import millify from "millify";

export function toReadable(n: number | string) {
  return millify(+n, { lowercase: true, precision: 1, locales: "en" });
}
