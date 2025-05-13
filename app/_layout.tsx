import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeProvider } from "@/context/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

const queryClient = new QueryClient();

const asyncPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const GluestackThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <GluestackUIProvider mode={"dark"}>{children}</GluestackUIProvider>;
};

export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncPersister }}
    >
      <SafeAreaProvider>
        <ThemeProvider>
          <GluestackThemeProvider>
            <StatusBar hidden />
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" />
            </Stack>
          </GluestackThemeProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </PersistQueryClientProvider>
  );
}
