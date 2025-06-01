import { useSignInWithEmail } from "@/api/auth/login";
import AuthForm from "@/components/Auth/AuthForm";
import PageContainer from "@/components/PageContainter/PageContainer";
import { AuthFormSchema } from "@/schemas/authSchema";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Text, View } from "react-native";

const Login = () => {
  const router = useRouter();
  const { mutate: signInWithEmail, isPending } = useSignInWithEmail();

  const onSubmit = (data: AuthFormSchema) => {
    signInWithEmail(data, {
      onSuccess: () => {
        router.push({
          pathname: "/(tabs)/(workout)",
        })
      },
      onError: (error) => {
        Alert.alert('Error', error.message || 'Failed to login');
      }
    })
  };

  return (
    <PageContainer >
      <View className="flex-1 items-center gap-4">
        <Text className="text-5xl font-bold text-white">TrackOut</Text>
        <AuthForm onSubmit={onSubmit} isPending={isPending} type="login" />
      </View>
    </PageContainer>
  );
};

export default Login;