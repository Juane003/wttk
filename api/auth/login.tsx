import { signInWithEmail, signUpWithEmail } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

const useSignInWithEmail = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string, password: string }) => signInWithEmail(email, password),
  });
};

const useSignUpWithEmail = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string, password: string }) => signUpWithEmail(email, password),
  });
};

export { useSignInWithEmail, useSignUpWithEmail };
