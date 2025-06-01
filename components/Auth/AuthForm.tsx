import { AuthFormSchema, authSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import ControlledInput from "../Form/ControlledInput";
import { Button, ButtonSpinner, ButtonText } from "../ui/button";

type AuthFormType = "login" | "signup";

type AuthFormProps = {
  type: AuthFormType;
  onSubmit: (data: AuthFormSchema) => void;
  isPending: boolean;
}

const AuthForm = ({ onSubmit, isPending, type }: AuthFormProps) => {
  const { control, handleSubmit } = useForm<AuthFormSchema>({
    resolver: zodResolver(authSchema),
  });
  
  const submitLabel = type === "login" ? "Log In" : "Sign Up";

  return (
    <View className="w-3/4 gap-4">
      <ControlledInput control={control} name="email" placeholder="Email" />
      <ControlledInput control={control} name="password" placeholder="Password"  type="password"/>
      <Button  variant="solid"  onPress={handleSubmit(onSubmit)}>
        <ButtonText>{submitLabel}</ButtonText>
        {isPending && <ButtonSpinner />}
      </Button>
      {type === "login" && (
        <Link href="/sign_up" asChild>
          <Text className="text-white">Do not have an account? Sign up</Text>
        </Link>
      )}
    </View>
  );
};

export default AuthForm;