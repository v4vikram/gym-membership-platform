import { connectToDB } from "@lib/db";
import User from "@models/UserModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    await connectToDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const emailToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      emailToken,
      tokenExpires,
    });

    // Set up your mail transporter (Gmail SMTP or Ethereal)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });


    const verifyLink = `http://localhost:3000/api/verify-email?token=${emailToken}`;

    const sendMailMessage = await transporter.sendMail({
      from: `"Your App" <noreply@yourapp.com>`,
      to: email,
      subject: "Verify Your Email",
      html: `
        <p>Hello ${name},</p>
        <p>Thanks for registering. Please verify your email by clicking the link below:</p>
        <a href="${verifyLink}">Verify Email</a>
        <p>This link will expire in 1 hour.</p>`,
    });
    console.log("sendMailMessage", sendMailMessage)

    const { password: _, emailToken: __, tokenExpires: ___, ...userWithoutSensitive } = newUser.toObject();

    return NextResponse.json({
      message: "User created. Verification email sent.",
      data: userWithoutSensitive,
    }, { status: 201 });

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
