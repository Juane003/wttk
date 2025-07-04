import { useAuth } from "@/context/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuth()

  if (session) {
    return <Redirect href="/(tabs)/(workout)" />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}/>
  );
}