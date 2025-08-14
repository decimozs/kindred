"use server";

import { auth } from "@/lib/auth";
import { ActionResponse } from "@/lib/types";
import { headers } from "next/headers";

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export const signUp = async (
  params: SignUpParams,
): Promise<
  ActionResponse<Awaited<ReturnType<typeof auth.api.signUpEmail>>>
> => {
  try {
    const response = await auth.api.signUpEmail({
      body: params,
    });

    return {
      success: true,
      message: "Sign up successful.",
      data: response,
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "An error occurred during sign up.",
    };
  }
};

export interface SignInParams extends Omit<SignUpParams, "name"> {
  rememberMe?: boolean;
}

export const signIn = async (
  params: SignInParams,
): Promise<
  ActionResponse<Awaited<ReturnType<typeof auth.api.signInEmail>>>
> => {
  try {
    const response = await auth.api.signInEmail({
      body: params,
    });

    return {
      success: true,
      message: "Sign in successful.",
      data: response,
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "An error occurred during sign in.",
    };
  }
};

export const signOut = async (): Promise<
  ActionResponse<Awaited<ReturnType<typeof auth.api.signOut>>>
> => {
  try {
    const response = await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
      message: "Sign out successful.",
      data: response,
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "An error occurred during sign out.",
    };
  }
};
