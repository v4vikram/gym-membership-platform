import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("token")

  // If no token → redirect to login
  if (token !== undefined) {
    redirect("/login");
  }

  // ✅ At this point, token exists
  // Optionally: decode token here if you want user data (server-only)
  // But no need to call API unless you want live user info

  return <main>{children}</main>;
}
