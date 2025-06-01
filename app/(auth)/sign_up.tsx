import { useSignUpWithEmail } from "@/api/auth/login";
import AuthForm from "@/components/Auth/AuthForm";
import PageContainer from "@/components/PageContainter/PageContainer";
import { AuthFormSchema } from "@/schemas/authSchema";
import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";


const SignUp = () => {
  const router = useRouter();
  const { mutate: signUpWithEmail, isPending } = useSignUpWithEmail();

  const onSubmit = (data: AuthFormSchema) => {
    const { email, password } = data

    signUpWithEmail({ email, password }, {
      onSuccess: () => {
        router.push({
          pathname: "/(tabs)/(workout)",
        })
      },
      onError: (error) => {
        Alert.alert('Error', error.message || 'Failed to sign up');
      }
    })
  };

  return (
    <PageContainer>
      <View className="flex-1 items-center gap-4">
        <Text className="text-5xl font-bold text-white">TrackOut</Text>
        <AuthForm onSubmit={onSubmit} isPending={isPending} type="signup" />
      </View>
    </PageContainer>
  );
};

export default SignUp;