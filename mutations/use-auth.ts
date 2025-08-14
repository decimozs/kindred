import { signIn, SignInParams, signUp, SignUpParams } from "@/actions/auth";
import { showToast } from "@/components/core/toast-notification";
import { useMutation } from "@tanstack/react-query";

function useSignIn() {
  const handleSignIn = async (params: SignInParams) => {
    const response = await signIn(params);

    if (!response.success) {
      throw new Error(
        response.message || "Failed to sign in. Please try again.",
      );
    }

    return response;
  };

  return useMutation({
    mutationFn: handleSignIn,
    onError: (error) => {
      showToast("error", error.message);
    },
    onSuccess: () => {
      showToast("success", "Sign in successfully!");
    },
  });
}

function useSignUp() {
  const handleSignUp = async (params: SignUpParams) => {
    const response = await signUp(params);

    if (!response.success) {
      throw new Error(
        response.message || "Failed to sign up. Please try again.",
      );
    }

    return response;
  };

  return useMutation({
    mutationFn: handleSignUp,
    onError: (error) => {
      showToast("error", error.message);
    },
    onSuccess: () => {
      showToast("success", "Sign up successfully!");
    },
  });
}

export function useAuth() {
  const signIn = useSignIn();
  const signUp = useSignUp();

  return { signIn, signUp };
}
