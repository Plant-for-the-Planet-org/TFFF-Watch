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
