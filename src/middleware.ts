import { NextRequest, NextResponse } from "next/server";

const credentialsEnv = process.env.BASIC_AUTH_CREDENTIALS || "";
const validPairs = credentialsEnv
  .split(",")
  .map((pair) => pair.trim())
  .filter(Boolean)
  .map((pair) => {
    const [user, pass] = pair.split(":");
    return { user, pass };
  });

export function middleware(req: NextRequest) {
  if (validPairs.length === 0) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString();
  const [inputUser, inputPass] = credentials.split(":");

  const isValid = validPairs.some(
    ({ user, pass }) => user === inputUser && pass === inputPass
  );

  if (!isValid) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

function unauthorizedResponse() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
