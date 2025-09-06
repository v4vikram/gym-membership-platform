"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Dumbbell, Heart, Menu, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CartSidebar from "./cart/CartSidebar";
import UserAvatar from "./UserAvatar";
import { useUser } from "@/context/UserContext";
import { Avatar } from "@radix-ui/react-avatar";
import SettingsToggle from "./SettingsToggle";
import { useCartHook } from "@/hooks/useCartHook";
import { useWishlist } from "@/hooks/useWishlist";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount, cart, isLoading, isError, getCartTotal } =
    useCartHook();
  const { user } = useUser();
  const { data: wishlist = [] } = useWishlist();
  const getCartCountTotal = getCartCount();
  const [refreshUser, setRefreshUser] = useState();
  const pathName = usePathname()
  console.log("pathName", pathName)


  useEffect(() => {
    setRefreshUser(user);
  }, [user]);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <header className={`w-full fixed z-50 top-0 left-0 ${pathName == '/' ? "bg-transparent" : "bg-black"}`}>
      <div className="container-lg py-3 px-0 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-neon-green flex items-center">
         
          <span className="ml-2 flex items-center">Nex <Dumbbell className="w-5 h-8 text-5xl rotate-[317deg] relative top-[2px] right-[2px]"/> Version</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center text-neon-green font-medium">
          <Link href="/" className="">
            Home
          </Link>
          <Link href="/shop" className="">
            Shop
          </Link>

          {/* Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="font-medium">
                Projects
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/projects/wordpress">WordPress</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/projects/shopify">Shopify</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/projects/react">React</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/contact" className="">
            Contact
          </Link>

          {refreshUser && (
            <span className="flex items-center gap-x-4">
              <CartSidebar
                getCartCountTotal={getCartCountTotal}
                cart={cart}
                getCartTotal={getCartTotal}
              />
              <Link
                href="/my-account/wishlist"
                className=" flex items-center gap-x-1 relative"
              >
                <Heart />
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full px-1 w-5 h-5 flex items-center justify-center">
                  {wishlist.length > 0 ? wishlist.length : "0"}
                </span>
              </Link>
              <span className="flex items-center gap-x-5">
                <SettingsToggle>
                  <UserAvatar />
                </SettingsToggle>
              </span>
            </span>
          )}

          {!refreshUser && (
            <Button
              className={
                "bg-neon-green text-black font-semibold hover:bg-neon-green/90"
              }
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4">
          <Link
            href="/"
            className="block py-2 font-medium"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block py-2 font-medium"
            onClick={toggleMenu}
          >
            About
          </Link>

          {/* Mobile Dropdown Simulated */}
          <div className="border-t pt-2">
            <p className="text-sm font-semibold text-gray-500">Projects</p>
            <Link
              href="/projects/wordpress"
              className="block py-1"
              onClick={toggleMenu}
            >
              WordPress
            </Link>
            <Link
              href="/projects/shopify"
              className="block py-1"
              onClick={toggleMenu}
            >
              Shopify
            </Link>
            <Link
              href="/projects/react"
              className="block py-1"
              onClick={toggleMenu}
            >
              React
            </Link>
          </div>

          <Link
            href="/contact"
            className="block py-2 font-medium"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
