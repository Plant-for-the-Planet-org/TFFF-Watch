import millify from "millify";

export function toReadable(n: number | string) {
  return millify(+n, { lowercase: true, precision: 1, locales: "en" });
}

export function toReadableAmount(n: number | string) {
  return "$" + millify(+n, { lowercase: true, precision: 1, locales: "en" });
}

export function toReadableAmountLong(
  n: number | string,
  withSymbol = true,
  decimal = false
): string {
  const num = +n;
  const prefix = withSymbol ? "$" : "";
  const toFixedValue = decimal ? 1 : 0;

  if (num >= 1e9) {
    // For billions
    return `${prefix}${(num / 1e9).toFixed(toFixedValue)} Billion`;
  } else if (num >= 1e6) {
    // For millions
    return `${prefix}${(num / 1e6).toFixed(toFixedValue)} Million`;
  } else if (num >= 1e3) {
    // For thousands
    return `${prefix}${(num / 1e3).toFixed(toFixedValue)} Thousand`;
  }

  return `${prefix}${num.toFixed(toFixedValue)}`;
}
