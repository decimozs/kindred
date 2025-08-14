"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignUpForm() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="p-8 h-screen w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div>
          <h1 className="text-2xl font-semibold">Kindred 🌟</h1>
          <p>Create Account with Kindred!</p>
        </div>

        <div className="*:not-first:mt-2">
          <Label className="text-lg">Name</Label>
          <Input type="text" placeholder="Enter your name" />
        </div>

        <div className="*:not-first:mt-2">
          <Label className="text-lg">Email</Label>
          <Input type="email" placeholder="Enter your email" />
        </div>

        <div className="*:not-first:mt-2 relative">
          <Label className="text-lg">Password</Label>
          <Input
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
          />
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute top-2.5 mr-1 inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOffIcon size={16} aria-hidden="true" />
            ) : (
              <EyeIcon size={16} aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="*:not-first:mt-2">
          <Label className="text-lg">Confirm Password</Label>
          <Input placeholder="Please confirm your password" type="password" />
        </div>

        <Button type="button" className="w-full mt-4">
          Sign up
        </Button>

        <div className="text-center text-sm">
          By signing up you agree to our{" "}
          <Link href="/sign-in" className="underline">
            Terms
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
