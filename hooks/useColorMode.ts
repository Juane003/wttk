import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Appearance } from "react-native";

const THEME_KEY = "@theme-preference";

type Theme = "light" | "dark";

export const useColorMode = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      const systemTheme = Appearance.getColorScheme() || "light";
      try {
        const storedTheme = (await AsyncStorage.getItem(THEME_KEY)) as Theme;
        setTheme(storedTheme || systemTheme);
      } catch {
        setTheme(systemTheme);
      }
    };

    loadTheme();

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setTheme(colorScheme);
      }
    });

    return () => subscription.remove();
  }, []);

  const toggleColorMode = useCallback(async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  }, [theme]);

  return {
    colorMode: theme,
    toggleColorMode,
  };
};
