import { api, urls } from "./axios-helper";
import { getCountryDetails } from "./country-helper";
import { useForestCoverChangeData } from "./store";
import { ForestCoverChange } from "./types";

export let forestChangeData: ForestCoverChange[] = [];

export async function fetchForestCoverChangeData(country?: string) {
  let _results: ForestCoverChange[] = [];
  try {
    _results = await api<ForestCoverChange[]>({
      url: urls.forestChange,
      query: country ? { country: country } : {},
      method: "GET",
      token: "",
    });
    forestChangeData = _results;
    useForestCoverChangeData
      .getState()
      .setForestCoverChangeDataByCountry(_results);

    return _results;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

export async function fetchForestCoverChangeDataV2({
  country,
  year,
}: {
  country?: string;
  year?: string;
}) {
  const query: { [key: string]: string } = {};

  if (country) {
    const { iso2 } = getCountryDetails({ country });
    query["country-iso2"] = iso2;
  }

  try {
    const _results = await api<ForestCoverChange[]>({
      url: urls.forestChange,
      query: query,
      method: "GET",
      token: "",
    });

    if (country && year) {
    } else if (country) {
      _results.sort((a, b) => +a.year - +b.year);
      useForestCoverChangeData
        .getState()
        .setForestCoverChangeDataByCountry(_results);
    } else if (year) {
      useForestCoverChangeData
        .getState()
        .setForestCoverChangeDataByYear(_results);
    } else {
      useForestCoverChangeData.getState().setForestCoverChangeData(_results);
    }

    return _results;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}
