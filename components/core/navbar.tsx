"use client";

import { HandCoins, House, LucideIcon, Trophy, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarItems {
  icon: LucideIcon;
  size: number;
  href: string;
}

const navbarItems: NavbarItems[] = [
  { icon: House, size: 30, href: "/dashboard" },
  { icon: Trophy, size: 30, href: "/dashboard/goals" },
  { icon: HandCoins, size: 30, href: "/dashboard/contributions" },
  { icon: UserRound, size: 30, href: "/dashboard/profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background/40 backdrop-blur-sm backdrop-filter">
      <div className="p-4">
        <div className="flex flex-row justify-evenly items-center">
          {navbarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${pathname === item.href ? "text-primary" : "text-muted-foreground"}`}
            >
              <item.icon size={item.size} />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
