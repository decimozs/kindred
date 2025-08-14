"use server";

import { auth } from "@/lib/auth";

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export const signUp = async (params: SignUpParams) => {
  try {
    return await auth.api.signUpEmail({
      body: params,
    });
  } catch (error) {
    console.error("Error during sign up:", error);
  }
};
