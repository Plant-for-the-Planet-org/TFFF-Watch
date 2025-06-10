import countries from "i18n-iso-countries";
import { ForestChangeForCountry } from "./types";
// eslint-disable-next-line
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export type CountryDetails = {
  iso2: string;
  iso3: string;
  name: string;
  flagImgUrl: string;
};

export function getCountryDetails(country: string): CountryDetails {
  // const isValid = countries.isValid(capitalize(country));
  // console.log({ isValid });
  // if (!isValid) return null;

  const iso2 = countries.getAlpha2Code(country, "en");
  const iso3 = countries.getAlpha3Code(country, "en");
  const name = countries.getName(iso3!, "en", { select: "official" });
  const flagImgUrl = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${iso2}.svg`;

  const details = {
    iso2: iso2!,
    iso3: iso3!,
    name: name!,
    flagImgUrl,
  };

  // console.log({ details });
  return details;
}

type CountryForestData = {
  [countryName: string]: number;
};
export function transformAllForestCoverChangeData(
  data: ForestChangeForCountry[]
) {
  return data.reduce((acc: CountryForestData, row) => {
    const country = row.country;
    const percDef = row.percentage_deforested || 0;
    const percDeg = row.percentage_degraded || 0;
    acc[country] = percDef + percDeg;
    return acc;
  }, {});
}
