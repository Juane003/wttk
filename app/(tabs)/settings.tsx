import Divider from "@/components/Divider/Divider";
import PageContainer from "@/components/PageContainter/PageContainer";
import { Button, ButtonText } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeProvider";
import { logout } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";
const isDevMode = process.env.NODE_ENV === "development";

const useClearAsyncStorage = () => {
  const queryClient = useQueryClient();

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
    queryClient.clear();
    Alert.alert("Async Storage cleared");
  };

  return { clearAsyncStorage };
};

const Settings = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useTheme();
  const { clearAsyncStorage } = useClearAsyncStorage();

  const handleLogout = async () => {
    await logout()
    router.push({
      pathname: "/(auth)",
    })
  }

  return (
    <PageContainer>
      <View className="p-8">
        <View className="items-center justify-between flex-row">
          <Text className="text-xl">Dark Mode</Text>
          <Switch
            isChecked={colorMode === "dark"}
            value={colorMode === "dark"}
            onToggle={toggleColorMode}
          />
        </View>
        <Divider />
        {isDevMode && (
          <Button onPress={clearAsyncStorage}>
            <ButtonText>Clear Async Storage</ButtonText>
          </Button>
        )}
        <Divider />
        <Button onPress={handleLogout}> 
          <ButtonText>Logout</ButtonText>
        </Button>
      </View>
    </PageContainer>
  );
};

export default Settings;
