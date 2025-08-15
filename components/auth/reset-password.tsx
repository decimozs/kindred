"use client";

import z from "zod/v4";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldError } from "../core/field-error";
import { formOptions, useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/mutations/use-auth";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    token: z.string().min(1, "Token is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const formOpts = formOptions({
  validators: {
    onSubmit: resetPasswordSchema,
  },
});

export default function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const isPending = resetPassword.isPending;
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    redirect("/sign-in");
  }

  const form = useForm({
    ...formOpts,
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      token: token,
    },
    onSubmit: async ({ value, formApi }) => {
      await resetPassword.mutateAsync({
        newPassword: value.newPassword,
        token: value.token,
      });
      formApi.reset();
    },
  });

  return (
    <Suspense>
      <div className="p-8 h-screen w-full flex items-center justify-center">
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <h1 className="text-2xl font-semibold">Kindred 🌟</h1>
            <p>Reset your Password</p>
          </div>

          <div className="*:not-first:mt-2">
            <Label className="text-lg">New password</Label>
            <form.Field name="newPassword">
              {(field) => (
                <>
                  <Input
                    type="password"
                    placeholder="Enter your new password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    field={field}
                  />
                  <FieldError field={field} />
                </>
              )}
            </form.Field>
          </div>

          <div className="*:not-first:mt-2">
            <Label className="text-lg">Confirm Password</Label>
            <form.Field name="confirmPassword">
              {(field) => (
                <>
                  <Input
                    type="password"
                    placeholder="Please confirm your password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    field={field}
                  />
                  <FieldError field={field} />
                </>
              )}
            </form.Field>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? (
              <Loader2 className="ml-2 animate-spin" size={16} />
            ) : (
              "Reset Password"
            )}
          </Button>

          <div className="text-center text-sm">
            Already remember your password?{" "}
            <a href="/sign-in" className="underline hover:no-underline">
              Back to sign in
            </a>
            .
          </div>
        </form>
      </div>
    </Suspense>
  );
}
