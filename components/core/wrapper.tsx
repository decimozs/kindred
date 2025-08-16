import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  title: string;
}

export function DashboardPageWrapper({ children, title }: WrapperProps) {
  return (
    <div className="p-8">
      <div>
        <p className="text-2xl font-bold">{title}</p>
      </div>
      {children}
    </div>
  );
}
