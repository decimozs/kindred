"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import z from "zod/v4";
import { formOptions, useForm } from "@tanstack/react-form";
import { FieldError } from "../core/field-error";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/mutations/use-auth";

const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const defaultValues: SignUpFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formOpts = formOptions({
  defaultValues,
  validators: {
    onSubmit: signUpFormSchema,
  },
});

export default function SignUpForm() {
  const { signUp } = useAuth();
  const isPending = signUp.isPending;

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      await signUp.mutateAsync(value);
      formApi.reset();
      redirect("/dashboard");
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
          <p>Create Account with Kindred!</p>
        </div>

        <div className="*:not-first:mt-2">
          <Label className="text-lg">Name</Label>
          <form.Field name="name">
            {(field) => (
              <>
                <Input
                  type="text"
                  placeholder="Enter your name"
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

        <div className="*:not-first:mt-2 relative">
          <Label className="text-lg">Password</Label>
          <form.Field name="password">
            {(field) => (
              <>
                <Input
                  type="password"
                  placeholder="Enter your password"
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Sign up"
          )}
        </Button>

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <Button variant="outline" type="button">
          Sign up with Google
        </Button>

        <div className="text-center text-sm">
          By signing up you agree to our{" "}
          <Link href="/sign-in" className="underline hover:no-underline">
            Terms
          </Link>
          .
        </div>
      </form>
    </div>
  );
}
