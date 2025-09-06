import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {connectToDB} from "@lib/db";
import User from "@models/UserModel";

export async function GET(req) {
  await connectToDB();

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  console.log("Google OAuth code:", code, url);

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    // 1. Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

   
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
     console.log("tokenData", tokenData);

    // 2. Get user info
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userInfo = await userInfoRes.json();

    // 3. Find or create user
    let user = await User.findOne({ email: userInfo.email });
    console.log("User found:", user);

    if (!user) {
      user = await User.create({
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.picture,
        password: "google-oauth",
        isGoogle: true,
      });
    }

    // 4. Create JWT and set cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/`);

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (err) {
    console.error("Google OAuth error:", err);
    return NextResponse.json({ error: "Google OAuth Failed" }, { status: 500 });
  }
}
