"use client";

import z from "zod/v4";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldError } from "../core/field-error";
import { formOptions, useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/mutations/use-auth";
import { useState } from "react";

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
  const [isEmailSent, setEmailSent] = useState<boolean>(false);
  const isPending = requestPasswordReset.isPending;

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      await requestPasswordReset.mutateAsync({
        email: value.email,
        redirectTo: "http://localhost:3000/reset-password",
      });
      formApi.reset();
      setEmailSent(true);
    },
  });

  const handleResentVerification = () => {
    setEmailSent(false);
  };

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
          <p>Email Verification</p>
        </div>

        {isEmailSent ? (
          <div className="rounded-md p-4 text-center border-[1px] border-dashed border-accent bg-accent/10">
            <p className="text-sm">
              A verification email has been sent to your email address. Please
              check your inbox and follow the instructions to verify your
              account. If you don&apos;t see the email, please check your spam
              folder.
            </p>
          </div>
        ) : (
          <>
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
          </>
        )}

        {isEmailSent ? (
          <div className="text-center text-sm">
            Didn&apos;t get the email?{" "}
            <a
              className="underline hover:no-underline cursor-pointer"
              onClick={handleResentVerification}
            >
              Resend verification
            </a>
            .
          </div>
        ) : (
          <div className="text-center text-sm">
            Please verify your email to continue.
          </div>
        )}
      </form>
    </div>
  );
}
