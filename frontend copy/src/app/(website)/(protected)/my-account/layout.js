"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Heart,
  User,
  MapPin,
  ShoppingBag,
  LogOut,
} from "lucide-react"; // Icon imports
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "My Orders",
    href: "/my-account/orders",
    icon: ShoppingBag,
  },
  {
    label: "Wishlist",
    href: "/my-account/wishlist",
    icon: Heart,
  },
  {
    label: "Address",
    href: "/my-account/address",
    icon: MapPin,
  },
  {
    label: "Profile",
    href: "/my-account/profile",
    icon: User,
  },
];

export default function MyAccountLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useUser()

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 md:grid grid-cols-[220px_1fr] gap-x-6">
      {/* Sidebar */}
      <aside className="h-fit">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sticky top-24">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">My Account</h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <Button onClick={() => logout()} className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors bg-black text-neon-green w-full mt-4 cursor-pointer hover:bg-black/90">
              <LogOut className="" />
              <span className="">Logout</span>
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="w-full mt-6 md:mt-0">{children}</main>
    </div>
  );
}
