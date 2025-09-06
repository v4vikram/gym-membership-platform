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
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { registerUser } from "@/api/auth";
import { useAuthStore } from "@/store/authStore"; // ✅ Zustand
import { RegisterSchema } from "@/schema/authSchema";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your full name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
];

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  // ✅ React Query mutation
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      if (res?.success) {
        // Save to global state
        setAuth(res.user, res.token);
        localStorage.setItem("token", res.token);

        toast.success("Registered successfully!");
        router.push("/"); // redirect to homepage or dashboard
      }
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message || "Registration failed. Please try again.";
      toast.error(msg);
    },
  });

  return (
    // <RedirectIfAuthenticated>
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-xl bg-black text-white">
          <CardHeader>
            <CardTitle className="text-3xl text-neon-green font-bold text-center">
              Create an Account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => mutation.mutate(values)} // ✅ call mutation
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  {fields.map(({ name, label, type, placeholder }) => (
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
                        className="bg-gray-800 text-white border border-gray-700 focus:border-neon-green focus:ring-1 focus:ring-neon-green"
                      />
                      <ErrorMessage
                        name={name}
                        component="p"
                        className="text-sm text-red-400"
                      />
                    </div>
                  ))}

                  <Button
                    type="submit"
                    className="w-full bg-neon-green text-black hover:bg-neon-green/90 hover:text-black transition-colors"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? "Registering..." : "Register"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-neon-green"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    // </RedirectIfAuthenticated>
  );
}
