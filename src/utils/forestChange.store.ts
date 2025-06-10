import { api, urls } from "./axios-helper";
import { ForestChangeForCountry } from "./types";

export let forestChangeData: ForestChangeForCountry[] = [];

export async function fetchForestChangeData(country?: string) {
  let _results: ForestChangeForCountry[] = [];
  try {
    _results = await api<ForestChangeForCountry[]>({
      url: urls.forestChange,
      query: country ? { country: country } : {},
      method: "GET",
      token: "",
    });
    forestChangeData = _results;
    return _results;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}
