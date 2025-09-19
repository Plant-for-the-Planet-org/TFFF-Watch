import axios from "axios";
import { env } from "@/utils/env";

export const urls = {
  news: "https://automate.plant-for-the-planet.org/webhook/cache/tfff-news",
  policyBriefs:
    "https://automate.plant-for-the-planet.org/webhook/cache/tfff-policy-briefs",
  pressReleases:
    "https://automate.plant-for-the-planet.org/webhook/cache/tfff-press-releases",
  forestChange:
    "https://automate.plant-for-the-planet.org/webhook/cache/tfff-forest-change-and-payouts",
  forestChangeAll:
    "https://automate.plant-for-the-planet.org/webhook/uncached/forest_change_and_payouts",
  spending:
    "https://automate.plant-for-the-planet.org/webhook/cache/tfff-spending",
  investmentTracker:
    "https://automate.plant-for-the-planet.org/webhook/cache/tfff-investment-tracker",
  investmentTrackerSum:
    "https://automate.plant-for-the-planet.org/webhook/uncached/investment-tracker-sum",
  layersProxyAPI: "/api/layers",
};

export type APIOptions = {
  url: string;
  method: string;
  header?: object;
  body?: object;
  query?: {
    [key: string]: string;
  };
  params?: object;
  token: string;
};

export interface APIError {
  message: string;
  status?: number;
  code?: string;
  data?: object;
}

export async function api<T = unknown>({
  url,
  method,
  header = {},
  body,
  query = {},
  params,
  token,
}: APIOptions): Promise<T> {
  try {
    // Prepare headers
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...header,
    };

    if (env.v) query.v = env.v;

    // Prepare URL with query parameters
    const queryString = query
      ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
      : "";
    // console.log({ queryString });

    // Replace URL parameters
    let finalUrl = url;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        finalUrl = finalUrl.replace(`:${key}`, String(value));
      });
    }

    const response = await axios({
      url: `${finalUrl}${queryString}`,
      method: method.toUpperCase(),
      headers,
      data: body,
      validateStatus: (status) => status < 500, // Handle HTTP errors manually
    });

    if (response.status >= 400) {
      throw {
        message: response.data?.message || "API request failed",
        status: response.status,
        code: response.data?.code,
        data: response.data,
      } as APIError;
    }

    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Request Error:", {
        url,
        method,
        error: error.message,
        status: error.response?.status,
      });

      throw {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      } as APIError;
    }

    throw error;
  }
}
