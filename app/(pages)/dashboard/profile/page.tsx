"use client";

import { DashboardPageWrapper } from "@/components/core/wrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/mutations/use-auth";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut.mutateAsync();
    redirect("/sign-in");
  };

  return (
    <DashboardPageWrapper title="Profile">
      <Button onClick={handleSignOut}>Sign out</Button>
    </DashboardPageWrapper>
  );
}
