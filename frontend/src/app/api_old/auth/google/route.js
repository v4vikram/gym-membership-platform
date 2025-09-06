import { NextResponse } from "next/server";

export async function GET() {
  const redirectUri = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`
  );

  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;

  return NextResponse.redirect(googleAuthURL);
}
