"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import z from "zod/v4";
import { formOptions, useForm } from "@tanstack/react-form";
import { FieldError } from "../core/field-error";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/mutations/use-auth";
import { redirect } from "next/navigation";

const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

const defaultValues: SignInFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const formOpts = formOptions({
  defaultValues,
  validators: {
    onSubmit: signInSchema,
  },
});

export default function SignInForm() {
  const { signIn } = useAuth();
  const isPending = signIn.isPending;

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      await signIn.mutateAsync(value);
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

        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <form.Field name="rememberMe">
              {(field) => (
                <>
                  <Checkbox
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                      field.handleChange(Boolean(checked))
                    }
                  />
                  <Label
                    className="text-muted-foreground font-normal"
                    onClick={() => field.handleChange(!field.state.value)}
                  >
                    Remember me
                  </Label>
                </>
              )}
            </form.Field>
          </div>

          <Link
            className="text-sm underline hover:no-underline"
            href="/email-verification"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <Button variant="outline">Login with Google</Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline hover:no-underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
