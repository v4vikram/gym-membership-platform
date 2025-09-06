"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/globals.css";
import { Toaster } from "@/components/ui/sonner";
// import { UserProvider } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const { getMe, isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
       const res =  await getMe(); // check if user is logged in
       console.log("res", res)
      } catch {
        router.push("/login"); // redirect if not authenticated
      }
    };

    checkAuth();
  }, [getMe, router]);

  // Optional: show a loading screen while checking auth
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          {/* <UserProvider> */}
            <main>
              {children}
              <Toaster position="top-center" />
            </main>
          {/* </UserProvider> */}
        </QueryClientProvider>
      </body>
    </html>
  );
}
