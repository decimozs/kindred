import {
  requestPasswordReset,
  RequestPasswordResetParams,
  resetPassword,
  ResetPasswordParams,
  signIn,
  SignInParams,
  signOut,
  signUp,
  SignUpParams,
  updatePassword,
  UpdatePasswordParams,
} from "@/actions/auth";
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

function useSignOut() {
  const handleSignOut = async () => {
    const response = await signOut();

    if (!response.success) {
      throw new Error(
        response.message || "Failed to sign out. Please try again.",
      );
    }

    return response;
  };

  return useMutation({
    mutationFn: handleSignOut,
    onError: (error) => {
      showToast("error", error.message);
    },
    onSuccess: () => {
      showToast("success", "Sign out successfully!");
    },
  });
}

function useRequestPasswordReset() {
  const handleRequestPasswordReset = async (
    params: RequestPasswordResetParams,
  ) => {
    const response = await requestPasswordReset(params);

    if (!response.success) {
      throw new Error(
        response.message ||
          "Failed to request password reset. Please try again.",
      );
    }

    return response;
  };

  return useMutation({
    mutationFn: handleRequestPasswordReset,
    onError: (error) => {
      showToast("error", error.message);
    },
    onSuccess: () => {
      showToast("success", "Password reset requested successfully!");
    },
  });
}

function useResetPassword() {
  const handleResetPassword = async (params: ResetPasswordParams) => {
    const response = await resetPassword(params);

    if (!response.success) {
      throw new Error(
        response.message || "Failed to reset password. Please try again.",
      );
    }

    return response;
  };

  return useMutation({
    mutationFn: handleResetPassword,
    onError: (error) => {
      showToast("error", error.message);
    },
    onSuccess: () => {
      showToast("success", "Password reset successfully!");
    },
  });
}

function useUpdatePassword() {
  const handleUpdatePassword = async (params: UpdatePasswordParams) => {
    const response = await updatePassword(params);

    if (!response.success) {
      throw new Error(
        response.message || "Failed to update password. Please try again.",
      );
    }

    return response;
  };

  return useMutation({
    mutationFn: handleUpdatePassword,
    onError: (error) => {
      showToast("error", error.message);
    },
    onSuccess: () => {
      showToast("success", "Password updated successfully!");
    },
  });
}

export function useAuth() {
  const signIn = useSignIn();
  const signUp = useSignUp();
  const signOut = useSignOut();
  const requestPasswordReset = useRequestPasswordReset();
  const resetPassword = useResetPassword();
  const updatePassword = useUpdatePassword();

  return {
    signIn,
    signUp,
    signOut,
    requestPasswordReset,
    resetPassword,
    updatePassword,
  };
}
