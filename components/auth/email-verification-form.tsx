"use client";

import z from "zod/v4";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldError } from "../core/field-error";
import { formOptions, useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/mutations/use-auth";

const emailVerificationSchema = z.object({
  email: z.email("Invalid email address"),
});

export type EmailVerificationFormValues = z.infer<
  typeof emailVerificationSchema
>;

const defaultValues: EmailVerificationFormValues = {
  email: "",
};

const formOpts = formOptions({
  defaultValues,
  validators: {
    onSubmit: emailVerificationSchema,
  },
});

export default function EmailVerificationForm() {
  const { requestPasswordReset } = useAuth();
  const isPending = requestPasswordReset.isPending;

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      await requestPasswordReset.mutateAsync({
        email: value.email,
        redirectTo: "http://localhost:3000/reset-password",
      });
      formApi.reset();
    },
  });

  return (
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
          <p>Welcome back to Kindred!</p>
        </div>

        <div className="*:not-first:mt-2">
          <Label className="text-lg">Email</Label>
          <form.Field name="email">
            {(field) => (
              <>
                <Input
                  type="email"
                  placeholder="Enter your email"
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
            "Send Verification Email"
          )}
        </Button>

        <div className="text-center text-sm">
          Please verify your email to continue. Didn’t get the email?{" "}
          <a
            href="/resend-verification"
            className="underline hover:no-underline"
          >
            Resend verification
          </a>
          .
        </div>
      </form>
    </div>
  );
}
