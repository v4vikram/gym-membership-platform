"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, UserPen } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function SettingsToggle({ children }) {
  const { user, logout } = useUser();
  // console.log("User in SettingsToggle:", user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          {children}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48" modal={false}>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>{user?.name}</span>
        </DropdownMenuItem>

        <Link href={"/my-account/orders"} className="cursor-pointer">
          <DropdownMenuItem className={'cursor-pointer'}>
            <UserPen className="mr-2 h-4 w-4" />
             My Account
          </DropdownMenuItem>
         
        </Link>

        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4 text-red-500" />
          <span className="text-red-500">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
