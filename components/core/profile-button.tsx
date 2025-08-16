"use client";

import { Loader2, LogOutIcon, Settings, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/mutations/use-auth";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { getAvatarFallback } from "@/lib/utils";

export default function ProfileButton() {
  const { signOut } = useAuth();
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  const excludedPaths = ["/dashboard/profile", "/dashboard/settings"];

  if (excludedPaths.includes(pathname)) {
    return null;
  }

  if (isPending || !session) {
    return (
      <Button variant="ghost" disabled className="h-auto p-0">
        <Avatar>
          <AvatarFallback>
            <Loader2 className="h-4 w-4 animate-spin" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  const user = session.user;

  const handleSignOut = async () => {
    await signOut.mutateAsync();
    redirect("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage
              src={user.image || getAvatarFallback(user.name)}
              alt="Profile image"
            />
            <AvatarFallback>{getAvatarFallback(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 m}t-2" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserRound size={16} className="opacity-60" aria-hidden="true" />
            <Link href="/dashboard/profile">View Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings size={16} className="opacity-60" aria-hidden="true" />
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
