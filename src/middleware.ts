import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

// TODO: Implement ClerkMiddleware here if can be done
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check for existing sessionId
  if (request.cookies.has("sessionId")) {
    return response;
  }

  // Generate a new sessionId
  const sessionId = uuidv4();
  response.cookies.set("sessionId", sessionId);

  return response;
}
