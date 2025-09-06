// LoginPage.tsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginUser } from "@/services_old/authService";
import Link from "next/link";
import { LoginSchema } from "@/schema/userFormSchema";
import { toast } from "sonner";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import Image from "next/image";
import googleIcon from "../../../assets/google-icon.png";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { setUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams)

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const user = await loginUser(values);
      if (user) {
        setUser(user);
        toast.success("Login Successful", { style: { color: "green" } });
        router.push("/");
      } else {
        toast.error("Failed to load user after login", {
          style: { color: "red" },
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.", {
        style: { color: "red" },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
      {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "profile email",
        access_type: "offline",
        prompt: "consent",
      }
    )}`;
    window.location.href = googleAuthUrl;
  };
     

useEffect(() => {
  const verified = searchParams.get("verified");
  if (verified === "1") {
    toast.success("✅ Email verified successfully. Please log in.");

    // Remove ?verified=1 from URL
      // const url = new URL(window.location.href);
      // url.searchParams.delete("verified");
      // window.history.replaceState({}, "", url.toString());
  }
}, []);

  return (
    <RedirectIfAuthenticated>
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-xl bg-black text-white">
          <CardHeader>
            <CardTitle className="text-3xl text-neon-green font-bold text-center">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting, status }) => (
                <Form className="space-y-5">
                  {[
                    {
                      name: "email",
                      label: "Email",
                      type: "email",
                      placeholder: "you@example.com",
                    },
                    {
                      name: "password",
                      label: "Password",
                      type: "password",
                      placeholder: "••••••••",
                    },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name} className="space-y-2">
                      <Label htmlFor={name} className="text-white">
                        {label}
                      </Label>
                      <Field
                        as={Input}
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        autoComplete={
                          name === "password" ? "current-password" : name
                        }
                        className="bg-gray-800 text-white border border-gray-700 focus:border-neon-green focus:ring-1 focus:ring-neon-green"
                      />
                      <ErrorMessage
                        name={name}
                        component="p"
                        className="text-sm text-red-400"
                      />
                    </div>
                  ))}

                  {status && <p className="text-sm text-red-400">{status}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-neon-green text-black hover:bg-neon-green/90 hover:text-black transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </Form>
              )}
            </Formik>

            <Button
              onClick={handleGoogleLogin}
              className="w-full mt-4 bg-white text-black hover:bg-gray-100 flex items-center justify-center gap-2 border"
              type="button"
            >
              <Image src={googleIcon} alt="Google" width={20} height={20} />
              <span>Login with Google</span>
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-neon-green"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </RedirectIfAuthenticated>
  );
}
