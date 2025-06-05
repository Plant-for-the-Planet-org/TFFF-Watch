import { InvestmentTrackerForCountry } from "./types";

export type InvesmentTrackerParams = {
  country: string;
} & Partial<InvestmentTrackerForCountry>;
