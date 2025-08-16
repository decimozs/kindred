import { ReactNode } from "react";
import ProfileButton from "./profile-button";

interface WrapperProps {
  children: ReactNode;
  title: string;
}

export function DashboardPageWrapper({ children, title }: WrapperProps) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between items-center">
        <p className="text-2xl font-bold">{title}</p>
        <ProfileButton />
      </div>
      {children}
    </div>
  );
}
