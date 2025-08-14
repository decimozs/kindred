"use client";

import {
  CircleCheckIcon,
  XIcon,
  AlertTriangleIcon,
  InfoIcon,
  XCircleIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning";

const iconMap: Record<ToastType, { icon: ReactNode; color: string }> = {
  success: {
    icon: (
      <CircleCheckIcon className="mt-1 shrink-0 text-emerald-500" size={16} />
    ),
    color: "text-emerald-500",
  },
  error: {
    icon: <XCircleIcon className="mt-1 shrink-0 text-red-500" size={16} />,
    color: "text-red-500",
  },
  info: {
    icon: <InfoIcon className="mt-1 shrink-0 text-blue-500" size={16} />,
    color: "text-blue-500",
  },
  warning: {
    icon: (
      <AlertTriangleIcon className="mt-1 shrink-0 text-yellow-500" size={16} />
    ),
    color: "text-yellow-500",
  },
};

export function showToast(type: ToastType, message: string) {
  const { icon } = iconMap[type];

  toast.custom(
    (t) => (
      <div className="bg-background text-foreground w-full rounded-md border px-4 py-3 shadow-lg sm:w-[var(--width)]">
        <div className="flex gap-2">
          <div className="flex grow gap-3">
            {icon}
            <span>{message}</span>
          </div>
          <Button
            variant="ghost"
            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
            onClick={() => toast.dismiss(t)}
            aria-label="Close banner"
          >
            <XIcon
              size={16}
              className="opacity-60 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    ),
    { position: "top-center" },
  );
}
