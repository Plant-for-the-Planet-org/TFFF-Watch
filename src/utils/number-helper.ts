import millify from "millify";

export function toReadable(n: number | string) {
  return millify(+n, { lowercase: true, precision: 2, locales: "en" });
}

export function toReadableAmount(n: number | string, decimal: boolean = true) {
  return (
    "$" +
    millify(+n, {
      lowercase: true,
      precision: decimal ? 2 : 0,
      locales: "en",
      units: ["", "k", "m", "bn", "t"],
    })
  );
}

export function toReadableAmountLong(
  n: number | string,
  withSymbol = true,
  decimal = false
): string {
  const num = +n;
  const prefix = withSymbol ? "$" : "";
  const decimalPlaces = decimal ? 3 : 0;

  // Helper to remove trailing zeros
  const formatNumber = (value: number) => {
    return parseFloat(value.toFixed(decimalPlaces)).toString();
  };

  if (num >= 1e9) {
    // For billions
    return `${prefix}${formatNumber(num / 1e9)} Billion`;
  } else if (num >= 1e6) {
    // For millions
    return `${prefix}${formatNumber(num / 1e6)} Million`;
  } else if (num >= 1e3) {
    // For thousands
    return `${prefix}${formatNumber(num / 1e3)} Thousand`;
  }

  return `${prefix}${formatNumber(num)}`;
}
