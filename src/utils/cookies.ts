// app/utils/cookies.ts
import { cookies } from "next/headers";

export async function getConsent() {
  const cookieStore = await cookies();
  return cookieStore.get("cookie-consent")?.value;
}
