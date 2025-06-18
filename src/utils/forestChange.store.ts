import { api, urls } from "./axios-helper";
import { useForestCoverChangeData } from "./store";
import { ForestCoverChange } from "./types";

export let forestChangeData: ForestCoverChange[] = [];

export async function fetchForestChangeData(country?: string) {
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
