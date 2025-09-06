"use client";
import { BarChart3, CreditCard, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const navigationItems = [
    { id: "home", icon: Home, label: "Home", href: "/dashboard" },
    { id: "membership", icon: CreditCard, label: "Membership", href: "/dashboard/membership" },
    { id: "gym", icon: BarChart3, label: "Gym", href: "/dashboard/gyms" },
    { id: "profile", icon: User, label: "Profile", href: "/dashboard/profile" },
  ];

  const isActive = (href) => {
    // Exact match for dashboard, membership, activity
    if (pathname === href) return true;

    // Special case: highlight profile for any nested profile pages
    if (href.startsWith("/dashboard/profile") && pathname.startsWith("/dashboard/profile")) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex justify-around items-center">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "text-primary bg-primary/10 scale-105"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <IconComponent className={`w-6 h-6 ${active ? "animate-pulse" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
                {active && (
                  <div className="w-1 h-1 bg-primary rounded-full absolute -bottom-1" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Footer;
