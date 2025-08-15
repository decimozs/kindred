"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
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

export interface RequestPasswordResetParams {
  email: string;
  redirectTo: string;
}

export const requestPasswordReset = async (
  params: RequestPasswordResetParams,
): Promise<
  ActionResponse<Awaited<ReturnType<typeof auth.api.requestPasswordReset>>>
> => {
  try {
    const user = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, params.email),
    });

    if (!user) {
      return {
        success: false,
        message: "User with this email does not exist.",
      };
    }

    const response = await auth.api.requestPasswordReset({
      body: params,
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message:
        e.message || "An error occurred while requesting password reset.",
    };
  }
};

export interface ResetPasswordParams {
  token: string;
  newPassword: string;
}

export const resetPassword = async (
  params: ResetPasswordParams,
): Promise<
  ActionResponse<Awaited<ReturnType<typeof auth.api.resetPassword>>>
> => {
  try {
    const response = await auth.api.resetPassword({
      body: params,
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "An error occurred during password reset.",
    };
  }
};

export interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
  revokeOtherSessions?: boolean;
}

export const updatePassword = async (
  params: UpdatePasswordParams,
): Promise<
  ActionResponse<Awaited<ReturnType<typeof auth.api.changePassword>>>
> => {
  try {
    const response = await auth.api.changePassword({
      body: params,
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "An error occurred while updating password.",
    };
  }
};
