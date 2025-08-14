"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInForm() {
  return (
    <div className="p-8 h-screen w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div>
          <h1 className="text-2xl font-semibold">Kindred 🌟</h1>
          <p>Welcome back to Kindred!</p>
        </div>
        <div className="*:not-first:mt-2">
          <Label className="text-lg">Email</Label>
          <Input type="email" placeholder="Enter your email" />
        </div>

        <div className="*:not-first:mt-2 relative">
          <Label className="text-lg">Password</Label>
          <Input placeholder="Enter your password" type="password" />
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <Checkbox />
            <Label className="text-muted-foreground font-normal">
              Remember me
            </Label>
          </div>
          <a className="text-sm underline hover:no-underline" href="#">
            Forgot password?
          </a>
        </div>

        <Button type="button" className="w-full mt-4">
          Sign in
        </Button>

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <Button variant="outline">Login with Google</Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline hover:no-underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
