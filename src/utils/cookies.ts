// app/utils/cookies.ts
import { cookies } from "next/headers";

export const getConsent = () => {
  const cookieStore = cookies();
  return cookieStore.get("cookie-consent")?.value;
};
