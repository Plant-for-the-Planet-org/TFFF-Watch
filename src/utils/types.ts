export type News = {
  id: string;
  date: string; // Format: 'DD.MM.YYYY'
  publisher?: string;
  title?: string;
  summary?: string;
  featured_image?: string;
  locale: string; // e.g., 'de' for German
  author?: string;
  url: string;
};

export type Policy = {
  id: string;
  date: string; // format: "dd.MM.yyyy"
  publisher?: string;
  title?: string;
  summary?: string;
  featured_image?: string;
  locale: string;
  author?: string;
  url: string;
};

export type PressRelease = {
  id: string;
  date: string; // format: "dd.MM.yyyy"
  title: string;
  summary: string;
  featured_image: string;
  locale: string;
  url: string;
};

export type InvestmentTrackerForCountry = {
  row_number: number;
  last_updated: string;
  country: string;
  investment_stage: number;
  pledged_capital: number;
  invested_capital: number;
  background: string;
  status: string;
  responsibile_government_office: string;
  endorsements: string;
  CSOs: string;
  How_an_investment_could_work: string;
};

export type ForestChangeForCountry = {
  year: string;
  country: string;
  intact_forest_ha: number;
  deforested_ha: number;
  degraded_forest_ha: number;
  percentage_deforested: number;
  percentage_degraded: number;
  // eligible_for_reward: boolean;
  passes_criteria: boolean;
  base_reward_usd: number;
  deforestation_deduction_usd: number;
  degradation_deduction_usd: number;
  reward_after_deductions_usd: number;
  iplc_reward_usd: number;
  eligibility_deforestation_rate_below_half_percent: boolean;
  eligibility_decreasing_trend_of_deforestation: boolean;
  eligibility_combined: boolean;
};

export type Spending = {
  year: string;
  country: string;
  locale: string;
  amount_usd: string;
  amount_is_exact: boolean;
  label: string;
  help_text: string;
  added_on: string;
  source_url: string;
  source_name: string;
};
