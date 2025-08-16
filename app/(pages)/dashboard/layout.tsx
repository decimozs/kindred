import Navbar from "@/components/core/navbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div>{children}</div>
      <Navbar />
    </main>
  );
}
