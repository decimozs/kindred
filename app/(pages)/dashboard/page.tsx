"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/mutations/use-auth";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut.mutateAsync();
    redirect("/sign-in");
  };

  return (
    <div className="p-8 h-screen w-full flex items-center justify-center">
      <h1 className="text-2xl font-semibold">Welcome to Kindred 🌟</h1>
      <p className="mt-2">This is a placeholder page.</p>
      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  );
}
