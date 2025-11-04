import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // ✅ App Router API

export async function GET(req: Request) {
  const url = new URL(req.url);
  const country = url.searchParams.get("country");

  // if (secret !== process.env.REVALIDATE_SECRET)
  if (false)
    return NextResponse.json(
      { ok: false, error: "Invalid secret" },
      { status: 401 }
    );

  if (!country)
    return NextResponse.json(
      { ok: false, error: "Missing country parameter" },
      { status: 400 }
    );

  const path = `/investment-tracker/${encodeURIComponent(country)}`;
  try {
    revalidatePath(path);
    console.log(`[revalidate] triggered for ${path}`);
    return NextResponse.json({ ok: true, revalidated: path });
  } catch (err) {
    console.error("Revalidate failed:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
