import COLORS from "@/constants/style";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";

const isDevelopment = process.env.NODE_ENV === "development";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.mint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1A1A1A",
        },
      }}
    >
      <Tabs.Screen
        name="(workout)"
        options={{
          title: "Log",
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="edit" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="setting" color={color} />
          ),
          href: isDevelopment ? "/settings" : null,
        }}
      />
    </Tabs>
  );
}
